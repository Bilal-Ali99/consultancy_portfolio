"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Brain, BriefcaseBusiness, ChevronRight, Database, ExternalLink, Github, Layers } from "lucide-react";
import { Project, projects } from "@/data/siteContent";

const categoryIcons = {
  ERPNext: Layers,
  "HR & Payroll": BriefcaseBusiness,
  "Machine Learning": Brain,
  "Data Science": Database,
};

export function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="work" className="relative bg-background-primary">
      <div className="section-padding py-32 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Selected <span className="text-gradient">Work</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl">
            Real ERPNext, Frappe, and data projects built around business workflows,
            automation, reporting, and practical analytics.
          </p>
        </motion.div>

        <div className="space-y-32">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onSelect={() => setSelectedProject(project)}
            />
          ))}
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
  index,
  onSelect,
}: {
  project: Project;
  index: number;
  onSelect: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const CategoryIcon = categoryIcons[project.category];

  return (
    <motion.div ref={cardRef} style={{ opacity, scale, y }} className="group relative">
      <div
        className="glass-card overflow-hidden cursor-pointer transition-all duration-500 hover:border-accent/30"
        onClick={onSelect}
      >
        <div className="grid lg:grid-cols-2 gap-0">
          <div className="relative h-64 lg:h-auto min-h-[400px] bg-background-elevated overflow-hidden">
            <div
              className="absolute inset-0 opacity-20 transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundColor: project.color }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <CategoryIcon className="w-24 h-24 text-white/10" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background-elevated to-transparent" />
            <div className="absolute bottom-6 left-6">
              <span
                className="px-3 py-1 rounded-full text-xs font-medium text-white"
                style={{ backgroundColor: project.color }}
              >
                {project.category}
              </span>
            </div>
          </div>

          <div className="p-8 lg:p-12 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-text-muted text-sm mb-4">
              <span className="font-mono">0{index + 1}</span>
              <span>/</span>
              <span className="font-mono">0{projects.length}</span>
            </div>

            <h3 className="text-3xl md:text-4xl font-bold mb-3 group-hover:text-accent transition-colors">
              {project.title}
            </h3>
            <p className="text-sm text-text-muted mb-4">Owner: {project.owner}</p>

            <p className="text-text-secondary text-lg mb-6 leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {project.tech.map((tech) => (
                <span key={tech} className="px-3 py-1 bg-white/5 rounded-full text-sm text-text-muted border border-white/5">
                  {tech}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              {project.highlights.map((highlight) => (
                <div key={highlight.label} className="text-center p-3 bg-white/5 rounded-lg">
                  <div className="text-xl font-bold text-accent">{highlight.value}</div>
                  <div className="text-xs text-text-muted mt-1">{highlight.label}</div>
                </div>
              ))}
            </div>

            <button className="flex items-center gap-2 text-accent font-medium group/btn">
              View Case Study
              <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
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
            className="absolute top-4 right-4 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
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

          <div className="grid grid-cols-3 gap-4">
            {project.highlights.map((highlight) => (
              <div key={highlight.label} className="text-center p-6 bg-white/5 rounded-xl border border-white/5">
                <div className="text-2xl font-bold text-accent mb-2">{highlight.value}</div>
                <div className="text-sm text-text-muted">{highlight.label}</div>
              </div>
            ))}
          </div>

          {(project.liveUrl || project.repoUrl) && (
            <div className="flex gap-4 pt-4 border-t border-white/5">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover rounded-full text-white font-medium transition-all hover:scale-105"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 border border-white/10 hover:border-white/20 rounded-full text-text-primary transition-all hover:bg-white/5"
                >
                  <Github className="w-4 h-4" />
                  View Code
                </a>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
