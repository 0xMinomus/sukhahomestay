import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { GhostButton } from "../components/bits";
import Hero from "../components/Hero";
import { Eyebrow, Headline, ParallaxImage, Reveal, Stagger, Item } from "../components/motion";
import { ROOMS, WHATSAPP_URL, img } from "../data/content";

const WANDERS = [
  { kicker: "01 VILLAGE", headline: "Walk old paths", img: img.landingVillage },
  { kicker: "02 MOUNTAIN", headline: "Meet the morning", img: img.landingMountain },
  { kicker: "03 WATER", headline: "Follow the river", img: img.landingWater },
];

const TASTE_TICKS = ["DAILY BREAKFAST INCLUDED", "SEASONAL INGREDIENTS", "VEGETARIAN FRIENDLY"];

const STATS = [
  { value: "03", label: "ROOMS" },
  { value: "02", label: "GUESTS / ROOM" },
  { value: "07:00", label: "BREAKFAST FROM" },
  { value: "01", label: "GARDEN POOL" },
];

export default function Landing() {
  return (
    <>
      <Hero
        img={img.landingHero}
        imgAlt="A thatched-roof villa lit from within at dusk, with palms and a garden pool in front"
        eyebrow="SIDEMEN · EAST BALI"
        title={["Come home to the", "quiet side of Bali."]}
        description="A family-led village homestay in Sidemen, set among rice terraces, rivers and quiet gardens."
        align="center"
      />

      {/* welcome statement */}
      <section className="bg-cream">
        <div className="mx-auto max-w-[1440px] px-6 py-24 md:px-[120px] md:py-32">
          <Reveal>
            <Eyebrow>WELCOME TO SIDEMEN</Eyebrow>
          </Reveal>
          <Headline
            lines={["Slow mornings, shared meals", "and the landscape of Sidemen."]}
            className="mt-6 max-w-5xl text-[32px] leading-[1.15] md:text-[44px]"
          />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-[16px] leading-[26px] text-stone">
              Sukha is a small, family-led homestay shaped by village life, home cooking and time spent
              outdoors.
            </p>
          </Reveal>
        </div>
      </section>

      {/* stay teaser */}
      <section className="bg-sand">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-12 px-6 py-20 md:grid-cols-2 md:gap-20 md:px-[120px] md:py-28">
          <div>
            <Reveal>
              <Eyebrow>01 / STAY</Eyebrow>
            </Reveal>
            <Headline lines={["Barefoot comfort,", "made by hand."]} className="mt-5 text-5xl leading-[1.05] md:text-[56px]" />
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-[16px] leading-[26px] text-stone">
                Choose from three rooms opening to the garden or treetops, with stone, timber and woven
                textures close at hand. Breakfast is served each morning; walks begin just beyond the gate.
              </p>
            </Reveal>
            <Stagger className="mt-8 border-t border-line">
              {ROOMS.map((r) => (
                <Item key={r.slug} className="flex items-center justify-between border-b border-line py-4">
                  <span className="font-serif text-2xl">{r.name}</span>
                  <Link to={`/rooms/${r.slug}`} className="font-mono text-[10px] tracking-[1.6px] text-clay hover:underline">
                    VIEW →
                  </Link>
                </Item>
              ))}
            </Stagger>
            <Reveal delay={0.1} className="mt-8">
              <GhostButton to="/stay" label="VIEW ROOMS" />
            </Reveal>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <ParallaxImage
              src={img.roomGardenMain}
              alt="The Garden Suite"
              caption="THE GARDEN SUITE · 2 GUESTS · PRIVATE TERRACE"
              className="aspect-[3/4] w-full"
              amount={50}
            />
          </motion.div>
        </div>
      </section>

      {/* experiences teaser */}
      <section className="bg-cream">
        <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-[120px] md:py-28">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <Reveal>
                <Eyebrow>BEYOND THE GARDEN GATE</Eyebrow>
              </Reveal>
              <Headline lines={["Take the slower route."]} className="mt-5 text-5xl md:text-[56px]" />
            </div>
            <Reveal delay={0.1}>
              <GhostButton to="/experiences" label="EXPLORE EXPERIENCES" />
            </Reveal>
          </div>

          <Stagger className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
            {WANDERS.map((w) => (
              <Item key={w.kicker}>
                <Link to="/experiences" className="group block overflow-hidden bg-moss">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={w.img}
                      alt={w.headline}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                    <div className="absolute right-6 bottom-6 left-6">
                      <p className="font-mono text-[9px] tracking-[2px] text-cream/85">{w.kicker}</p>
                      <p className="mt-2 font-serif text-[28px] leading-tight text-cream">{w.headline}</p>
                    </div>
                  </div>
                </Link>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      {/* dining teaser */}
      <section className="bg-sand">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-12 px-6 py-20 md:grid-cols-2 md:gap-20 md:px-[120px] md:py-28">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 md:order-1"
          >
            <ParallaxImage
              src={img.landingTable}
              alt="The long table every morning"
              caption="THE LONG TABLE · EVERY MORNING"
              className="aspect-[3/4] w-full"
              amount={50}
            />
          </motion.div>
          <div className="order-1 md:order-2">
            <Reveal>
              <Eyebrow>02 / TASTE</Eyebrow>
            </Reveal>
            <Headline lines={["From garden", "and market to table."]} className="mt-5 text-5xl leading-[1.05] md:text-[56px]" />
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-[16px] leading-[26px] text-stone">
                The menu draws on East Bali flavours and ingredients available from the garden and market:
                rice, coconut, greens, cacao and coffee. Breakfast is served daily, with supper on selected
                evenings.
              </p>
            </Reveal>
            <Stagger className="mt-8 flex flex-col gap-3">
              {TASTE_TICKS.map((t) => (
                <Item key={t} className="flex items-center gap-3">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-clay/15 font-mono text-[10px] text-clay">
                    ✓
                  </span>
                  <span className="font-mono text-[10px] tracking-[1.6px]">{t}</span>
                </Item>
              ))}
            </Stagger>
            <Reveal delay={0.1} className="mt-8">
              <GhostButton to="/dining" label="DINE WITH US" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* closing */}
      <section className="bg-cream">
        <div className="mx-auto max-w-[1440px] px-6 py-24 text-center md:px-[120px] md:py-32">
          <Reveal>
            <Eyebrow>YOUR QUIET PLACE IN EAST BALI</Eyebrow>
          </Reveal>
          <Headline
            lines={["Make room for slower days in Sidemen."]}
            className="mx-auto mt-6 max-w-4xl text-5xl leading-[1.05] md:text-[64px]"
          />
          <Reveal delay={0.12} className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <GhostButton to="/booking" label="PLAN YOUR STAY" />
            <span className="inline-block">
              <GhostButton href={WHATSAPP_URL} label="MESSAGE US" />
            </span>
          </Reveal>
          <Stagger className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-y-10 border-t border-line pt-10 md:grid-cols-4">
            {STATS.map((s) => (
              <Item key={s.label} className="flex flex-col items-center gap-2">
                <span className="font-serif text-[44px] leading-none">{s.value}</span>
                <span className="font-mono text-[9px] tracking-[2px] text-stone">{s.label}</span>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}
