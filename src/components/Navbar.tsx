"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { services, siteInfo } from "@/data/siteContent";

const navLinks = [
  { href: "#tech-stack", label: "Tech Stack" },
  { href: "#why-choose-us", label: "Why Choose Us" },
  { href: "#work", label: "Projects" },
  { href: "#about", label: "About" },
  { href: "#certifications", label: "Certifications" },
  { href: "#contact", label: "Contact" },
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
      <nav className="section-padding flex items-center justify-between h-20 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="/images/brand/logo-primary.svg"
            alt={`${siteInfo.brandName} logo`}
            width={150}
            height={40}
            priority
            className="h-10 w-auto transition-transform group-hover:scale-[1.02]"
          />
        </Link>

        <div className="hidden lg:flex items-center gap-6">
          <div className="group relative py-7">
            <button type="button" className="text-sm text-text-secondary transition-colors hover:text-text-primary">
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
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-text-secondary hover:text-text-primary transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full" />
            </Link>
          ))}
          <Link
            href="#contact"
            className="px-5 py-2.5 bg-accent hover:bg-accent-hover text-white text-sm font-medium rounded-full transition-all hover:scale-105"
          >
            Work With Us
          </Link>
        </div>

        <button
          className="lg:hidden text-text-primary"
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
                    <div key={service.title} className="text-sm text-text-secondary">
                      {service.title}
                    </div>
                  ))}
                </div>
              </div>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-text-secondary hover:text-text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
