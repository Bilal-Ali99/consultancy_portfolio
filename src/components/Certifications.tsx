"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { certifications } from "@/data/siteContent";

export function Certifications() {
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const move = (direction: -1 | 1) => {
    setActiveIndex((current) => (current + direction + certifications.length) % certifications.length);
  };

  useEffect(() => {
    cardRefs.current[activeIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [activeIndex]);

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

        <div className="relative">
          <div className="mb-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => move(-1)}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-background-card shadow-sm transition-all hover:border-accent/30 hover:text-accent"
              aria-label="Previous certification"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => move(1)}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-black/10 bg-background-card shadow-sm transition-all hover:border-accent/30 hover:text-accent"
              aria-label="Next certification"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div
            className="scrollbar-hidden mx-auto flex max-w-6xl snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-[calc(50%-170px)] pb-8 pt-4 sm:px-[calc(50%-230px)]"
          >
            {certifications.map((cert, index) => {
              const isActive = index === activeIndex;

              return (
                <motion.div
                  key={cert.name}
                  ref={(node) => {
                    cardRefs.current[index] = node;
                  }}
                  animate={{
                    scale: isActive ? 1 : 0.9,
                    rotateY: isActive ? 0 : index < activeIndex ? 10 : -10,
                    opacity: isActive ? 1 : 0.62,
                  }}
                  transition={{ type: "spring", stiffness: 150, damping: 22 }}
                  className="glass-card group min-h-[300px] w-[340px] shrink-0 snap-center p-7 transition-all hover:border-black/20 sm:w-[460px]"
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  <div className="mb-5 inline-flex rounded-full px-4 py-2 text-sm font-semibold text-white" style={{ backgroundColor: cert.color }}>
                    {cert.issuer}
                  </div>

                  <h3 className="text-xl font-bold mb-5 group-hover:text-accent transition-colors">
                    {cert.name}
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((skill) => (
                      <span key={skill} className="flex items-center gap-1 text-xs text-text-secondary bg-black/[0.03] px-2 py-1 rounded-full">
                        <CheckCircle2 className="w-3 h-3 text-accent" />
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="flex justify-center gap-2">
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
