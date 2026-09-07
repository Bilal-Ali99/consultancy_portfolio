"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  Blocks,
  Boxes,
  BriefcaseBusiness,
  Building2,
  Cable,
  Calculator,
  ChevronDown,
  ExternalLink,
  Factory,
  Handshake,
  Headphones,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import type { ServiceModuleIcon, ServicePageContent } from "@/data/siteContent";
import { Contact } from "@/components/Contact";
import { ERPNextScene } from "@/components/services/ERPNextScene";
import { scrollToSection } from "@/lib/scrollToSection";

const moduleIcons: Record<ServiceModuleIcon, LucideIcon> = {
  accounting: Calculator,
  procurement: ShoppingCart,
  sales: Handshake,
  stock: Boxes,
  manufacturing: Factory,
  projects: BriefcaseBusiness,
  pos: ShoppingBag,
  quality: ShieldCheck,
  support: Headphones,
  assets: Building2,
  hr: Users,
  "custom-apps": Blocks,
  workflows: Workflow,
  integrations: Cable,
};

export function ERPNextServicePage({ content }: { content: ServicePageContent }) {
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [headlineStart, headlineEnd = ""] = content.headline.split("business");

  return (
    <div className="relative overflow-clip">
      <ERPNextScene />

      <div className="relative z-10">
        <section className="section-padding flex min-h-[92svh] items-center pb-20 pt-36 md:pt-40">
          <div className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="max-w-3xl"
            >
              <p className="mb-6 text-sm font-bold uppercase tracking-[0.18em] text-accent">{content.eyebrow}</p>
              <h1 className="text-5xl font-bold leading-[1.04] text-text-primary md:text-7xl lg:text-[5rem]">
                {headlineStart}<span className="text-gradient">business</span>{headlineEnd}
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-text-secondary md:text-xl">{content.introduction}</p>
              <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm font-semibold text-text-primary">
                <span>Custom apps</span>
                <span>Connected workflows</span>
                <span>Maintainable extensions</span>
              </div>
              <button
                type="button"
                onClick={() => scrollToSection("erpnext-modules")}
                className="mt-12 inline-flex h-12 w-12 items-center justify-center rounded-full border border-black/15 bg-white/80 text-text-primary shadow-sm transition-colors hover:border-accent hover:text-accent"
                aria-label="Explore ERPNext modules"
              >
                <ArrowDown className="h-5 w-5" />
              </button>
            </motion.div>

            <div className="hidden min-h-[520px] lg:block" aria-hidden="true" />
          </div>
        </section>

        <section id="erpnext-modules" className="section-padding bg-white/90 py-28 backdrop-blur-[2px]">
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end"
            >
              <div>
                <p className="mb-4 text-sm font-bold uppercase tracking-[0.16em] text-accent">Connected operations</p>
                <h2 className="max-w-3xl text-4xl font-bold md:text-6xl">Core modules, shaped around your workflow.</h2>
              </div>
              <a
                href="https://frappe.io/erpnext/modules"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-hover"
              >
                Official module reference <ExternalLink className="h-4 w-4" />
              </a>
            </motion.div>

            <div className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-5">
              {content.modules.map((module, index) => {
                const Icon = moduleIcons[module.icon];
                const isActive = activeModule === module.title;

                return (
                  <motion.button
                    key={module.title}
                    type="button"
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ delay: index * 0.045 }}
                    onMouseEnter={() => {
                      if (window.matchMedia("(hover: hover)").matches) setActiveModule(module.title);
                    }}
                    onMouseLeave={() => {
                      if (window.matchMedia("(hover: hover)").matches) setActiveModule(null);
                    }}
                    onFocus={(event) => {
                      if (event.currentTarget.matches(":focus-visible")) setActiveModule(module.title);
                    }}
                    onBlur={() => setActiveModule(null)}
                    onClick={() => {
                      if (window.matchMedia("(hover: none)").matches) {
                        setActiveModule((current) => (current === module.title ? null : module.title));
                      }
                    }}
                    aria-expanded={isActive}
                    className="group relative min-h-[220px] overflow-hidden rounded-lg border border-black/10 bg-white p-5 text-left shadow-sm transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent md:p-6"
                  >
                    <span className="mb-6 flex h-12 w-12 items-center justify-center rounded-md bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="block text-base font-bold text-text-primary md:text-lg">{module.title}</span>
                    <span
                      className={`mt-3 block text-sm leading-6 text-text-secondary transition-all duration-300 md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 md:group-focus:translate-y-0 md:group-focus:opacity-100 ${
                        isActive ? "translate-y-0 opacity-100" : "max-md:hidden"
                      }`}
                    >
                      {module.description}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            <div className="mt-20 border-y border-black/10 py-12">
              <div className="mb-8 flex items-center gap-4">
                <span className="h-px w-10 bg-accent" />
                <h3 className="text-2xl font-bold">Frappe extensions</h3>
              </div>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                {content.extensions.map((extension) => {
                  const Icon = moduleIcons[extension.icon];
                  return (
                    <div key={extension.title} className="border-l-2 border-accent/30 pl-5">
                      <Icon className="mb-4 h-7 w-7 text-accent" />
                      <h4 className="font-bold text-text-primary">{extension.title}</h4>
                      <p className="mt-2 text-sm leading-6 text-text-secondary">{extension.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-[#111827] py-24 text-white">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-[#7dd3fc]">Open-source reach</p>
                <h2 className="text-4xl font-bold md:text-5xl">An established global ecosystem.</h2>
              </div>
              <p className="text-sm text-white/60">{content.statisticsVerified}</p>
            </div>

            <div className="grid grid-cols-2 border-l border-t border-white/15 md:grid-cols-3 lg:grid-cols-6">
              {content.statistics.map((statistic) => (
                <a
                  key={statistic.label}
                  href={statistic.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group min-h-[190px] border-b border-r border-white/15 p-5 transition-colors hover:bg-white/[0.06] md:p-6"
                >
                  <strong className="block text-3xl font-bold text-white md:text-4xl">{statistic.value}</strong>
                  <span className="mt-4 block text-sm leading-6 text-white/75">{statistic.label}</span>
                  <span className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-[#7dd3fc] opacity-80">
                    {statistic.sourceLabel} <ExternalLink className="h-3 w-3" />
                  </span>
                </a>
              ))}
            </div>
            <p className="mt-7 max-w-3xl text-sm leading-6 text-white/55">
              These figures describe the wider ERPNext and Frappe ecosystem. They are not HB Solutions project-delivery statistics.
            </p>
          </div>
        </section>

        <section className="section-padding bg-[#eef6ff] py-28">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-5xl">
              <p className="mb-5 text-sm font-bold uppercase tracking-[0.16em] text-accent">Start with clarity</p>
              <h2 className="text-4xl font-bold leading-tight md:text-6xl">{content.punchline}</h2>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <button
                  type="button"
                  onClick={() => scrollToSection("erpnext-contact")}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-accent px-7 py-3 font-semibold text-white transition-colors hover:bg-accent-hover"
                >
                  Book a Demo <ArrowRight className="h-4 w-4" />
                </button>
                <a
                  href={content.trialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-black/15 bg-white px-7 py-3 font-semibold text-text-primary transition-colors hover:border-accent hover:text-accent"
                >
                  Get a 14-Day Trial <ExternalLink className="h-4 w-4" />
                </a>
              </div>
              <p className="mt-4 text-xs text-text-muted">The trial opens Frappe Cloud, an external service provided by Frappe.</p>
            </div>

            <div className="mt-20 grid border-t border-black/10 md:grid-cols-2 lg:grid-cols-4">
              {content.demoReasons.map((reason, index) => (
                <div key={reason.title} className="border-b border-black/10 py-8 md:px-6 md:first:pl-0 lg:border-r lg:last:border-r-0">
                  <span className="text-sm font-bold text-accent">0{index + 1}</span>
                  <h3 className="mt-4 text-xl font-bold">{reason.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-text-secondary">{reason.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-white/95 py-28">
          <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.16em] text-accent">Frequently asked</p>
              <h2 className="text-4xl font-bold md:text-5xl">Questions before an ERP conversation.</h2>
              <p className="mt-6 max-w-md leading-7 text-text-secondary">
                The right implementation starts with clear expectations about fit, customization, hosting, data, and support.
              </p>
            </div>

            <div className="border-t border-black/10">
              {content.faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div key={faq.question} className="border-b border-black/10">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      aria-controls={`erpnext-faq-${index}`}
                      className="flex w-full items-center justify-between gap-6 py-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
                    >
                      <span className="text-lg font-bold text-text-primary">{faq.question}</span>
                      <ChevronDown className={`h-5 w-5 shrink-0 text-accent transition-transform ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`erpnext-faq-${index}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-3xl pb-7 pr-10 leading-7 text-text-secondary">{faq.answer}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <Contact
          sectionId="erpnext-contact"
          titlePrefix="Plan Your"
          titleAccent="ERPNext Demo"
          description="Tell us how your teams currently work, where the process slows down, and what you need ERPNext to improve."
          defaultProjectType="ERPNext / Frappe"
          source="ERPNext & Frappe service page"
        />

        <div className="section-padding bg-white pb-12">
          <p className="mx-auto max-w-7xl border-t border-black/10 pt-8 text-xs leading-5 text-text-muted">
            ERPNext, Frappe Framework, Frappe HR, and Frappe Cloud are trademarks of Frappe Technologies Pvt. Ltd. HB Solutions is an independent consultancy and does not imply official partnership or endorsement.
          </p>
        </div>
      </div>
    </div>
  );
}
