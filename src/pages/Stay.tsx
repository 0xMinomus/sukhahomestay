import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ClosingBand, GhostButton } from "../components/bits";
import Hero from "../components/Hero";
import { Eyebrow, Headline, Item, ParallaxImage, Reveal, Stagger } from "../components/motion";
import { ROOMS, img } from "../data/content";

const RITUALS = ["DAILY BREAKFAST", "BOTANICAL BATH", "BICYCLES", "WIFI"];

const HOUSE_RULES = [
  { label: "CHECK-IN", value: "2:00 PM" },
  { label: "CHECK-OUT", value: "11:00 AM" },
  { label: "MINIMUM STAY", value: "2 NIGHTS" },
];

export default function Stay() {
  return (
    <>
      <Hero
        img={img.stayHero}
        eyebrow="ROOMS · UBUD, BALI"
        title={["Wake gently,", "stay awhile."]}
        description="Three intimate rooms shaped by local craft, garden air, and the unhurried rhythm of island life."
      />

      {/* collection */}
      <section className="bg-cream">
        <div className="mx-auto max-w-[1440px] px-6 pt-20 pb-8 md:px-[120px] md:pt-28">
          <Reveal>
            <Eyebrow>A SMALL COLLECTION</Eyebrow>
          </Reveal>
          <Headline lines={["Rooms with a sense", "of place."]} className="mt-5 text-5xl leading-[1.05] md:text-[56px]" />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-[16px] leading-[26px] text-stone">
              Compare the view, room size, bed and outdoor space — then open the room that feels most like
              yours.
            </p>
          </Reveal>
        </div>

        <div className="mx-auto flex max-w-[1440px] flex-col gap-20 px-6 pb-24 md:px-[120px] md:pb-32">
          {ROOMS.map((room, i) => (
            <article
              key={room.slug}
              id={`room-${room.slug}`}
              className={`grid scroll-mt-28 grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16 ${
                i % 2 === 1 ? "" : ""
              }`}
            >
              <Link
                to={`/rooms/${room.slug}`}
                className={`group block overflow-hidden ${i % 2 === 1 ? "md:order-2" : ""}`}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={room.mainImg}
                    alt={room.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <span className="absolute bottom-5 left-5 flex translate-y-2 items-center gap-2 font-mono text-[10px] tracking-[1.6px] text-cream opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    VIEW DETAILS <ArrowUpRight size={14} />
                  </span>
                </div>
              </Link>
              <div className={i % 2 === 1 ? "md:order-1" : ""}>
                <Reveal>
                  <p className="font-mono text-[10px] tracking-[2px] text-clay">
                    {room.index} / {room.view}
                  </p>
                </Reveal>
                <Reveal delay={0.05}>
                  <h3 className="mt-4 font-serif text-4xl md:text-[44px]">{room.name}</h3>
                </Reveal>
                <Reveal delay={0.1}>
                  <p className="mt-4 max-w-md text-[15px] leading-[25px] text-stone">{room.cardDescription}</p>
                </Reveal>
                <Reveal delay={0.15}>
                  <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[10px] tracking-[1.5px] text-ink">
                    <span>{room.specs.guests}</span>
                    <span>{room.specs.bed}</span>
                    <span>{room.specs.size}</span>
                  </div>
                </Reveal>
                <Reveal delay={0.2} className="mt-6 flex flex-wrap items-center gap-6">
                  <span className="font-serif text-2xl">FROM {room.price.replace("From ", "").split("/")[0].trim()}</span>
                  <Link
                    to={`/rooms/${room.slug}`}
                    className="group flex items-center gap-2 font-mono text-[10px] tracking-[1.6px] text-clay"
                  >
                    VIEW DETAILS
                    <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </Reveal>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* rituals + quote */}
      <section className="bg-sand">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-12 px-6 py-20 md:grid-cols-2 md:gap-20 md:px-[120px] md:py-28">
          <div>
            <Reveal>
              <Eyebrow>INCLUDED IN EVERY STAY</Eyebrow>
            </Reveal>
            <Headline lines={["Little rituals,", "thoughtfully kept."]} className="mt-5 text-5xl leading-[1.05] md:text-[56px]" />
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-[16px] leading-[26px] text-stone">
                Wake to a tray of Balinese coffee. Cool down with botanical bath salts. Return from the rice
                fields to fresh fruit and a turned-down room.
              </p>
            </Reveal>
            <Stagger className="mt-8 grid grid-cols-2 gap-px bg-line">
              {RITUALS.map((r) => (
                <Item key={r} className="bg-sand py-5 pr-4 font-mono text-[10px] tracking-[1.6px]">
                  <span className="mr-3 text-clay">✦</span>
                  {r}
                </Item>
              ))}
            </Stagger>
          </div>
          <div className="flex flex-col gap-6">
            <ParallaxImage src={img.stayRitual} alt="Morning ritual" className="aspect-[3/2] w-full" amount={40} />
            <Reveal delay={0.1} className="border-l-2 border-clay pl-6">
              <p className="font-serif text-[22px] leading-snug italic">
                “The kind of place where you stop checking the time. We slept with the doors open to the
                garden and woke to birds and the smell of coffee.”
              </p>
              <p className="mt-4 font-mono text-[9px] tracking-[2px] text-stone">MARA & ELIAS · COPENHAGEN</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* arrival notes + terrace */}
      <section className="bg-cream">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-12 px-6 py-20 md:grid-cols-2 md:gap-16 md:px-[120px] md:py-28">
          <div className="order-2 md:order-1">
            <Reveal>
              <Eyebrow>BEFORE YOU ARRIVE</Eyebrow>
            </Reveal>
            <Headline lines={["Easy in,", "slow out."]} className="mt-5 text-5xl leading-[1.05] md:text-[56px]" />
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-[16px] leading-[26px] text-stone">
                Check in from 2:00 PM and let the day soften — your room will be cool, the coffee warm, and
                our hosts nearby for anything you need.
              </p>
            </Reveal>
            <Stagger className="mt-10 border-t border-line">
              {HOUSE_RULES.map((h) => (
                <Item
                  key={h.label}
                  className="group flex cursor-default items-baseline justify-between gap-4 border-b border-line py-5 transition-colors duration-300 hover:bg-sand"
                >
                  <span className="font-mono text-[9px] tracking-[1.8px] text-clay">{h.label}</span>
                  <span className="text-right font-serif text-[26px] transition-transform duration-300 group-hover:-translate-x-1">
                    {h.value}
                  </span>
                </Item>
              ))}
            </Stagger>
            <Reveal delay={0.1}>
              <p className="mt-6 text-[14px] text-stone">
                Arriving early or leaving late? Message our host — we’ll do our best.
              </p>
            </Reveal>
            <Reveal delay={0.15} className="mt-8">
              <GhostButton to="/booking" label="PLAN YOUR STAY" />
            </Reveal>
          </div>
          <ParallaxImage
            src={img.stayTerrace}
            alt="Guest terrace"
            caption="THE GUEST TERRACE · GOLDEN HOUR"
            className="order-1 aspect-[3/4] w-full md:order-2"
            amount={50}
          />
        </div>
      </section>

      <ClosingBand eyebrow="YOUR ROOM IS WAITING" title={["Come stay with us."]} />
    </>
  );
}
