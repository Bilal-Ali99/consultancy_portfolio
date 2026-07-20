"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ExternalLink, Github, Linkedin, MapPin, User } from "lucide-react";
import { people, type Person } from "@/data/siteContent";

export function About() {
  const [expandedPerson, setExpandedPerson] = useState<string | null>(null);

  return (
    <section id="about" className="section-padding py-32 bg-background-elevated/92">
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
            Two complementary profiles across ERPNext, Frappe, AWS cloud,
            software engineering, UI/UX, and analytics.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {people.map((person, index) => {
            const isExpanded = expandedPerson === person.name;
            const profileLabel = person.name.includes("Bilal") ? "Bilal" : person.name.split(" ")[0];

            return (
              <motion.article
                key={person.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="space-y-5"
              >
                <div
                  tabIndex={0}
                  className="group relative min-h-[340px] md:min-h-[420px] overflow-hidden rounded-2xl border border-white/5 bg-background-primary outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  aria-label={person.imageAlt}
                >
                  {person.imageSrc ? (
                    <Image
                      src={person.imageSrc}
                      alt={person.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.36),transparent_34%),radial-gradient(circle_at_75%_80%,rgba(245,158,11,0.22),transparent_30%),linear-gradient(135deg,#12121a,#0a0a0f)]">
                      <div className="relative flex h-44 w-44 items-center justify-center rounded-full border border-white/10 bg-white/5 shadow-[0_24px_80px_rgba(99,102,241,0.18)]">
                        <User className="absolute h-24 w-24 text-white/10" />
                        <span className="relative text-5xl font-bold text-text-primary">{person.initials}</span>
                      </div>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  <div className="absolute left-6 right-6 bottom-6 transition-all duration-300 group-hover:translate-y-[-96px] group-focus:translate-y-[-96px]">
                    <h3 className="text-3xl md:text-4xl font-bold">{person.name}</h3>
                  </div>

                  <div className="absolute inset-x-6 bottom-6 translate-y-8 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus:translate-y-0 group-focus:opacity-100">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {person.roles.map((role) => (
                        <span key={role} className="px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-medium">
                          {role}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm md:text-base text-text-secondary leading-relaxed max-w-xl">
                      {person.bio}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setExpandedPerson(isExpanded ? null : person.name)}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-left transition-all hover:border-accent/30 hover:bg-white/10"
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-semibold text-text-primary">
                      {isExpanded ? `Hide ${profileLabel} Profile` : `View ${profileLabel} Profile`}
                    </span>
                    <span className="text-sm text-text-muted">
                      Skills & experience
                    </span>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <ProfileDetails person={person} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProfileDetails({ person }: { person: Person }) {
  return (
    <div className="glass-card p-6 md:p-8">
      <div className="flex flex-wrap items-center gap-3 mb-8 text-sm text-text-muted">
        <span className="inline-flex items-center gap-2">
          <MapPin className="w-4 h-4 text-accent" />
          {person.location}
        </span>
        {(person.links.github || person.links.linkedin || person.links.upwork) && (
          <span className="hidden sm:inline text-white/20">/</span>
        )}
        {person.links.github && (
          <a href={person.links.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-accent transition-colors">
            <Github className="w-4 h-4" />
            GitHub
          </a>
        )}
        {person.links.linkedin && (
          <a href={person.links.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-accent transition-colors">
            <Linkedin className="w-4 h-4" />
            LinkedIn
          </a>
        )}
        {person.links.upwork && (
          <a href={person.links.upwork} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-accent transition-colors">
            <ExternalLink className="w-4 h-4" />
            Upwork
          </a>
        )}
      </div>

      <div className="space-y-6 mb-10">
        <h4 className="text-xl font-bold">Skills</h4>
        {person.skills.map((skillGroup) => (
          <div key={skillGroup.group}>
            <h5 className="text-sm font-semibold text-text-primary mb-2">{skillGroup.group}</h5>
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

      <div>
        <h4 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-accent" />
          Experience
        </h4>

        {person.timeline.length > 0 ? (
          <div className="space-y-7 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-px before:bg-white/10">
            {person.timeline.map((item) => (
              <div key={`${item.title}-${item.period}`} className="relative pl-8">
                <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-background-primary border-2 border-accent" />
                <div className="text-xs text-accent font-mono mb-1">{item.period}</div>
                <h5 className="font-semibold text-text-primary">{item.title}</h5>
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
        ) : (
          <p className="rounded-xl border border-white/5 bg-white/5 p-4 text-sm text-text-secondary">
            Experience details coming soon.
          </p>
        )}
      </div>
    </div>
  );
}
