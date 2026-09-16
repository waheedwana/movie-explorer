import type { CSSProperties, ReactNode } from "react";
import { useScrollReveal } from "./useScrollReveal";
import type { ScrollRevealOptions } from "./useScrollReveal";

export interface RevealProps extends ScrollRevealOptions {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export function Reveal({ children, className, style, ...options }: RevealProps) {
  const ref = useScrollReveal<HTMLDivElement>(options);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
