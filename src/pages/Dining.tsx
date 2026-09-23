import { ClosingBand } from "../components/bits";
import Hero from "../components/Hero";
import { Eyebrow, Headline, Item, ParallaxImage, Reveal, Stagger } from "../components/motion";
import { SEASONAL, img } from "../data/content";

const FACTS = [
  { label: "SERVED", value: "7:00 — 10:00" },
  { label: "STYLE", value: "BALINESE + CONTINENTAL" },
  { label: "DIETARY", value: "VEGETARIAN FRIENDLY" },
];

export default function Dining() {
  return (
    <>
      <Hero
        img={img.diningHero}
        eyebrow="FROM GARDEN TO TABLE"
        title={["Meals that begin", "with the landscape."]}
        description="Seasonal Balinese cooking, shared slowly at our long table."
      />

      {/* intro */}
      <section className="bg-cream">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-10 px-6 py-16 md:grid-cols-2 md:gap-20 md:px-[120px] md:py-24">
          <div>
            <Reveal>
              <Eyebrow>THE SUKHA TABLE</Eyebrow>
            </Reveal>
            <Headline lines={["Local ingredients.", "Generous hands."]} className="mt-4 text-5xl leading-[1.05] md:text-[52px]" />
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-[450px] text-[16px] leading-[26px] text-stone md:justify-self-end">
              Our kitchen follows the seasons and the morning market. Rice comes from nearby fields, herbs
              from the garden, and recipes from the families who have cooked here for generations.
            </p>
          </Reveal>
        </div>
      </section>

      {/* breakfast */}
      <section className="bg-sand">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-12 px-6 py-20 md:grid-cols-2 md:gap-20 md:px-[120px] md:py-24">
          <ParallaxImage
            src={img.diningBreakfast}
            alt="Breakfast served daily"
            caption="BREAKFAST · SERVED DAILY"
            className="aspect-[3/4] w-full"
            amount={55}
          />
          <div>
            <Reveal>
              <Eyebrow>01 / MORNING</Eyebrow>
            </Reveal>
            <Headline lines={["Breakfast follows", "the sunrise."]} className="mt-5 text-5xl leading-[1.05] md:text-[52px]" />
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-[16px] leading-[26px] text-stone">
                Wake to Balinese coffee, warm rice, market fruit and whatever the garden offers that morning.
                Breakfast is included with every stay.
              </p>
            </Reveal>
            <Stagger className="mt-8 grid grid-cols-1 gap-px border-t border-line bg-line sm:grid-cols-3">
              {FACTS.map((f) => (
                <Item key={f.label} className="flex flex-col gap-2 bg-sand py-5 pr-4">
                  <span className="font-mono text-[9px] tracking-[1.8px] text-clay">{f.label}</span>
                  <span className="font-serif text-[19px]">{f.value}</span>
                </Item>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* supper */}
      <section className="bg-cream">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-12 px-6 py-20 md:grid-cols-2 md:gap-20 md:px-[120px] md:py-24">
          <div>
            <Reveal>
              <Eyebrow>02 / EVENING</Eyebrow>
            </Reveal>
            <Headline
              lines={["Sit down as", "strangers. Leave", "as friends."]}
              className="mt-5 text-5xl leading-[1.05] md:text-[52px]"
            />
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-[16px] leading-[26px] text-stone">
                Some evenings we cook a shared family-style supper. The menu changes with the market and is
                announced each morning.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-6 inline-block border border-line bg-sand px-4 py-2 font-mono text-[9px] tracking-[1.8px] text-clay">
                AVAILABLE ON SELECT NIGHTS
              </p>
            </Reveal>
          </div>
          <ParallaxImage
            src={img.diningLongtable}
            alt="Shared supper at the long table"
            caption="SUPPER · WHEN SERVED"
            className="aspect-[4/3] w-full"
            amount={45}
          />
        </div>
      </section>

      {/* seasonal */}
      <section className="bg-blush">
        <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-[120px] md:py-20">
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <Headline lines={["What’s on the table."]} className="text-4xl md:text-[43px]" />
            <Reveal>
              <p className="font-mono text-[9px] tracking-[1.9px] text-clay">A TASTE OF SIDEMEN</p>
            </Reveal>
          </div>
          <Stagger className="mt-8 grid grid-cols-2 gap-x-6 border-t border-blushline lg:grid-cols-4">
            {SEASONAL.map((s) => (
              <Item key={s.label} className="flex flex-col gap-3 py-7">
                <span className="font-mono text-[9px] tracking-[1.8px] text-clay">{s.label}</span>
                <span className="max-w-[220px] text-[14px] leading-[22px] text-ink/80">{s.copy}</span>
              </Item>
            ))}
          </Stagger>
          <Reveal>
            <p className="mt-4 text-[14px] text-stone">
              Menus change daily. Please share dietary needs when booking.
            </p>
          </Reveal>
        </div>
      </section>

      <ClosingBand eyebrow="TAKE A SEAT" title={["Supper is better shared."]} cta={{ label: "PLAN YOUR STAY", to: "/booking" }} />
    </>
  );
}
