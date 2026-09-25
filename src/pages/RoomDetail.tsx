import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { GhostButton } from "../components/bits";
import Hero from "../components/Hero";
import { Eyebrow, Headline, Item, ParallaxImage, Reveal, Stagger } from "../components/motion";
import { ROOMS, WHATSAPP_URL } from "../data/content";

const BENEFITS = "BREAKFAST INCLUDED · ENQUIRE WITH THE HOST DIRECTLY";

export default function RoomDetail() {
  const { slug } = useParams();
  const idx = ROOMS.findIndex((r) => r.slug === slug?.trim().replace(/\/+$/, "").toLowerCase());
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!lightbox) {
      triggerRef.current?.focus({ preventScroll: true });
      return;
    }

    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    /* Escape closes, and Tab stays on the single close control inside the dialog. */
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        setLightbox(null);
      } else if (e.key === "Tab") {
        e.preventDefault();
        closeRef.current?.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [lightbox]);

  if (idx === -1) return <Navigate to="/stay" replace />;
  const room = ROOMS[idx];

  return (
    <>
      <Hero
        img={room.heroImg}
        eyebrow={`${room.index} / ${room.name.toUpperCase()}`}
        title={[room.name]}
        description={room.tagline}
        meta={[room.specs.guests, room.specs.bed, room.specs.size, room.specs.outdoor]}
      />

      {/* overview */}
      <section className="bg-cream">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-10 px-6 py-20 md:grid-cols-2 md:gap-20 md:px-[120px] md:py-28">
          <div>
            <Reveal>
              <Eyebrow>{room.overviewLabel}</Eyebrow>
            </Reveal>
            <Headline lines={room.overviewTitle} className="mt-5 text-5xl leading-[1.05] md:text-[56px]" />
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-md text-[16px] leading-[26px] text-stone md:justify-self-end">{room.overviewBody}</p>
          </Reveal>
        </div>
      </section>

      {/* gallery */}
      <section className="bg-sand">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-5 px-6 py-16 md:grid-cols-[1.4fr_1fr] md:px-[72px] md:py-20">
          <motion.button
            type="button"
            aria-haspopup="dialog"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => {
              triggerRef.current = e.currentTarget;
              setLightbox({ src: room.mainImg, alt: `${room.name} — ${room.mainCaption}` });
            }}
            className="group relative block cursor-zoom-in overflow-hidden text-left"
          >
            <ParallaxImage src={room.mainImg} alt={room.name} caption={room.mainCaption} className="aspect-[4/3] w-full" amount={40} />
            <span className="absolute top-5 right-5 rounded-full bg-cream/90 px-4 py-2 font-mono text-[9px] tracking-[1.6px] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
              ENLARGE +
            </span>
          </motion.button>
          <div className="flex flex-col gap-5">
            <motion.button
              type="button"
              aria-haspopup="dialog"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => {
                triggerRef.current = e.currentTarget;
                setLightbox({ src: room.detailImg, alt: `${room.name} — room detail` });
              }}
              className="group relative block cursor-zoom-in overflow-hidden text-left"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={room.detailImg}
                  alt={`${room.name} detail`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.05]"
                />
              </div>
            </motion.button>
            <Reveal delay={0.15} className="flex flex-1 flex-col justify-center gap-4 bg-blush p-8">
              <Eyebrow>MATERIAL NOTES</Eyebrow>
              <p className="font-serif text-[31px] leading-[33px]">
                {room.materialTitle[0]}
                <br />
                {room.materialTitle[1]}
              </p>
              <p className="text-[13px] text-stone">{room.materialCopy}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* inclusions */}
      <section className="bg-cream">
        <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-[120px] md:py-24">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <Headline lines={["Everything included."]} className="text-4xl md:text-[43px]" />
            <Reveal>
              <Eyebrow>IN EVERY STAY</Eyebrow>
            </Reveal>
          </div>
          <Stagger className="mt-10 grid grid-cols-2 gap-px border-t border-line bg-line md:grid-cols-3 lg:grid-cols-6">
            {room.inclusions.map((inc) => (
              <Item key={inc.label} className="group flex flex-col gap-3 bg-cream p-6 transition-colors duration-300 hover:bg-sand">
                <inc.icon size={22} strokeWidth={1.5} className="text-clay transition-transform duration-300 group-hover:-translate-y-1" />
                <span className="font-mono text-[8px] tracking-[1.5px]">{inc.label}</span>
                <span className="text-[12px] leading-[18px] text-stone">{inc.copy}</span>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      {/* booking card */}
      <section className="bg-sand">
        <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-[120px] md:py-24">
          <Reveal className="mx-auto max-w-3xl rounded-[6px] border border-line bg-cream p-8 text-center md:p-14">
            <Eyebrow>{room.bookingLabel}</Eyebrow>
            <p className="mt-5 font-serif text-4xl md:text-[44px]">{room.price}</p>
            <p className="mt-4 text-[14px] text-stone">{room.terms}</p>
            <p className="mt-6 font-mono text-[9px] tracking-[1.8px] text-clay">{BENEFITS}</p>
            <div className="mt-8 flex flex-col items-center gap-4">
              <GhostButton to="/booking" label="CHECK AVAILABILITY" />
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="group font-mono text-[10px] tracking-[1.6px] text-stone hover:text-clay">
                QUESTIONS? MESSAGE OUR HOST
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            key="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={`${room.name} — enlarged view`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[70] flex cursor-zoom-out items-center justify-center bg-ink/90 p-6 backdrop-blur-sm"
          >
            <motion.img
              key={lightbox.src}
              src={lightbox.src}
              alt={lightbox.alt}
              initial={{ scale: 0.92, y: 24 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 12 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="max-h-[86vh] max-w-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              ref={closeRef}
              type="button"
              onClick={() => setLightbox(null)}
              aria-label="Close enlarged view"
              className="absolute top-6 right-6 cursor-pointer rounded-full bg-cream/15 p-3 text-cream backdrop-blur transition-colors hover:bg-cream/30"
            >
              <X size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
