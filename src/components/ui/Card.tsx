import React from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  as?: "div" | "button";
}

export default function Card({
  children,
  className,
  onClick,
  as = "div",
}: CardProps) {
  const Component = as;
  return (
    <Component
      className={cn(
        "bg-surface rounded-2xl border border-border p-4 shadow-sm",
        onClick && "cursor-pointer hover:shadow-md transition-shadow",
        className
      )}
      onClick={onClick}
    >
      {children}
    </Component>
  );
}
