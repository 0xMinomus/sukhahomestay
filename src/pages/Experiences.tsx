import ExperienceCard from "../components/ExperienceCard";
import { ClosingBand, GhostButton } from "../components/bits";
import Hero from "../components/Hero";
import { Eyebrow, Headline, Item, ParallaxImage, Reveal, Stagger } from "../components/motion";
import { EXPERIENCES, img } from "../data/content";

export default function Experiences() {
  const [signature, ...secondaryExperiences] = EXPERIENCES;
  return (
    <>
      <Hero
        img={img.experiencesHero}
        imgAlt="Two people walking a path through misty terraced fields below a palm-covered hillside"
        eyebrow="EXPERIENCES · SIDEMEN, EAST BALI"
        title={["Let Sidemen set", "the pace."]}
        description="Village walks, field paths and mountain light around Sukha Homestay."
        scrollCue
      />

      {/* intro */}
      <section className="bg-cream">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-10 px-6 py-16 md:grid-cols-2 md:gap-20 md:px-[72px] lg:px-[120px] md:py-24">
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
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-12 px-6 py-20 md:grid-cols-2 md:gap-20 md:px-[72px] lg:px-[120px] md:py-24">
          <ParallaxImage
            src={signature.img}
            alt={signature.imageAlt}
            caption={signature.imageCaption}
            className="aspect-[3/4] w-full"
            amount={55}
          />
          <div>
            <Reveal>
              <p className="font-serif text-[64px] leading-none text-clay/25">{signature.index.split(" / ")[0]}</p>
            </Reveal>
            <Reveal>
              <Eyebrow className="mt-2">{signature.overviewLabel}</Eyebrow>
            </Reveal>
            <Headline lines={signature.overviewTitle} className="mt-5 text-5xl leading-[1.05] md:text-[52px]" />
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-[16px] leading-[26px] text-stone">{signature.overviewBody}</p>
            </Reveal>
            <Stagger className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
              {signature.facts.map((fact) => (
                <Item key={fact.label} className="flex flex-col gap-1.5">
                  <span className="font-mono text-[9px] tracking-[1.8px] text-clay">{fact.label}</span>
                  <span className="font-serif text-[19px]">{fact.value}</span>
                </Item>
              ))}
            </Stagger>
            <Reveal delay={0.1} className="mt-8">
              <GhostButton to={`/experiences/${signature.slug}`} label={`EXPLORE ${signature.title.toUpperCase()}`} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* more ways */}
      <section className="bg-cream">
        <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-[72px] lg:px-[120px] md:py-24">
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <Headline lines={["More ways to wander."]} className="text-4xl md:text-[44px]" />
            <Reveal>
              <p className="font-mono text-[9px] tracking-[1.9px] text-clay">AVAILABILITY CONFIRMED BY MESSAGE</p>
            </Reveal>
          </div>
          <Stagger className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {secondaryExperiences.map((experience) => (
              <Item key={experience.slug}>
                <ExperienceCard experience={experience} />
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      {/* booking pathway */}
      <section className="bg-sand">
        <div className="mx-auto max-w-[1440px] px-6 py-20 text-center md:px-[72px] lg:px-[120px] md:py-24">
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

      <ClosingBand
        eyebrow="ENQUIRE ABOUT YOUR STAY"
        title={["Explore at Sidemen’s pace."]}
        cta={{ label: "ENQUIRE ABOUT YOUR STAY", to: "/booking" }}
      />
    </>
  );
}
