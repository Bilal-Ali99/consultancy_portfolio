"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Code2 } from "lucide-react";
import Link from "next/link";
import { siteInfo } from "@/data/siteContent";

const navLinks = [
  { href: "#services", label: "Services" },
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
          <Code2 className="w-8 h-8 text-accent transition-transform group-hover:rotate-12" />
          <span className="text-lg sm:text-xl font-bold tracking-tight">{siteInfo.shortBrandName}</span>
        </Link>

        <div className="hidden lg:flex items-center gap-6">
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
