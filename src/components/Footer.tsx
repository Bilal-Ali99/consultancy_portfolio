import { Code2, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { contactInfo, siteInfo } from "@/data/siteContent";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-background-elevated">
      <div className="section-padding py-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Code2 className="w-6 h-6 text-accent" />
            <span className="font-bold">{siteInfo.brandName}</span>
          </div>

          <div className="flex items-center gap-6">
            <Link
              href={contactInfo.github}
              target="_blank"
              className="text-text-muted hover:text-text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </Link>
            <Link
              href={contactInfo.linkedin}
              target="_blank"
              className="text-text-muted hover:text-text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </Link>
            <Link
              href={contactInfo.upwork}
              target="_blank"
              className="text-text-muted hover:text-text-primary transition-colors font-bold text-sm"
            >
              Upwork
            </Link>
            <Link
              href={`mailto:${contactInfo.email}`}
              className="text-text-muted hover:text-text-primary transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </Link>
          </div>

          <p className="text-sm text-text-muted">
            Copyright {new Date().getFullYear()} {siteInfo.brandName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
