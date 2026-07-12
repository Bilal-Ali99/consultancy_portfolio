"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { certifications } from "@/data/siteContent";

export function Certifications() {
  return (
    <section id="certifications" className="section-padding py-32 bg-background-primary">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-gradient">Certifications</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl">
            Current listed certifications are shown without invented credential IDs or verification links.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="glass-card p-8 group transition-all hover:border-white/10"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg"
                  style={{ backgroundColor: cert.color }}
                >
                  {cert.issuer[0]}
                </div>
                <span className="text-xs text-text-muted">{cert.owner}</span>
              </div>

              <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">
                {cert.name}
              </h3>
              <p className="text-text-muted text-sm mb-4">{cert.issuer}</p>

              <div className="flex flex-wrap gap-2">
                {cert.skills.map((skill) => (
                  <span key={skill} className="flex items-center gap-1 text-xs text-text-secondary bg-white/5 px-2 py-1 rounded-full">
                    <CheckCircle2 className="w-3 h-3 text-accent" />
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
