import { motion } from "motion/react";
import { ClosingBand } from "../components/bits";
import Hero from "../components/Hero";
import { Eyebrow, Headline, Item, ParallaxImage, Reveal, Stagger } from "../components/motion";
import { AMENITIES_ROW_1, AMENITIES_ROW_2, PRACTICAL, RHYTHM, img, type Amenity } from "../data/content";

function AmenityCell({ amenity }: { amenity: Amenity }) {
  return (
    <div className="group flex flex-col gap-[14px] py-7 pr-6 transition-colors duration-300">
      <amenity.icon
        size={24}
        strokeWidth={1.5}
        className="text-clay transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110"
      />
      <span className="font-mono text-[9px] tracking-[1.7px]">{amenity.label}</span>
      <span className="text-[14px] leading-[22px] text-stone">{amenity.copy}</span>
    </div>
  );
}

export default function Amenities() {
  return (
    <>
      <Hero
        img={img.amenitiesHero}
        eyebrow="EVERYTHING YOU NEED · NOTHING YOU DON’T"
        title={["Comfort, quietly", "considered."]}
        description="Simple rituals and thoughtful details for slower days."
      />

      {/* intro */}
      <section className="bg-cream">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-10 px-6 py-16 md:grid-cols-2 md:gap-20 md:px-[120px] md:py-24">
          <div>
            <Reveal>
              <Eyebrow>INCLUDED IN YOUR STAY</Eyebrow>
            </Reveal>
            <Headline lines={["The details that let", "you settle in."]} className="mt-4 text-5xl leading-[1.05] md:text-[52px] md:leading-[54px]" />
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-[450px] text-[16px] leading-[26px] text-stone md:justify-self-end">
              Everything at Sukha is designed to feel natural and unforced — from breakfast in the garden to
              a cool swim after a long walk through the valley.
            </p>
          </Reveal>
        </div>
      </section>

      {/* index grid */}
      <section className="bg-sand">
        <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-[120px] md:py-20">
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <Headline lines={["Included, naturally."]} className="text-4xl md:text-[44px]" />
            <Reveal>
              <p className="font-mono text-[9px] tracking-[1.9px] text-clay">AT NO EXTRA CHARGE</p>
            </Reveal>
          </div>
          <Stagger className="mt-8 grid grid-cols-2 gap-x-6 border-t border-line lg:grid-cols-4">
            {AMENITIES_ROW_1.map((a) => (
              <Item key={a.label} className="border-b border-line lg:border-b-0">
                <AmenityCell amenity={a} />
              </Item>
            ))}
          </Stagger>
          <Stagger className="grid grid-cols-2 gap-x-6 border-t border-line lg:grid-cols-4">
            {AMENITIES_ROW_2.map((a) => (
              <Item key={a.label}>
                <AmenityCell amenity={a} />
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      {/* a day at sukha */}
      <section className="bg-cream">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-12 px-6 py-20 md:grid-cols-[1.3fr_1fr] md:gap-[84px] md:px-[120px] md:py-24">
          <ParallaxImage
            src={img.amenitiesPoolside}
            alt="A slow morning by the pool"
            caption="A SLOW MORNING · SUKHA"
            className="aspect-[3/4] w-full md:aspect-[4/5]"
            amount={60}
          />
          <div>
            <Reveal>
              <Eyebrow>YOUR OWN RHYTHM</Eyebrow>
            </Reveal>
            <Headline lines={["Nothing scheduled.", "Everything possible."]} className="mt-5 text-5xl leading-[1.05] md:text-[51px] md:leading-[53px]" />
            <div className="relative mt-10 border-t border-line">
              {/* scroll-drawn progress line */}
              <motion.span
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                className="absolute top-0 left-0 h-full w-[2px] origin-top bg-clay"
              />
              {RHYTHM.map((r, i) => (
                <motion.div
                  key={r.event}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex cursor-default items-center gap-5 border-b border-line py-4 pl-5 transition-colors duration-300 hover:bg-sand sm:gap-6"
                >
                  <span className="w-12 shrink-0 font-sans text-[13px] font-medium text-clay">{r.time}</span>
                  <span className="font-mono text-[10px] leading-[1.8] tracking-[1.3px]">{r.event}</span>
                </motion.div>
              ))}
            </div>
            <Reveal delay={0.1}>
              <p className="mt-8 font-serif text-[18px] text-stone italic">Or ignore the clock entirely.</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* practical details */}
      <section className="bg-blush">
        <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-[120px] md:py-20">
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <Headline lines={["Good to know."]} className="text-4xl md:text-[43px]" />
            <Reveal>
              <p className="font-mono text-[9px] tracking-[1.9px] text-clay">BEFORE YOU ARRIVE</p>
            </Reveal>
          </div>
          <Stagger className="mt-8 grid grid-cols-2 gap-x-6 border-t border-blushline lg:grid-cols-4">
            {PRACTICAL.map((p) => (
              <Item key={p.label} className="flex flex-col gap-3 py-7">
                <span className="font-mono text-[9px] tracking-[1.6px] text-clay">{p.label}</span>
                <span className="font-serif text-[22px]">{p.value}</span>
              </Item>
            ))}
          </Stagger>
          <Reveal>
            <p className="mt-4 text-[14px] text-stone">
              Need something else? Our hosts are nearby and happy to help.
            </p>
          </Reveal>
        </div>
      </section>

      <ClosingBand eyebrow="READY WHEN YOU ARE" title={["Come settle in."]} />
    </>
  );
}
