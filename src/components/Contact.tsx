"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(4, "Name must be at least 4 characters"),
  email: z.string().email("Please enter a valid email"),
  projectType: z.enum(["ERPNext / Frappe", "Software Development", "UI/UX", "Machine Learning", "Other"]),
  message: z.string().min(10, "Please provide more details about your project"),
});

type ContactForm = z.infer<typeof contactSchema>;

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null);
        throw new Error(result?.message ?? "Message could not be sent. Please try again.");
      }

      reset();
      setIsSubmitted(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Message could not be sent. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
            Have an ERPNext, software, UI/UX, or data project in mind? Contact us
            to start a conversation.
          </p>
        </motion.div>

        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
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
                        className="w-full px-4 py-3 bg-background-primary border border-black/10 rounded-lg focus:border-accent focus:outline-none transition-colors text-text-primary"
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
                        className="w-full px-4 py-3 bg-background-primary border border-black/10 rounded-lg focus:border-accent focus:outline-none transition-colors text-text-primary"
                        placeholder="you@company.com"
                      />
                      {errors.email && (
                        <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Project Type</label>
                    <select
                      {...register("projectType")}
                      className="w-full px-4 py-3 bg-background-primary border border-black/10 rounded-lg focus:border-accent focus:outline-none transition-colors text-text-primary"
                    >
                      <option value="ERPNext / Frappe">ERPNext / Frappe</option>
                      <option value="Software Development">Software Development</option>
                      <option value="UI/UX">UI/UX</option>
                      <option value="Machine Learning">Machine Learning</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Project Details</label>
                    <textarea
                      {...register("message")}
                      rows={5}
                      className="w-full px-4 py-3 bg-background-primary border border-black/10 rounded-lg focus:border-accent focus:outline-none transition-colors text-text-primary resize-none"
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
                  {submitError && (
                    <p className="text-center text-sm text-red-500">{submitError}</p>
                  )}
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
