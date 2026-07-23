import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline";
  children: ReactNode;
}

export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "px-5 py-3 text-xs font-mono font-medium tracking-wide uppercase transition-all duration-200",
        variant === "primary" &&
          "bg-accent text-black hover:bg-accent/90 hover:shadow-[0_0_20px_rgba(57,255,136,0.4)]",
        variant === "outline" &&
          "border border-border text-foreground hover:border-accent hover:text-accent",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}