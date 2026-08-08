"use client";

import { motion } from "framer-motion";
import {
  SiBlazor,
  SiApachekafka,
  SiCloudflare,
  SiCss,
  SiFrappe,
  SiGit,
  SiIntellijidea,
  SiJavascript,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiNumpy,
  SiNotepadplusplus,
  SiOwasp,
  SiPandas,
  SiPython,
  SiReact,
  SiSelenium,
  SiSnyk,
  SiSonar,
  SiTailwindcss,
  SiTerraform,
  SiTypescript,
  SiUbuntu,
} from "react-icons/si";
import { BrainCircuit, Cloud, Database, FileCode2, MessageSquareMore, Palette, ShieldCheck } from "lucide-react";
import { techStack } from "@/data/siteContent";
import type { IconType } from "react-icons";

const techIcons: Record<string, IconType> = {
  React: SiReact,
  "Next.js": SiNextdotjs,
  "Node.js": SiNodedotjs,
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
  MongoDB: SiMongodb,
  "SQL Server": Database,
  Oracle: Database,
  Snyk: SiSnyk,
  Sonar: SiSonar,
  OWASP: SiOwasp,
  "Visual Studio": FileCode2,
  "VS Code": FileCode2,
  "Notepad++": SiNotepadplusplus,
  "IntelliJ IDEA": SiIntellijidea,
  Selenium: SiSelenium,
  Terraform: SiTerraform,
  "AWS Lambda": Cloud,
  MSK: SiApachekafka,
  "Apache Kafka": SiApachekafka,
  ActiveMQ: MessageSquareMore,
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
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Tech <span className="text-gradient">Stack</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {techStack.map((group, groupIndex) => (
            <motion.article
              key={group.group}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: groupIndex * 0.08 }}
              className={`glass-card p-6 md:p-7 ${
                group.group === "Design & Quality" ? "lg:col-span-2 lg:mx-auto lg:w-[calc(50%-0.75rem)]" : ""
              }`}
            >
              <h3 className="text-2xl font-bold mb-5">{group.group}</h3>
              <div className="grid grid-cols-3 gap-x-5 gap-y-7 sm:grid-cols-4">
                {group.items.map((item, itemIndex) => {
                  const Icon = techIcons[item] ?? fallbackIcons[itemIndex % fallbackIcons.length];

                  return (
                    <div key={item} className="flex min-h-20 flex-col items-center justify-start gap-2 text-center">
                      <Icon className="h-8 w-8 text-accent" />
                      <span className="text-xs font-medium leading-snug text-text-primary">{item}</span>
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
