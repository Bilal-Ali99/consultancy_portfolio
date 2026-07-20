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
  Github,
  HeartPulse,
  Layers,
} from "lucide-react";
import { people, projects, type Project } from "@/data/siteContent";

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

  const projectOwners = people.map((person) => ({
    person,
    projects: projects.filter((project) => project.owner === person.name),
  }));

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
            Selected <span className="text-gradient">Work</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl">
            Bilal and Himaas bring separate strengths across ERPNext, Frappe,
            AWS, health technology, software engineering, and analytics.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-start">
          {projectOwners.map(({ person, projects: ownerProjects }, ownerIndex) => (
            <motion.div
              key={person.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: ownerIndex * 0.12 }}
              className="glass-card p-5 md:p-6"
            >
              <div className="mb-8">
                <p className="text-sm text-accent font-mono mb-2">Portfolio Owner</p>
                <h3 className="text-2xl md:text-3xl font-bold mb-3">{person.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {person.roles.map((role) => (
                    <span key={role} className="px-3 py-1 bg-accent/10 text-accent text-xs rounded-full">
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-5">
                {ownerProjects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                    total={ownerProjects.length}
                    onSelect={() => setSelectedProject(project)}
                  />
                ))}
              </div>
            </motion.div>
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
  total,
  onSelect,
}: {
  project: Project;
  index: number;
  total: number;
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
      className="group w-full text-left rounded-2xl border border-white/5 bg-white/[0.035] overflow-hidden transition-all duration-300 hover:border-accent/30 hover:bg-white/[0.055]"
      onClick={onSelect}
    >
      <div className="grid sm:grid-cols-[132px_1fr] min-h-[220px]">
        <div className="relative min-h-[150px] bg-background-elevated overflow-hidden">
          <div className="absolute inset-0 opacity-25" style={{ backgroundColor: project.color }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <CategoryIcon className="w-16 h-16 text-white/15 transition-transform duration-500 group-hover:scale-110" />
          </div>
          <span
            className="absolute left-4 bottom-4 px-2.5 py-1 rounded-full text-[11px] font-medium text-white"
            style={{ backgroundColor: project.color }}
          >
            {project.category}
          </span>
        </div>

        <div className="p-5">
          <div className="flex items-center gap-2 text-text-muted text-xs mb-3">
            <span className="font-mono">0{index + 1}</span>
            <span>/</span>
            <span className="font-mono">0{total}</span>
          </div>

          <h4 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors">
            {project.title}
          </h4>
          <p className="text-sm text-text-secondary leading-relaxed mb-4">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-5">
            {project.tech.slice(0, 5).map((tech) => (
              <span key={tech} className="px-2.5 py-1 bg-white/5 rounded-full text-xs text-text-muted border border-white/5">
                {tech}
              </span>
            ))}
          </div>

          <span className="inline-flex items-center gap-2 text-accent text-sm font-medium">
            View Case Study
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
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

          <div className="grid sm:grid-cols-3 gap-4">
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
