import Image from "next/image";
import { siteInfo } from "@/data/siteContent";

const brandLogoSrc = "/images/brand/logo-primary.svg?v=20260809";

export function Footer() {
  return (
    <footer className="border-t border-black/10 bg-background-elevated">
      <div className="section-padding py-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Image
              src={brandLogoSrc}
              alt={`${siteInfo.brandName} logo`}
              width={300}
              height={86}
              className="h-16 w-[230px] object-contain object-left md:h-20 md:w-[300px]"
            />
          </div>

          <p className="text-sm text-text-muted">
            Copyright {new Date().getFullYear()} {siteInfo.brandName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
