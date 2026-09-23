import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ClosingBand, GhostButton } from "../components/bits";
import Hero from "../components/Hero";
import { Eyebrow, Headline, Item, ParallaxImage, Reveal, Stagger } from "../components/motion";
import { EXPERIENCE_CARDS, img } from "../data/content";

const FACTS = [
  { label: "DURATION", value: "3–4 HOURS" },
  { label: "PACE", value: "GENTLE" },
  { label: "START", value: "7:00 AM" },
];

export default function Experiences() {
  return (
    <>
      <Hero
        img={img.experiencesHero}
        eyebrow="WANDER / LISTEN / RETURN"
        title={["The valley", "sets the itinerary."]}
        description="Unhurried days shaped by old footpaths, river stones and mountain light."
        scrollCue
      />

      {/* intro */}
      <section className="bg-cream">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-10 px-6 py-16 md:grid-cols-2 md:gap-20 md:px-[120px] md:py-24">
          <div>
            <Reveal>
              <Eyebrow>THE QUIET SIDE OF BALI</Eyebrow>
            </Reveal>
            <Headline lines={["Leave space for what", "you didn’t plan."]} className="mt-4 text-5xl leading-[1.05] md:text-[52px]" />
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-[450px] text-[16px] leading-[26px] text-stone md:justify-self-end">
              Our hosts share the places they love most — not as a checklist, but as invitations. Every
              experience is private, flexible and rooted in the rhythms of Sidemen.
            </p>
          </Reveal>
        </div>
      </section>

      {/* signature journey */}
      <section className="bg-sand">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-12 px-6 py-20 md:grid-cols-2 md:gap-20 md:px-[120px] md:py-24">
          <ParallaxImage
            src={img.experiencesRiceTerrace}
            alt="Walking through the living rice fields"
            caption="01 / ACROSS THE LIVING RICE FIELDS"
            className="aspect-[3/4] w-full"
            amount={55}
          />
          <div>
            <Reveal>
              <p className="font-serif text-[64px] leading-none text-clay/25">01</p>
            </Reveal>
            <Reveal>
              <Eyebrow className="mt-2">SIGNATURE JOURNEY</Eyebrow>
            </Reveal>
            <Headline lines={["Across the living", "rice fields."]} className="mt-5 text-5xl leading-[1.05] md:text-[52px]" />
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-[16px] leading-[26px] text-stone">
                Walk with a village guide through the subak landscape, where water temples, family farms and
                mountain springs have shaped life for centuries.
              </p>
            </Reveal>
            <Stagger className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
              {FACTS.map((f) => (
                <Item key={f.label} className="flex flex-col gap-1.5">
                  <span className="font-mono text-[9px] tracking-[1.8px] text-clay">{f.label}</span>
                  <span className="font-serif text-[19px]">{f.value}</span>
                </Item>
              ))}
            </Stagger>
            <Reveal delay={0.1} className="mt-8">
              <GhostButton to="/booking" label="PLAN THIS EXPERIENCE" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* more ways */}
      <section className="bg-cream">
        <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-[120px] md:py-24">
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <Headline lines={["More ways to wander."]} className="text-4xl md:text-[44px]" />
            <Reveal>
              <p className="font-mono text-[9px] tracking-[1.9px] text-clay">PRIVATE · FLEXIBLE · LOCALLY HOSTED</p>
            </Reveal>
          </div>
          <Stagger className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {EXPERIENCE_CARDS.map((c) => (
              <Item key={c.index}>
                <Link to="/booking" className="group block overflow-hidden bg-moss">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={c.img}
                      alt={c.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />
                    <div className="absolute right-6 bottom-6 left-6 flex items-end justify-between gap-4">
                      <div>
                        <p className="font-mono text-[9px] tracking-[2px] text-cream/85">{c.index}</p>
                        <p className="mt-2 font-serif text-[28px] leading-tight text-cream">{c.title}</p>
                      </div>
                      <span className="mb-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cream/60 text-cream transition-all duration-300 group-hover:border-cream group-hover:bg-cream group-hover:text-ink">
                        <ArrowUpRight size={16} />
                      </span>
                    </div>
                  </div>
                </Link>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      {/* booking pathway */}
      <section className="bg-sand">
        <div className="mx-auto max-w-[1440px] px-6 py-20 text-center md:px-[120px] md:py-24">
          <Reveal>
            <Headline lines={["Bring a little more Bali", "into your stay."]} className="mx-auto max-w-3xl text-4xl leading-[1.08] md:text-[48px]" />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-xl text-[16px] leading-[26px] text-stone">
              Choose your room first. We’ll help shape the experiences around your days in Sidemen.
            </p>
          </Reveal>
        </div>
      </section>

      <ClosingBand eyebrow="THE VALLEY IS WAITING" title={["Wander with us."]} />
    </>
  );
}
