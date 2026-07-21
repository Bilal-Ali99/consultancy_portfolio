"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { certifications } from "@/data/siteContent";

export function Certifications() {
  const [activeIndex, setActiveIndex] = useState(0);

  const move = (direction: -1 | 1) => {
    setActiveIndex((current) => (current + direction + certifications.length) % certifications.length);
  };

  const visibleCertifications = [-2, -1, 0, 1, 2].map((offset) => {
    const index = (activeIndex + offset + certifications.length) % certifications.length;
    return { cert: certifications[index], offset };
  });

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

        <div className="relative min-h-[520px] overflow-hidden">
          <div className="absolute inset-x-0 top-6 flex items-center justify-between">
            <button
              type="button"
              onClick={() => move(-1)}
              className="z-20 flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-background-card shadow-sm transition-all hover:border-accent/30 hover:text-accent"
              aria-label="Previous certification"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => move(1)}
              className="z-20 flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-background-card shadow-sm transition-all hover:border-accent/30 hover:text-accent"
              aria-label="Next certification"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="relative mx-auto h-[500px] max-w-5xl [perspective:1200px]">
            {visibleCertifications.map(({ cert, offset }) => (
            <motion.div
              key={`${cert.name}-${offset}`}
              animate={{
                x: `${offset * 42}%`,
                y: Math.abs(offset) * 30,
                rotateY: offset * -24,
                scale: offset === 0 ? 1 : 0.82,
                opacity: Math.abs(offset) > 1 ? 0.35 : 1,
                zIndex: 10 - Math.abs(offset),
              }}
              transition={{ type: "spring", stiffness: 180, damping: 24 }}
              className="glass-card group absolute left-1/2 top-24 w-[300px] -translate-x-1/2 p-7 transition-all hover:border-black/20 sm:w-[420px]"
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
                  <span key={skill} className="flex items-center gap-1 text-xs text-text-secondary bg-black/[0.03] px-2 py-1 rounded-full">
                    <CheckCircle2 className="w-3 h-3 text-accent" />
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
            ))}
          </div>

          <div className="mt-2 flex justify-center gap-2">
            {certifications.map((cert, index) => (
              <button
                key={cert.name}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 rounded-full transition-all ${
                  index === activeIndex ? "w-8 bg-accent" : "w-2.5 bg-black/15 hover:bg-black/30"
                }`}
                aria-label={`Show ${cert.name}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
