"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Calendar, Github, Linkedin, Mail, MapPin, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { contactInfo, siteInfo } from "@/data/siteContent";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  projectType: z.enum(["ERPNext / Frappe", "Software Development", "UI/UX", "Machine Learning", "Other"]),
  budget: z.enum(["$5k-$10k", "$10k-$25k", "$25k-$50k", "$50k+", "Not sure"]),
  message: z.string().min(10, "Please provide more details about your project"),
});

type ContactForm = z.infer<typeof contactSchema>;

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (_data: ContactForm) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <section id="contact" className="section-padding py-32 bg-background-primary">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Let&apos;s <span className="text-gradient">Work Together</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl">
            Have an ERPNext, software, UI/UX, or data project in mind? Contact {siteInfo.brandName}
            to start a conversation.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="glass-card p-8">
              <h3 className="text-xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-sm text-text-muted mb-1">Email</div>
                    <a href={`mailto:${contactInfo.email}`} className="text-text-primary hover:text-accent transition-colors">
                      {contactInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-sm text-text-muted mb-1">Location</div>
                    <p className="text-text-primary">{contactInfo.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="text-sm text-text-muted mb-1">Availability</div>
                    <p className="text-text-primary">{contactInfo.availability}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card p-8 border-accent/20">
              <h3 className="text-xl font-bold mb-3">Professional Links</h3>
              <p className="text-text-secondary text-sm mb-5">
                Review Bilal&apos;s profiles and project activity through the links below.
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href={contactInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-accent hover:text-accent-hover font-medium transition-colors"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
                <a
                  href={contactInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-accent hover:text-accent-hover font-medium transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
                <a
                  href={contactInfo.upwork}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-accent hover:text-accent-hover font-medium transition-colors"
                >
                  Upwork Profile <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="glass-card p-8">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Message Sent</h3>
                  <p className="text-text-secondary">We&apos;ll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Name</label>
                      <input
                        {...register("name")}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-accent focus:outline-none transition-colors text-text-primary"
                        placeholder="Your name"
                      />
                      {errors.name && (
                        <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input
                        {...register("email")}
                        type="email"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-accent focus:outline-none transition-colors text-text-primary"
                        placeholder="you@company.com"
                      />
                      {errors.email && (
                        <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Project Type</label>
                      <select
                        {...register("projectType")}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-accent focus:outline-none transition-colors text-text-primary"
                      >
                        <option value="ERPNext / Frappe">ERPNext / Frappe</option>
                        <option value="Software Development">Software Development</option>
                        <option value="UI/UX">UI/UX</option>
                        <option value="Machine Learning">Machine Learning</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Budget Range</label>
                      <select
                        {...register("budget")}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-accent focus:outline-none transition-colors text-text-primary"
                      >
                        <option value="$5k-$10k">$5k - $10k</option>
                        <option value="$10k-$25k">$10k - $25k</option>
                        <option value="$25k-$50k">$25k - $50k</option>
                        <option value="$50k+">$50k+</option>
                        <option value="Not sure">Not sure yet</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Project Details</label>
                    <textarea
                      {...register("message")}
                      rows={5}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-accent focus:outline-none transition-colors text-text-primary resize-none"
                      placeholder="Tell us about your project, goals, and timeline..."
                    />
                    {errors.message && (
                      <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-accent hover:bg-accent-hover text-white font-medium rounded-lg transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
