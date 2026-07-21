"use client";

import { motion } from "framer-motion";
import {
  SiBlazor,
  SiCloudflare,
  SiCss,
  SiFrappe,
  SiGit,
  SiJavascript,
  SiNextdotjs,
  SiNodedotjs,
  SiNumpy,
  SiPandas,
  SiPython,
  SiReact,
  SiSelenium,
  SiTailwindcss,
  SiTerraform,
  SiTypescript,
  SiUbuntu,
} from "react-icons/si";
import { BrainCircuit, Cloud, Database, FileCode2, Palette, ShieldCheck } from "lucide-react";
import { techStack } from "@/data/siteContent";
import type { IconType } from "react-icons";

const techIcons: Record<string, IconType> = {
  React: SiReact,
  "Next.js": SiNextdotjs,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  "Tailwind CSS": SiTailwindcss,
  Blazor: SiBlazor,
  Python: SiPython,
  "Frappe Framework": SiFrappe,
  Git: SiGit,
  Ubuntu: SiUbuntu,
  Pandas: SiPandas,
  NumPy: SiNumpy,
  Selenium: SiSelenium,
  Terraform: SiTerraform,
  "AWS Lambda": Cloud,
  DynamoDB: Database,
  "API Gateway": Cloud,
  CloudFront: SiCloudflare,
  S3: Database,
  IAM: ShieldCheck,
  CloudWatch: Cloud,
};

const fallbackIcons = [FileCode2, Database, BrainCircuit, ShieldCheck, Palette, SiCloudflare, SiCss, Cloud];

export function TechStack() {
  return (
    <section id="tech-stack" className="section-padding py-32 bg-background-primary">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-sm text-accent font-mono mb-3">Tools & Technology</p>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Tech <span className="text-gradient">Stack</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-3xl">
            Technologies are grouped by delivery area so clients can quickly see
            the practical stack behind ERP, software, cloud, analytics, and design work.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {techStack.map((group, groupIndex) => (
            <motion.article
              key={group.group}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: groupIndex * 0.08 }}
              className="glass-card p-6 md:p-7"
            >
              <h3 className="text-2xl font-bold mb-5">{group.group}</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {group.items.map((item, itemIndex) => {
                  const Icon = techIcons[item] ?? fallbackIcons[itemIndex % fallbackIcons.length];

                  return (
                    <div key={item} className="flex items-center gap-3 rounded-xl border border-black/10 bg-black/[0.025] px-4 py-3">
                      <Icon className="h-5 w-5 text-accent" />
                      <span className="text-sm font-medium text-text-primary">{item}</span>
                    </div>
                  );
                })}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
