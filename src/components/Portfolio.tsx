"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  BriefcaseBusiness,
  ChevronRight,
  Cloud,
  Database,
  ExternalLink,
  HeartPulse,
  Layers,
} from "lucide-react";
import { projects, type Project } from "@/data/siteContent";

const categoryIcons = {
  ERPNext: Layers,
  "HR & Payroll": BriefcaseBusiness,
  "Machine Learning": Brain,
  "Data Science": Database,
  "Health Tech": HeartPulse,
  "AWS Serverless": Cloud,
  "AWS Analytics": Cloud,
};

export function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const marqueeProjects = [...projects, ...projects];

  return (
    <section id="work" className="relative bg-background-primary/90">
      <div className="section-padding py-32 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Our <span className="text-gradient">Projects</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 grid gap-5 md:grid-cols-3"
        >
          <div className="glass-card p-7">
            <p className="text-sm text-text-muted mb-2">Delivered Projects</p>
            <div className="text-5xl font-bold text-gradient">20+</div>
            <p className="mt-3 text-sm text-text-secondary">
              AWS, ERPNext, Frappe, Health Technology, Software Engineering, and Machine Learning.
            </p>
          </div>
          <div className="glass-card p-7">
            <p className="text-sm text-text-muted mb-2">Customer Satisfaction</p>
            <div className="text-4xl font-bold text-gradient">Client-first</div>
            <p className="mt-3 text-sm text-text-secondary">
              Clear communication, practical workflows, and usable delivery are prioritized from the start.
            </p>
          </div>
          <div className="glass-card p-7">
            <p className="text-sm text-text-muted mb-2">Experience</p>
            <div className="flex items-end gap-2">
              <span className="text-5xl font-bold leading-none text-gradient">5+</span>
              <span className="pb-1 text-xl font-semibold text-accent">Years</span>
            </div>
            <p className="mt-3 text-sm text-text-secondary">
              Experience across ERP development, IT infrastructure, cloud projects, analytics, and UI/UX.
            </p>
          </div>
        </motion.div>

        <div className="relative overflow-hidden py-4">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-background-primary to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-background-primary to-transparent" />
          <div className="marquee-track flex w-max gap-6">
            {marqueeProjects.map((project, index) => (
              <ProjectCard
                key={`${project.id}-${index}`}
                project={project}
                onSelect={() => setSelectedProject(project)}
              />
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

function ProjectCard({
  project,
  onSelect,
}: {
  project: Project;
  onSelect: () => void;
}) {
  const CategoryIcon = categoryIcons[project.category];

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 22, rotateX: -8 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6, rotateX: 2, rotateY: -2 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="group w-[340px] shrink-0 rounded-2xl border border-black/10 bg-background-card p-5 text-left shadow-sm transition-all duration-300 hover:border-accent/30 hover:bg-background-elevated sm:w-[460px]"
      onClick={onSelect}
    >
      <div className="min-h-[245px]">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent transition-transform duration-300 group-hover:scale-105">
            <CategoryIcon className="h-5 w-5" />
          </div>
          <span className="text-xs font-medium text-text-muted">{project.category}</span>
        </div>

        <h4 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors">
          {project.title}
        </h4>
        <p className="text-sm text-text-secondary leading-relaxed mb-4">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-5">
          {project.tech.slice(0, 5).map((tech) => (
            <span key={tech} className="px-2.5 py-1 bg-black/[0.03] rounded-full text-xs text-text-muted border border-black/10">
              {tech}
            </span>
          ))}
        </div>

        <span className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-medium text-white">
          Explore
          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </motion.button>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const CategoryIcon = categoryIcons[project.category];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 50 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="glass-card w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative h-48 bg-background-elevated overflow-hidden">
          <div className="absolute inset-0 opacity-30" style={{ backgroundColor: project.color }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <CategoryIcon className="w-24 h-24 text-white/10" />
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
          >
            <span className="sr-only">Close</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="absolute bottom-6 left-8">
            <h3 className="text-3xl font-bold">{project.title}</h3>
            <span className="text-text-muted">{project.category}</span>
          </div>
        </div>

        <div className="p-8 space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-sm font-semibold text-accent-warm uppercase tracking-wider mb-3">The Challenge</h4>
              <p className="text-text-secondary leading-relaxed">{project.problem}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">The Solution</h4>
              <p className="text-text-secondary leading-relaxed">{project.solution}</p>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-4">Technology Stack</h4>
            <div className="flex flex-wrap gap-3">
              {project.tech.map((tech) => (
                <span key={tech} className="px-4 py-2 bg-accent/10 border border-accent/20 rounded-lg text-accent font-mono text-sm">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {project.highlights.map((highlight) => (
              <div key={highlight.label} className="text-center p-6 bg-black/[0.03] rounded-xl border border-black/10">
                <div className="text-2xl font-bold text-accent mb-2">{highlight.value}</div>
                <div className="text-sm text-text-muted">{highlight.label}</div>
              </div>
            ))}
          </div>

          {project.liveUrl && (
            <div className="flex gap-4 pt-4 border-t border-black/10">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover rounded-full text-white font-medium transition-all hover:scale-105"
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
