"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
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
  "/images/why-choose-us/business-context.svg",
  "/images/why-choose-us/erp-cloud.svg",
  "/images/why-choose-us/customization.svg",
  "/images/why-choose-us/transparent-delivery.svg",
  "/images/why-choose-us/user-interfaces.svg",
  "/images/why-choose-us/measured-quality.svg",
  "/images/why-choose-us/agile-methodology.svg",
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

const topSdlcSteps = sdlcSteps.slice(0, 4);
const bottomSdlcSteps = [sdlcSteps[6], sdlcSteps[5], sdlcSteps[4]];

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
              <div className="relative overflow-hidden rounded-[2rem] border border-black/10 bg-[radial-gradient(circle_at_18%_18%,rgba(99,102,241,0.13),transparent_20rem),radial-gradient(circle_at_82%_78%,rgba(245,158,11,0.13),transparent_20rem),linear-gradient(135deg,rgba(255,255,255,0.92),rgba(248,250,252,0.86))] p-8">
                <div className="grid grid-cols-4 gap-8">
                  {topSdlcSteps.map((step, index) => (
                    <div key={step.title} className="relative">
                      <SdlcCard step={step} index={index} />
                      {index < topSdlcSteps.length - 1 && <HorizontalConnector direction="right" color={step.color} />}
                    </div>
                  ))}
                </div>

                <div className="relative h-24">
                  <motion.div
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: 0.42 }}
                    className="absolute right-[12.5%] top-3 h-16 w-1 origin-top rounded-full bg-gradient-to-b from-[#10b981] to-[#38bdf8]"
                  />
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: 0.86 }}
                    className="absolute bottom-1 right-[calc(12.5%-0.75rem)] flex h-6 w-6 items-center justify-center rounded-full bg-[#38bdf8] text-white shadow-lg"
                  >
                    <ArrowDown className="h-4 w-4" />
                  </motion.div>
                </div>

                <div className="grid grid-cols-4 gap-8">
                  {bottomSdlcSteps.map((step, index) => (
                    <div key={step.title} className={`relative ${index === 0 ? "col-start-2" : ""}`}>
                      {index > 0 && <HorizontalConnector direction="left" color={step.color} />}
                      <SdlcCard step={step} index={topSdlcSteps.length + index} />
                    </div>
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

function SdlcCard({
  step,
  index,
}: {
  step: (typeof sdlcSteps)[number];
  index: number;
}) {
  const Icon = step.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.48, delay: index * 0.08, ease: "easeOut" }}
      className="relative z-10 min-h-[218px] rounded-[1.75rem] border border-black/10 bg-white/90 p-5 text-center shadow-[0_24px_60px_rgba(15,23,42,0.08)] backdrop-blur"
    >
      <div className="absolute inset-x-7 top-0 h-1.5 rounded-b-full" style={{ backgroundColor: step.color }} />
      <div
        className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl text-white shadow-lg"
        style={{ backgroundColor: step.color }}
      >
        <Icon className="h-7 w-7" />
      </div>
      <motion.h4
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35, delay: index * 0.08 + 0.12 }}
        className="text-lg font-bold leading-tight"
      >
        {step.title}
      </motion.h4>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35, delay: index * 0.08 + 0.18 }}
        className="mt-3 text-sm leading-relaxed text-text-secondary"
      >
        {step.detail}
      </motion.p>
    </motion.div>
  );
}

function HorizontalConnector({
  direction,
  color,
}: {
  direction: "left" | "right";
  color: string;
}) {
  const ArrowIcon = direction === "right" ? ArrowRight : ArrowLeft;
  const positionClass = direction === "right" ? "-right-8" : "-left-8";
  const arrowClass = direction === "right" ? "-right-3" : "-left-3";

  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: 0.35 }}
      className={`absolute top-1/2 z-20 h-1 w-8 origin-center rounded-full ${positionClass}`}
      style={{ backgroundColor: color }}
    >
      <span className={`absolute -top-2.5 flex h-6 w-6 items-center justify-center rounded-full text-white shadow-md ${arrowClass}`} style={{ backgroundColor: color }}>
        <ArrowIcon className="h-4 w-4" />
      </span>
    </motion.div>
  );
}
