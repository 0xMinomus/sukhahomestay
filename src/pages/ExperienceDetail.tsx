import { Navigate, useParams } from "react-router-dom";
import ExperienceCard from "../components/ExperienceCard";
import { ClosingBand, GhostButton } from "../components/bits";
import Hero from "../components/Hero";
import { Eyebrow, Headline, Item, Reveal, Stagger } from "../components/motion";
import { EXPERIENCES, getExperienceBySlug } from "../data/content";

export default function ExperienceDetail() {
  const { slug } = useParams();
  const experience = getExperienceBySlug(slug);

  if (!experience) return <Navigate to="/experiences" replace />;

  const relatedExperiences = EXPERIENCES.filter((candidate) => candidate.slug !== experience.slug);

  return (
    <>
      <Hero img={experience.img} eyebrow={experience.index} title={experience.heroTitle} />

      <section className="bg-cream">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-10 px-6 py-20 md:grid-cols-2 md:gap-20 md:px-[120px] md:py-28">
          <div>
            <Reveal>
              <Eyebrow>DETAILS TO CONFIRM</Eyebrow>
            </Reveal>
            <Headline lines={["Make room for", "the details."]} className="mt-5 text-5xl leading-[1.05] md:text-[56px]" />
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-md text-[16px] leading-[26px] text-stone md:justify-self-end">
              {experience.overviewBody}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-[120px] md:py-24">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <Headline lines={["Before you go."]} className="text-4xl md:text-[43px]" />
            <Reveal>
              <Eyebrow>CONFIRM BY MESSAGE</Eyebrow>
            </Reveal>
          </div>
          <Stagger className="mt-10 grid grid-cols-2 gap-px border-t border-line bg-line md:grid-cols-2">
            {experience.facts.map((fact) => (
              <Item key={fact.label} className="flex flex-col gap-3 bg-cream p-6">
                <span className="font-mono text-[8px] tracking-[1.5px] text-clay">{fact.label}</span>
                <span className="font-serif text-[22px] leading-tight">{fact.value}</span>
              </Item>
            ))}
          </Stagger>
          <Reveal delay={0.1} className="mt-10">
            <p className="max-w-2xl text-[15px] leading-[25px] text-stone">{experience.hostConfirmation}</p>
          </Reveal>
          <Reveal delay={0.15} className="mt-8">
            <GhostButton to="/booking" label={experience.enquiryLabel} />
          </Reveal>
        </div>
      </section>

      <section className="bg-sand">
        <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-[120px] md:py-24">
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <Headline lines={["More ways to wander."]} className="text-4xl md:text-[44px]" />
            <Reveal>
              <p className="font-mono text-[9px] tracking-[1.9px] text-clay">AVAILABILITY CONFIRMED BY MESSAGE</p>
            </Reveal>
          </div>
          <Stagger className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {relatedExperiences.map((relatedExperience) => (
              <Item key={relatedExperience.slug}>
                <ExperienceCard experience={relatedExperience} />
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      <ClosingBand
        eyebrow="PLAN YOUR STAY"
        title={["Explore at Sidemen’s pace."]}
        cta={{ label: "ENQUIRE ABOUT YOUR STAY", to: "/booking" }}
      />
    </>
  );
}
