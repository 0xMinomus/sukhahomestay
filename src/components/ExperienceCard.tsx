import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Experience } from "../data/content";

export default function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <Link
      to={`/experiences/${experience.slug}`}
      className="group block overflow-hidden bg-moss focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={experience.img}
          alt={experience.imageAlt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06] group-focus-visible:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />
        <div className="absolute right-6 bottom-6 left-6 flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[9px] tracking-[2px] text-cream/85">{experience.index}</p>
            <p className="mt-2 font-serif text-[28px] leading-tight text-cream">{experience.title}</p>
            <p className="mt-3 font-mono text-[9px] tracking-[1.8px] text-cream/80">VIEW DETAILS</p>
          </div>
          <span className="mb-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cream/60 text-cream transition-all duration-300 group-hover:border-cream group-hover:bg-cream group-hover:text-ink group-focus-visible:border-cream group-focus-visible:bg-cream group-focus-visible:text-ink">
            <ArrowUpRight size={16} />
          </span>
        </div>
      </div>
    </Link>
  );
}
