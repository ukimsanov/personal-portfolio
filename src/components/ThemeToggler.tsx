
"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

export function ThemeToggler() {
  return (
    <AnimatedThemeToggler
      className="p-3 rounded-full border border-border/70 hover:border-border active:scale-95 transition-all duration-200 ease-out hover:shadow-md min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
      duration={400}
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-transform duration-200 ease-out dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-transform duration-200 ease-out dark:rotate-0 dark:scale-100" />
    </AnimatedThemeToggler>
  );
}
