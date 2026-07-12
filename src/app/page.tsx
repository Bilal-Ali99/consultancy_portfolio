import { Hero } from "@/components/Hero";
import { Portfolio } from "@/components/Portfolio";
import { About } from "@/components/About";
import { Certifications } from "@/components/Certifications";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { UpworkBanner } from "@/components/UpworkBanner";

export default function Home() {
  return (
    <>
      <UpworkBanner />
      <Hero />
      <Portfolio />
      <About />
      <Certifications />
      <Testimonials />
      <Contact />
    </>
  );
}