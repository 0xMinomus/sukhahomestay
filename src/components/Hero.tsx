import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { cn } from "../lib/cn";
import { EASE } from "./motion";

function Rise({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <span className={cn("mask-line", className)}>
      <motion.span
        initial={{ y: reduce ? 0 : "110%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.1, delay, ease: [...EASE] }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Hero({
  img,
  eyebrow,
  title,
  description,
  meta,
  scrollCue = false,
  height = "h-svh min-h-[620px]",
  align = "left",
  bottomSlot,
}: {
  img: string;
  eyebrow: string;
  title: string[];
  description: string;
  meta?: string[];
  scrollCue?: boolean;
  height?: string;
  align?: "left" | "center";
  bottomSlot?: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "22%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.12]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className={cn("relative overflow-hidden bg-moss", height)}>
      <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0">
        <img
          src={img}
          alt=""
          className={cn("h-full w-full object-cover", !reduce && "animate-kenburns")}
        />
      </motion.div>
      {/* shade: darker top + bottom, lifting mid — mirrors the export gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#151911]/60 via-[#151911]/25 to-[#151911]/45" />

      <motion.div
        style={{ opacity: fade }}
        className={cn(
          "absolute inset-0 mx-auto flex max-w-[1440px] flex-col justify-center px-6 pt-[76px] md:px-[120px]",
          align === "center" && "items-center text-center",
        )}
      >
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [...EASE] }}
          className="mb-[18px] font-mono text-[10px] tracking-[2.5px] text-cream drop-shadow-[0_1px_10px_rgba(0,0,0,0.5)]"
        >
          {eyebrow}
        </motion.p>
        <h1 className="font-serif text-[12vw] leading-[1.04] font-normal text-balance text-cream drop-shadow-[0_2px_16px_rgba(0,0,0,0.4)] sm:text-6xl md:text-[76px] md:leading-[76px]">
          {title.map((line, i) => (
            <Rise key={i} delay={0.35 + i * 0.12}>
              {line}
            </Rise>
          ))}
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [...EASE] }}
          className={cn("mt-4 max-w-xl text-[16px] text-[#F2ECE4] drop-shadow-[0_1px_10px_rgba(0,0,0,0.5)] md:text-[17px]", align === "center" && "mx-auto")}
        >
          {description}
        </motion.p>

        {bottomSlot && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: [...EASE] }}
            className="mt-10 w-full"
          >
            {bottomSlot}
          </motion.div>
        )}

        {meta && meta.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.95 }}
            className={cn(
              "mt-10 flex flex-wrap gap-x-9 gap-y-3 border-t border-cream/25 pt-5",
              align === "center" && "justify-center",
            )}
          >
            {meta.map((m) => (
              <span key={m} className="font-mono text-[9px] tracking-[1.7px] text-cream">
                {m}
              </span>
            ))}
          </motion.div>
        )}

        {scrollCue && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-10 flex items-center gap-3 font-mono text-[9px] tracking-[2px] text-cream"
          >
            <span className="animate-cue inline-block">↓</span> SCROLL TO EXPLORE
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
