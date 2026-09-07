"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { scrollToRequestedHomeSection } from "@/lib/scrollToSection";

export function HomeSectionNavigator() {
  const router = useRouter();

  useEffect(() => {
    return scrollToRequestedHomeSection(() => router.replace("/", { scroll: false }));
  }, [router]);

  return null;
}
