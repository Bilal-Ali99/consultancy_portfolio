"use client";

import { motion } from "framer-motion";
import { Calendar, Github, Linkedin, MapPin, User, ExternalLink } from "lucide-react";
import { people } from "@/data/siteContent";

export function About() {
  return (
    <section id="about" className="section-padding py-32 bg-background-elevated">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Meet the <span className="text-gradient">Team</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl">
            A focused two-person consultancy combining ERPNext and Frappe development
            with software engineering and UI/UX capability.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {people.map((person, index) => (
            <motion.article
              key={person.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-start gap-6 mb-6">
                <div className="w-20 h-20 rounded-2xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <User className="w-10 h-10 text-accent" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">{person.name}</h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {person.roles.map((role) => (
                      <span key={role} className="px-3 py-1 bg-accent/10 text-accent text-xs rounded-full">
                        {role}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-text-muted text-sm">
                    <MapPin className="w-4 h-4" />
                    {person.location}
                  </div>
                </div>
              </div>

              <p className="text-text-secondary leading-relaxed mb-6">{person.bio}</p>

              {person.status && (
                <div className="mb-6 rounded-lg border border-accent/20 bg-accent/10 px-4 py-3 text-sm text-accent">
                  {person.status}
                </div>
              )}

              <div className="space-y-5">
                {person.skills.map((skillGroup) => (
                  <div key={skillGroup.group}>
                    <h4 className="text-sm font-semibold text-text-primary mb-2">{skillGroup.group}</h4>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((skill) => (
                        <span key={skill} className="px-3 py-1 bg-white/5 border border-white/5 rounded-full text-sm text-text-muted">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {(person.links.github || person.links.linkedin || person.links.upwork) && (
                <div className="flex flex-wrap gap-4 pt-6 mt-6 border-t border-white/5">
                  {person.links.github && (
                    <a
                      href={person.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-accent transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      GitHub
                    </a>
                  )}
                  {person.links.linkedin && (
                    <a
                      href={person.links.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-accent transition-colors"
                    >
                      <Linkedin className="w-4 h-4" />
                      LinkedIn
                    </a>
                  )}
                  {person.links.upwork && (
                    <a
                      href={person.links.upwork}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-accent transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Upwork
                    </a>
                  )}
                </div>
              )}
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-8"
        >
          <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-accent" />
            Experience Timeline
          </h3>
          <div className="space-y-8 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-px before:bg-white/10">
            {people[0].timeline.map((item) => (
              <div key={`${item.title}-${item.period}`} className="relative pl-8">
                <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-background-primary border-2 border-accent" />
                <div className="text-xs text-accent font-mono mb-1">{item.period}</div>
                <h4 className="font-semibold text-text-primary">{item.title}</h4>
                <div className="text-sm text-text-muted mb-3">{item.organization}</div>
                <ul className="space-y-2">
                  {item.highlights.map((highlight) => (
                    <li key={highlight} className="text-sm text-text-secondary leading-relaxed">
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
