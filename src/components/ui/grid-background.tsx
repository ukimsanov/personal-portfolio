import React from "react";
import { cn } from "@/lib/utils";

export function GridBackground({ children, className }: { children?: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative min-h-screen w-full", className)}>
      {/* Grid pattern */}
      <div className="absolute left-0 top-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      {children}
    </div>
  );
}

export function DotBackground({ children, className }: { children?: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative w-full bg-background bg-[radial-gradient(#8883_1px,transparent_1px)] [background-size:16px_16px]", className)} style={{ isolation: 'auto' }}>
      {children}
    </div>
  );
}

export function GridSmallBackground({ children, className }: { children?: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative min-h-screen w-full", className)}>
      {/* Small grid pattern */}
      <div className="absolute left-0 top-0 -z-10 h-full w-full bg-background">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      </div>
      {children}
    </div>
  );
}

// Subtle gradient overlay option
export function GradientBackground({ children, className }: { children?: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative min-h-screen w-full", className)}>
      {/* Gradient background */}
      <div className="absolute left-0 top-0 -z-10 h-full w-full bg-background">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.1),transparent_50%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.1),transparent_50%)]" />
      </div>
      {children}
    </div>
  );
}
