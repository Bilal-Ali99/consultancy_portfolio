"use client";

import { motion } from "framer-motion";
import { Cloud, Code2, Database, Layers, ShieldCheck, Sparkles } from "lucide-react";
import { services } from "@/data/siteContent";

const serviceIcons = [Layers, Cloud, Code2, Sparkles, Database, ShieldCheck];

export function Services() {
  return (
    <section id="services" className="section-padding py-32 bg-background-elevated">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-sm text-accent font-mono mb-3">What We Offer</p>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Services For <span className="text-gradient">Clients</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-3xl">
            Services are shaped from our ERPNext, cloud, software engineering,
            UI/UX, infrastructure, and analytics experience.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = serviceIcons[index % serviceIcons.length];

            return (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="glass-card p-6 md:p-7 transition-all hover:-translate-y-1 hover:border-accent/30"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-5">{service.summary}</p>
                <div className="flex flex-wrap gap-2">
                  {service.capabilities.map((capability) => (
                    <span key={capability} className="rounded-full border border-black/10 bg-black/[0.03] px-3 py-1 text-xs text-text-muted">
                      {capability}
                    </span>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
