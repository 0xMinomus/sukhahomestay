import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "../lib/cn";

export const EASE = [0.22, 1, 0.36, 1] as const;

/* Fade-up on scroll into view */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y, filter: "blur(6px)" }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, margin: "-72px" }}
      transition={{ duration: reduce ? 0.3 : 0.9, delay, ease: [...EASE] }}
    >
      {children}
    </motion.div>
  );
}

const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const staggerChild: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [...EASE] } },
};

const staggerChildStill: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.3 } },
};

export function Stagger({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-64px" }}
    >
      {children}
    </motion.div>
  );
}

export function Item({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div className={className} variants={reduce ? staggerChildStill : staggerChild}>
      {children}
    </motion.div>
  );
}

/* Small mono eyebrow label */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn("font-mono text-[10px] leading-normal font-normal tracking-[1.8px] text-clay sm:tracking-[2.4px]", className)}
    >
      {children}
    </p>
  );
}

/* Serif headline with masked line-by-line rise */
export function Headline({
  lines,
  className,
  delay = 0,
  as: Tag = "h2",
}: {
  lines: string[];
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p";
}) {
  const reduce = useReducedMotion();
  const MTag = motion[Tag];
  return (
    <MTag
      className={cn("font-serif font-normal text-balance text-ink", className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-72px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: delay } } }}
    >
      {lines.map((line, i) => (
        <span key={i} className="mask-line">
          <motion.span
            variants={{
              hidden: { y: reduce ? 0 : "110%" },
              show: { y: "0%", transition: { duration: 1, ease: [...EASE] } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </MTag>
  );
}

/* Image that drifts slower than scroll + subtle scale settle */
export function ParallaxImage({
  src,
  alt,
  className,
  amount = 60,
  caption,
}: {
  src: string;
  alt: string;
  className?: string;
  amount?: number;
  caption?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-amount, amount]);
  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y }}
        className="h-[112%] w-full object-cover"
        loading="lazy"
      />
      {caption && (
        <span className="absolute bottom-6 left-6 z-10 font-mono text-[9px] tracking-[1.7px] text-cream drop-shadow-[0_1px_8px_rgba(0,0,0,0.45)]">
          {caption}
        </span>
      )}
    </div>
  );
}
