"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { services, siteInfo } from "@/data/siteContent";
import { scrollToSection } from "@/lib/scrollToSection";

const brandLogoSrc = "/images/brand/logo-primary.svg?v=20260809";

const navLinks = [
  { sectionId: "tech-stack", label: "Tech Stack" },
  { sectionId: "why-choose-us", label: "Why Choose Us" },
  { sectionId: "work", label: "Projects" },
  { sectionId: "about", label: "About" },
  { sectionId: "certifications", label: "Certifications" },
  { sectionId: "contact", label: "Contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background-primary/90 backdrop-blur-lg border-b border-black/10 shadow-sm" : "bg-transparent"
      }`}
    >
      <nav className="relative flex h-24 w-full items-center justify-between px-5 md:px-8 lg:px-10">
        <Link href="/" className="flex shrink-0 items-center gap-3 group lg:absolute lg:left-10">
          <Image
            src={brandLogoSrc}
            alt={`${siteInfo.brandName} logo`}
            width={300}
            height={86}
            priority
            className="h-16 w-[230px] object-contain object-left transition-transform group-hover:scale-[1.02] md:h-20 md:w-[300px]"
          />
        </Link>

        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-5 lg:flex xl:gap-6">
          <div className="group relative py-7">
            <button type="button" className="text-sm font-semibold text-text-primary transition-colors hover:text-accent">
              Services
            </button>
            <div className="invisible absolute left-1/2 top-full z-50 w-[760px] -translate-x-1/2 rounded-2xl border border-black/10 bg-background-card p-5 opacity-0 shadow-2xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              <div className="grid grid-cols-2 gap-4">
                {services.map((service) => (
                  <div key={service.title} className="rounded-xl p-4 transition-colors hover:bg-black/[0.03]">
                    <h3 className="font-semibold text-text-primary">{service.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">{service.summary}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {service.capabilities.slice(0, 4).map((capability) => (
                        <span key={capability} className="text-xs text-accent">
                          {capability}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {navLinks.map((link) => (
            <button
              key={link.sectionId}
              type="button"
              onClick={() => scrollToSection(link.sectionId)}
              className="relative text-sm font-semibold text-text-primary transition-colors hover:text-accent group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full" />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => scrollToSection("contact")}
          className="absolute right-10 hidden rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white transition-all hover:scale-105 hover:bg-accent-hover lg:inline-flex"
        >
          Work With Us
        </button>

        <button
          className="ml-auto text-text-primary lg:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background-elevated border-b border-black/10"
          >
            <div className="section-padding py-6 flex flex-col gap-4">
              <div>
                <div className="mb-2 font-medium text-text-primary">Services</div>
                <div className="grid gap-2">
                  {services.map((service) => (
                    <div key={service.title} className="text-sm font-medium text-text-primary">
                      {service.title}
                    </div>
                  ))}
                </div>
              </div>
              {navLinks.map((link) => (
                <button
                  key={link.sectionId}
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    scrollToSection(link.sectionId);
                  }}
                  className="text-left font-medium text-text-primary transition-colors hover:text-accent"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
