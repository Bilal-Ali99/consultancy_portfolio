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
                  className="group relative min-h-[280px] md:min-h-[340px] overflow-hidden rounded-2xl border border-black/10 bg-background-primary outline-none focus-visible:ring-2 focus-visible:ring-accent"
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
                      <div className="relative flex h-36 w-36 items-center justify-center rounded-full border border-white/10 bg-white/5 shadow-[0_24px_80px_rgba(99,102,241,0.18)]">
                        <User className="absolute h-20 w-20 text-white/10" />
                        <span className="relative text-4xl font-bold text-white">{person.initials}</span>
                      </div>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                    <h3 className="text-2xl md:text-3xl font-bold text-white">{person.name}</h3>
                    <div className="mt-4 flex max-h-0 flex-wrap gap-2 overflow-hidden opacity-0 transition-all duration-300 group-hover:max-h-24 group-hover:opacity-100 group-focus:max-h-24 group-focus:opacity-100">
                      {person.roles.map((role) => (
                        <span key={role} className="px-3 py-1 rounded-full bg-white/15 text-white text-xs font-medium backdrop-blur-sm">
                          {role}
                        </span>
                      ))}
                    </div>
                    <p className="mt-4 max-h-0 overflow-hidden text-sm md:text-base text-white/80 leading-relaxed opacity-0 transition-all duration-300 group-hover:max-h-40 group-hover:opacity-100 group-focus:max-h-40 group-focus:opacity-100">
                      {person.bio}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setExpandedPerson(isExpanded ? null : person.name)}
                  className="w-full rounded-2xl border border-black/10 bg-background-card px-5 py-4 text-left shadow-sm transition-all hover:border-accent/30 hover:bg-background-elevated"
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
          <span className="hidden sm:inline text-black/20">/</span>
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
                <span key={skill} className="px-3 py-1 bg-black/[0.03] border border-black/10 rounded-full text-sm text-text-muted">
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
          <div className="space-y-7 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-px before:bg-black/10">
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
          <p className="rounded-xl border border-black/10 bg-black/[0.03] p-4 text-sm text-text-secondary">
            Experience details coming soon.
          </p>
        )}
      </div>
    </div>
  );
}
