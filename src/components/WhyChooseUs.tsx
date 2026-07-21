"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ClipboardList, Code2, GitBranch, Rocket, SearchCheck, ShieldCheck, Users } from "lucide-react";
import { whyChooseUs } from "@/data/siteContent";

const whyIcons = [SearchCheck, Code2, ShieldCheck, ClipboardList, Users, CheckCircle2];

const sdlcSteps = [
  { title: "Plan", detail: "Backlog, scope, priorities", icon: ClipboardList },
  { title: "Design", detail: "UX flow and architecture", icon: Users },
  { title: "Build", detail: "Sprint implementation", icon: Code2 },
  { title: "Review", detail: "Demo, QA, feedback", icon: SearchCheck },
  { title: "Release", detail: "Deploy and monitor", icon: Rocket },
  { title: "Improve", detail: "Next sprint learning", icon: GitBranch },
];

export function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="section-padding py-32 bg-background-elevated">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-sm text-accent font-mono mb-3">Delivery Quality</p>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Why <span className="text-gradient">Choose Us</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-3xl">
            We combine practical engineering, clear communication, and structured
            delivery so clients know what is being built and why it matters.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 items-center">
          <div className="grid sm:grid-cols-2 gap-5">
            {whyChooseUs.map((item, index) => {
              const Icon = whyIcons[index % whyIcons.length];

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className="group relative aspect-square rounded-full border border-black/10 bg-background-card p-7 shadow-sm transition-all hover:-translate-y-1 hover:border-accent/30 hover:shadow-xl"
                >
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <Icon className="mb-4 h-9 w-9 text-accent" />
                    <h3 className="text-lg font-bold">{item.title}</h3>
                    <p className="mt-3 max-h-0 overflow-hidden text-sm leading-relaxed text-text-secondary opacity-0 transition-all duration-300 group-hover:max-h-28 group-hover:opacity-100 group-focus-within:max-h-28 group-focus-within:opacity-100">
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
                <p className="text-sm text-accent font-mono mb-2">Scrum SDLC</p>
                <h3 className="text-2xl md:text-3xl font-bold">Sprint-Based Delivery Flow</h3>
              </div>
              <div className="hidden sm:flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent">
                <GitBranch className="h-7 w-7" />
              </div>
            </div>

            <div className="relative mx-auto grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-3">
              {sdlcSteps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <div key={step.title} className="relative rounded-2xl border border-black/10 bg-background-primary p-4 text-center">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="text-xs font-mono text-text-muted">0{index + 1}</div>
                    <h4 className="font-bold">{step.title}</h4>
                    <p className="mt-1 text-xs text-text-secondary">{step.detail}</p>
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
