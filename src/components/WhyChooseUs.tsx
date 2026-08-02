"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ClipboardList,
  Code2,
  GitBranch,
  Rocket,
  SearchCheck,
  ShieldCheck,
  Users,
  Wrench,
} from "lucide-react";
import { whyChooseUs } from "@/data/siteContent";

const whyVisuals = [
  "/images/why-choose-us/agile-methodology.svg",
  "/images/why-choose-us/business-context.svg",
  "/images/why-choose-us/erp-cloud.svg",
  "/images/why-choose-us/customization.svg",
  "/images/why-choose-us/transparent-delivery.svg",
  "/images/why-choose-us/user-interfaces.svg",
  "/images/why-choose-us/measured-quality.svg",
];

const sdlcSteps = [
  { title: "Planning", detail: "Defines project goals, feasibility, risks, and high-level scope.", icon: ClipboardList, color: "#6366f1" },
  { title: "Requirements Analysis", detail: "Captures functional, non-functional, business, and technical requirements.", icon: SearchCheck, color: "#ec4899" },
  { title: "System Design", detail: "Creates architecture, data models, UI/UX flows, and technical blueprints.", icon: Users, color: "#f59e0b" },
  { title: "Development", detail: "Implements the system through coding, integration, and module creation.", icon: Code2, color: "#10b981" },
  { title: "Testing", detail: "Validates quality, security, performance, and requirement compliance.", icon: ShieldCheck, color: "#38bdf8" },
  { title: "Deployment", detail: "Releases the software to production or client environments.", icon: Rocket, color: "#8b5cf6" },
  { title: "Maintenance", detail: "Provides ongoing support, bug fixes, updates, and enhancements.", icon: Wrench, color: "#ef4444" },
];

export function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="section-padding py-24 bg-background-elevated">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Why <span className="text-gradient">Choose Us</span>
          </h2>
        </motion.div>

        <div className="space-y-10">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {whyChooseUs.map((item, index) => {
              const visual = whyVisuals[index % whyVisuals.length];

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className={`group rounded-3xl border border-black/10 bg-background-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-accent/30 hover:shadow-xl md:min-h-[300px] ${
                    index === whyChooseUs.length - 1 && whyChooseUs.length % 3 === 1 ? "xl:col-start-2" : ""
                  }`}
                >
                  <div className="flex h-full flex-col">
                    <div className="mb-6 overflow-hidden rounded-2xl bg-background-elevated">
                      <Image
                        src={visual}
                        alt={`${item.title} visual`}
                        width={640}
                        height={360}
                        className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="text-xl font-bold leading-tight text-text-primary md:text-2xl">{item.title}</h3>
                    <p className="mt-4 text-base leading-relaxed text-text-secondary">
                      {item.detail}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-6 md:p-8"
          >
            <div className="mb-8 flex items-center justify-between gap-4">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold">Software Delivery Lifecycle</h3>
              </div>
              <div className="hidden sm:flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent">
                <GitBranch className="h-7 w-7" />
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="relative overflow-hidden rounded-[2rem] border border-black/10 bg-[radial-gradient(circle_at_16%_20%,rgba(56,189,248,0.16),transparent_20rem),radial-gradient(circle_at_86%_28%,rgba(236,72,153,0.14),transparent_20rem),radial-gradient(circle_at_50%_100%,rgba(245,158,11,0.14),transparent_18rem),linear-gradient(135deg,rgba(255,255,255,0.96),rgba(248,250,252,0.9))] p-8 shadow-sm">
                <div className="mb-8 flex items-end justify-between gap-6">
                  <div>
                    <h4 className="mt-2 text-2xl font-bold">From planning to maintainable production systems</h4>
                  </div>
                  <p className="max-w-sm text-sm leading-relaxed text-text-secondary">
                    A clear lifecycle keeps scope, quality, release readiness, and post-launch support visible from the start.
                  </p>
                </div>

                <div className="flex">
                  {sdlcSteps.map((step, index) => (
                    <ChevronPhase key={step.title} step={step} index={index} />
                  ))}
                </div>

                <div className="mt-8 grid grid-cols-7 gap-4">
                  {sdlcSteps.map((step, index) => (
                    <motion.div
                      key={step.title}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.42, delay: index * 0.07 + 0.16 }}
                      className="relative rounded-2xl border border-black/10 bg-white/80 p-4 shadow-sm backdrop-blur"
                    >
                      <div className="mb-3 text-xs font-bold text-text-muted">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      <p className="text-xs leading-relaxed text-text-secondary">{step.detail}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-5 lg:hidden">
                {sdlcSteps.map((step, index) => {
                  const Icon = step.icon;

                  return (
                    <div key={step.title}>
                      <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.42, delay: index * 0.06 }}
                        className="relative rounded-3xl border border-black/10 bg-background-primary p-5 shadow-sm"
                      >
                        <div className="flex gap-4">
                          <div
                            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-white shadow-lg"
                            style={{ backgroundColor: step.color }}
                          >
                            <Icon className="h-6 w-6" />
                          </div>
                          <div>
                            <h4 className="text-lg font-bold">{step.title}</h4>
                            <p className="mt-2 text-sm leading-relaxed text-text-secondary">{step.detail}</p>
                          </div>
                        </div>
                        <div
                          className="absolute inset-x-6 top-0 h-1 rounded-b-full"
                          style={{ backgroundColor: step.color }}
                        />
                      </motion.div>
                      {index < sdlcSteps.length - 1 && (
                        <div className="mx-6 flex h-8 items-center">
                          <div className="h-full w-px bg-black/15" />
                          <ArrowDown className="-ml-2.5 mt-5 h-5 w-5 text-accent" />
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ChevronPhase({
  step,
  index,
}: {
  step: (typeof sdlcSteps)[number];
  index: number;
}) {
  const Icon = step.icon;
  const isFirst = index === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: -18 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.44, delay: index * 0.07, ease: "easeOut" }}
      className={`relative min-h-[116px] flex-1 ${isFirst ? "" : "-ml-5"}`}
    >
      <div
        className="flex h-full min-h-[116px] flex-col justify-center px-6 py-5 text-white shadow-[0_18px_34px_rgba(15,23,42,0.16)]"
        style={{
          backgroundColor: step.color,
          clipPath: isFirst
            ? "polygon(0 0, calc(100% - 30px) 0, 100% 50%, calc(100% - 30px) 100%, 0 100%)"
            : "polygon(0 0, calc(100% - 30px) 0, 100% 50%, calc(100% - 30px) 100%, 0 100%, 30px 50%)",
          paddingLeft: isFirst ? undefined : "2.75rem",
        }}
      >
        <div className="mb-2 flex items-center gap-2">
          <Icon className="h-5 w-5 shrink-0" />
          <span className="text-[10px] font-bold tracking-[0.24em] text-white/75">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <h5 className="text-[11px] font-black uppercase leading-snug tracking-[0.12em] xl:text-xs">
          {step.title}
        </h5>
      </div>
    </motion.div>
  );
}
