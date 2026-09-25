import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ClosingBand, GhostButton } from "../components/bits";
import Hero from "../components/Hero";
import { Eyebrow, Headline, Item, ParallaxImage, Reveal, Stagger } from "../components/motion";
import { EXPERIENCE_CARDS, img } from "../data/content";

const FACTS = [
  { label: "LANDSCAPE", value: "RICE FIELDS" },
  { label: "DETAILS", value: "CONFIRM BY MESSAGE" },
];

export default function Experiences() {
  return (
    <>
      <Hero
        img={img.experiencesHero}
        eyebrow="EXPERIENCES · SIDEMEN, EAST BALI"
        title={["Let Sidemen set", "the pace."]}
        description="Village walks, field paths and mountain light around Sukha Homestay."
        scrollCue
      />

      {/* intro */}
      <section className="bg-cream">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-10 px-6 py-16 md:grid-cols-2 md:gap-20 md:px-[120px] md:py-24">
          <div>
            <Reveal>
              <Eyebrow>EXPLORING SIDEMEN</Eyebrow>
            </Reveal>
            <Headline lines={["A slower way to see", "the Sidemen valley."]} className="mt-4 text-5xl leading-[1.05] md:text-[52px]" />
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-[450px] text-[16px] leading-[26px] text-stone md:justify-self-end">
              Ask our hosts about walks, river places and craft visits. Share what you have in mind, and
              a host can confirm availability and arrangements by message.
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
              <Eyebrow className="mt-2">RICE-FIELD WALK</Eyebrow>
            </Reveal>
            <Headline lines={["Across the living", "rice fields."]} className="mt-5 text-5xl leading-[1.05] md:text-[52px]" />
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-[16px] leading-[26px] text-stone">
                Ask about a rice-field walk through the Sidemen landscape. A host can confirm the route,
                timing and availability by message.
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
              <GhostButton to="/booking" label="ENQUIRE ABOUT THIS WALK" />
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
              <p className="font-mono text-[9px] tracking-[1.9px] text-clay">AVAILABILITY CONFIRMED BY MESSAGE</p>
            </Reveal>
          </div>
          <Stagger className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {EXPERIENCE_CARDS.map((c) => (
              <Item key={c.index}>
                <Link to="/booking" className="group block overflow-hidden bg-moss" aria-label={`Enquire about ${c.title}`}>
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
                        <p className="mt-3 font-mono text-[9px] tracking-[1.8px] text-cream/80">ENQUIRE ABOUT THIS</p>
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
            <Headline lines={["Start planning your days", "in Sidemen."]} className="mx-auto max-w-3xl text-4xl leading-[1.08] md:text-[48px]" />
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-xl text-[16px] leading-[26px] text-stone">
              Your enquiry can cover room dates and any experience you would like to discuss. A host can
              confirm the details with you.
            </p>
          </Reveal>
        </div>
      </section>

      <ClosingBand eyebrow="ENQUIRE ABOUT YOUR STAY" title={["Explore at Sidemen’s pace."]} />
    </>
  );
}
