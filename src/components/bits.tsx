import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Eyebrow, Headline, Reveal } from "./motion";

/* Full-width closing band used across pages */
export function ClosingBand({
  eyebrow,
  title,
  cta = { label: "BOOK YOUR STAY", to: "/booking" },
}: {
  eyebrow: string;
  title: string[];
  cta?: { label: string; to: string };
}) {
  return (
    <section className="bg-cream">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-8 px-6 py-24 text-center md:py-32">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
        <Headline lines={title} className="text-5xl leading-[1.05] md:text-[64px]" />
        <Reveal delay={0.15}>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
            <Link
              to={cta.to}
              className="group flex items-center gap-3 rounded-[4px] bg-ink px-8 py-4 font-mono text-[10px] tracking-[1.6px] text-cream transition-colors duration-300 hover:bg-clay"
            >
              {cta.label}
              <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}

/* Outlined button that fills on hover */
export function GhostButton({
  to,
  label,
  dark = false,
  href,
}: {
  to?: string;
  label: string;
  dark?: boolean;
  href?: string;
}) {
  const cls = `group inline-flex items-center gap-2.5 rounded-[4px] px-[18px] py-3 font-mono text-[10px] tracking-[1.4px] outline-1 -outline-offset-1 transition-colors duration-300 ${
    dark ? "text-cream outline-cream hover:bg-cream hover:text-ink" : "text-ink outline-ink hover:bg-ink hover:text-cream"
  }`;
  const inner = (
    <>
      {label}
      <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </>
  );
  return (
    <motion.span whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="inline-block">
      {href ? (
        <a href={href} className={cls}>
          {inner}
        </a>
      ) : (
        <Link to={to ?? "/booking"} className={cls}>
          {inner}
        </Link>
      )}
    </motion.span>
  );
}
