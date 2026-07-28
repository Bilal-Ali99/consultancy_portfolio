"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ClipboardList, Code2, GitBranch, Rocket, SearchCheck, Users } from "lucide-react";
import { whyChooseUs } from "@/data/siteContent";

const whyVisuals = [
  "/images/why-choose-us/business-context.svg",
  "/images/why-choose-us/erp-cloud.svg",
  "/images/why-choose-us/customization.svg",
  "/images/why-choose-us/transparent-delivery.svg",
  "/images/why-choose-us/user-interfaces.svg",
  "/images/why-choose-us/measured-quality.svg",
];

const sdlcSteps = [
  { title: "Plan", detail: "Backlog, scope, priorities", icon: ClipboardList, color: "#6366f1" },
  { title: "Design", detail: "UX flow and architecture", icon: Users, color: "#ec4899" },
  { title: "Build", detail: "Sprint implementation", icon: Code2, color: "#f59e0b" },
  { title: "Review", detail: "Demo, QA, feedback", icon: SearchCheck, color: "#10b981" },
  { title: "Release", detail: "Deploy and monitor", icon: Rocket, color: "#38bdf8" },
  { title: "Improve", detail: "Next sprint learning", icon: GitBranch, color: "#8b5cf6" },
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
                  className="group rounded-3xl border border-black/10 bg-background-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-accent/30 hover:shadow-xl md:min-h-[300px]"
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
                <h3 className="text-2xl md:text-3xl font-bold">Sprint-Based Delivery Flow</h3>
              </div>
              <div className="hidden sm:flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent">
                <GitBranch className="h-7 w-7" />
              </div>
            </div>

            <div className="relative overflow-x-auto pb-3">
              <div className="flex min-w-[920px] items-center gap-3">
                {sdlcSteps.map((step, index) => {
                  const Icon = step.icon;

                  return (
                    <div key={step.title} className="flex flex-1 items-center gap-3">
                      <div className="relative min-h-44 flex-1 rounded-[2rem] border border-black/10 bg-background-primary p-5 text-center shadow-sm">
                        <div
                          className="absolute inset-x-6 top-0 h-1 rounded-b-full"
                          style={{ backgroundColor: step.color }}
                        />
                        <div
                          className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg"
                          style={{ backgroundColor: step.color }}
                        >
                          <Icon className="h-6 w-6" />
                        </div>
                        <div className="text-xs font-mono text-text-muted">Sprint Step</div>
                        <h4 className="font-bold">{step.title}</h4>
                        <p className="mt-2 text-xs text-text-secondary">{step.detail}</p>
                      </div>
                      {index < sdlcSteps.length - 1 && (
                        <div className="h-0.5 w-8 shrink-0" style={{ backgroundColor: step.color }} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
