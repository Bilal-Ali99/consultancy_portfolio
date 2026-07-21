"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, BadgeCheck } from "lucide-react";
import { siteInfo } from "@/data/siteContent";

export function UpworkBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isUpworkVisitor, setIsUpworkVisitor] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const ref = urlParams.get("ref");
    const utmSource = urlParams.get("utm_source");
    
    if (ref === "upwork" || utmSource === "upwork") {
      setIsUpworkVisitor(true);
      setIsVisible(true);
      sessionStorage.setItem("upworkVisitor", "true");
    } else if (sessionStorage.getItem("upworkVisitor") === "true") {
      setIsUpworkVisitor(true);
    }
  }, []);

  if (!isUpworkVisitor) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="bg-gradient-to-r from-accent/20 to-accent-warm/20 border-b border-accent/20"
        >
          <div className="section-padding py-3 max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BadgeCheck className="w-5 h-5 text-accent" />
              <span className="text-sm">
                <span className="font-semibold text-text-primary">Welcome, Upwork client!</span>
                <span className="text-text-secondary ml-2">
                  Here is {siteInfo.brandName}'s portfolio with real project work and team details.
                </span>
              </span>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="p-1 hover:bg-black/[0.06] rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-text-muted" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
