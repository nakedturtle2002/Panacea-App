import React from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  as?: "div" | "button";
  glass?: boolean;
}

export default function Card({
  children,
  className,
  onClick,
  as = "div",
  glass = false,
}: CardProps) {
  const Component = as;
  return (
    <Component
      className={cn(
        "rounded-2xl p-5",
        glass
          ? "bg-white/60 backdrop-blur-md border border-white/30 shadow-soft"
          : "bg-white/80 backdrop-blur-sm border border-white/40 shadow-soft",
        onClick && "cursor-pointer hover:shadow-glow transition-shadow",
        className
      )}
      onClick={onClick}
    >
      {children}
    </Component>
  );
}
