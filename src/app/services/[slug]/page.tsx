import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ERPNextServicePage } from "@/components/services/ERPNextServicePage";
import { getServicePage, servicePages, siteInfo } from "@/data/siteContent";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return servicePages.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServicePage(slug);

  if (!service) {
    return {};
  }

  const canonicalPath = `/services/${service.slug}/`;

  return {
    title: service.metadataTitle,
    description: service.metadataDescription,
    alternates: { canonical: canonicalPath },
    openGraph: {
      type: "website",
      url: canonicalPath,
      title: service.metadataTitle,
      description: service.metadataDescription,
      siteName: siteInfo.brandName,
      images: [{ url: "/images/brand/icon-512.png", width: 512, height: 512, alt: `${siteInfo.brandName} logo` }],
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServicePage(slug);

  if (!service) {
    notFound();
  }

  const pageUrl = `https://hbsols.com/services/${service.slug}/`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.navTitle,
      description: service.metadataDescription,
      url: pageUrl,
      provider: {
        "@type": "Organization",
        name: siteInfo.brandName,
        url: "https://hbsols.com/",
        logo: "https://hbsols.com/images/brand/icon-512.png",
      },
      serviceType: "ERPNext and Frappe development",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: service.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <ERPNextServicePage content={service} />
    </>
  );
}
