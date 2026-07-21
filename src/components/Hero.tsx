"use client";

import { motion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import Link from "next/link";
import { siteInfo } from "@/data/siteContent";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden section-padding">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-background-primary via-transparent to-background-primary" />
      
      <motion.div
        animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[128px]"
      />
      <motion.div
        animate={{ x: [0, -100, 0], y: [0, 50, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-warm/10 rounded-full blur-[128px]"
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm mb-8"
        >
          <Sparkles className="w-4 h-4" />
          <span>{siteInfo.tagline}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1] mb-6"
        >
          <span className="text-gradient">ERPNext</span>, software, and UI/UX solutions
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {siteInfo.heroDescription}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="#work"
            className="px-8 py-4 bg-accent hover:bg-accent-hover text-white font-medium rounded-full transition-all hover:scale-105 flex items-center gap-2"
          >
            View Work
            <ArrowDown className="w-4 h-4" />
          </Link>
          <Link
            href="#contact"
            className="px-8 py-4 border border-black/10 hover:border-black/20 text-text-primary font-medium rounded-full transition-all hover:bg-black/[0.03]"
          >
            Start a Conversation
          </Link>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-black/20 flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-accent rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
