import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, CalendarDays, Check, ChevronDown, Loader2 } from "lucide-react";
import { useMemo, useState, type FormEvent } from "react";
import { Eyebrow, Headline, Item, ParallaxImage, Reveal, Stagger } from "../components/motion";
import { ASSURANCES, BOOKING_STEPS, PHONE_DISPLAY, ROOMS, WHATSAPP_URL, img } from "../data/content";

type Status = "idle" | "sending" | "sent";

const inputCls =
  "w-full border-b border-line bg-transparent py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-stone/50 focus:border-clay";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="font-mono text-[9px] tracking-[1.8px] text-clay">{label}</span>
      <span className="mt-1 block">{children}</span>
    </label>
  );
}

export default function Booking() {
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const [checkIn, setCheckIn] = useState("2026-10-12");
  const [checkOut, setCheckOut] = useState("2026-10-16");
  const [guests, setGuests] = useState("2 adults");
  const [room, setRoom] = useState(ROOMS[0].name);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");

  const nights = useMemo(() => {
    const ms = new Date(checkOut).getTime() - new Date(checkIn).getTime();
    return Math.max(0, Math.round(ms / 86400000));
  }, [checkIn, checkOut]);

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !contact.trim()) {
      setError("Please share your name and how to reach you.");
      return;
    }
    if (nights <= 0) {
      setError("Check-out needs to fall after check-in.");
      return;
    }
    setError("");
    setStatus("sending");
    window.setTimeout(() => {
      setReference(`SKH-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`);
      setStatus("sent");
    }, 1400);
  }

  function reset() {
    setStatus("idle");
    setName("");
    setContact("");
    setMessage("");
  }

  return (
    <>
      {/* header — cream, so the nav renders in dark tone */}
      <section className="bg-cream pt-[76px]">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-10 px-6 pt-14 pb-16 md:grid-cols-[1.2fr_1fr] md:items-end md:px-[120px] md:pt-20">
          <div>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <Eyebrow>PLAN YOUR STAY</Eyebrow>
            </motion.div>
            <Headline lines={["A little space", "to slow down."]} className="mt-5 text-5xl leading-[1.02] md:text-[68px]" delay={0.1} as="h1" />
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-6 max-w-xl text-[16px] leading-[26px] text-stone"
            >
              Tell us when you’d like to come. We’ll reply personally with room options, thoughtful details
              and everything you need for an easy arrival.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="md:justify-self-end"
          >
            <p className="font-mono text-[9px] tracking-[2px] text-clay">PREFER TO TALK?</p>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="group mt-3 flex flex-wrap items-center gap-3">
              <span className="font-serif text-2xl break-all transition-colors group-hover:text-clay sm:text-3xl">{PHONE_DISPLAY}</span>
              <ArrowUpRight size={20} className="text-clay transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* reservation + form */}
      <section className="bg-sand">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-6 py-16 md:grid-cols-2 md:gap-16 md:px-[120px] md:py-20">
          <div>
            <ParallaxImage src={img.bookingGarden} alt="The garden at Sukha" className="aspect-[4/3] w-full" amount={40} />
            <Reveal className="mt-10">
              <Eyebrow>01 / SHARE YOUR DATES</Eyebrow>
            </Reveal>
            <Headline lines={["Start with the", "essentials."]} className="mt-4 text-4xl md:text-[44px]" />
            <Reveal delay={0.08}>
              <p className="mt-5 max-w-md text-[15px] leading-[25px] text-stone">
                This is an enquiry, not an instant booking. One of our hosts will check availability and
                reply within 24 hours.
              </p>
            </Reveal>
            <Stagger className="mt-8 border-t border-line">
              {BOOKING_STEPS.map((s, i) => (
                <Item key={s} className="flex items-center gap-5 border-b border-line py-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-clay font-mono text-[11px] text-clay">
                    0{i + 1}
                  </span>
                  <span className="text-[14px]">{s}</span>
                </Item>
              ))}
            </Stagger>
            <Reveal delay={0.1} className="mt-8">
              <p className="font-mono text-[9px] tracking-[1.8px] text-clay">NEED A HAND?</p>
              <p className="mt-2 max-w-sm text-[14px] text-stone">
                Families, longer stays and special celebrations are warmly welcomed.
              </p>
            </Reveal>
          </div>

          {/* form card */}
          <Reveal delay={0.1} className="h-fit rounded-[6px] border border-line bg-cream p-7 md:sticky md:top-24 md:p-10">
            <AnimatePresence mode="wait">
              {status === "sent" ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex min-h-[480px] flex-col items-center justify-center gap-5 text-center"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-clay text-cream"
                  >
                    <Check size={28} />
                  </motion.span>
                  <h3 className="font-serif text-4xl">Thank you, {name.split(" ")[0]}.</h3>
                  <p className="max-w-sm text-[15px] leading-[25px] text-stone">
                    Your enquiry <span className="font-mono text-[12px] text-clay">{reference}</span> is with
                    our hosts. Expect a personal reply within 24 hours — {nights} night{nights === 1 ? "" : "s"} in
                    the {room}, from {checkIn}.
                  </p>
                  <div className="mt-2 flex flex-wrap justify-center gap-4">
                    <button
                      onClick={reset}
                      className="cursor-pointer rounded-[4px] border border-ink px-6 py-3 font-mono text-[10px] tracking-[1.4px] transition-colors hover:bg-ink hover:text-cream"
                    >
                      NEW ENQUIRY
                    </button>
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-[4px] bg-ink px-6 py-3 font-mono text-[10px] tracking-[1.4px] text-cream transition-colors hover:bg-clay"
                    >
                      MESSAGE HOST
                    </a>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4 }}
                  onSubmit={submit}
                  className="flex flex-col gap-6"
                >
                  <h3 className="font-serif text-[28px]">Your stay enquiry</h3>
                  <div className="grid grid-cols-1 gap-6 min-[420px]:grid-cols-2">
                    <Field label="CHECK IN">
                      <span className="relative block">
                        <CalendarDays size={15} className="pointer-events-none absolute top-1/2 right-1 -translate-y-1/2 text-stone" />
                        <input type="date" value={checkIn} min={today} onChange={(e) => setCheckIn(e.target.value)} className={inputCls} />
                      </span>
                    </Field>
                    <Field label="CHECK OUT">
                      <span className="relative block">
                        <CalendarDays size={15} className="pointer-events-none absolute top-1/2 right-1 -translate-y-1/2 text-stone" />
                        <input type="date" value={checkOut} min={checkIn || today} onChange={(e) => setCheckOut(e.target.value)} className={inputCls} />
                      </span>
                    </Field>
                    <Field label="GUESTS">
                      <span className="relative block">
                        <select value={guests} onChange={(e) => setGuests(e.target.value)} className={`${inputCls} appearance-none`}>
                          {["1 adult", "2 adults", "2 adults + 1 child", "2 adults + 2 children"].map((g) => (
                            <option key={g}>{g}</option>
                          ))}
                        </select>
                        <ChevronDown size={15} className="pointer-events-none absolute top-1/2 right-1 -translate-y-1/2 text-stone" />
                      </span>
                    </Field>
                    <Field label="ROOM PREFERENCE">
                      <span className="relative block">
                        <select value={room} onChange={(e) => setRoom(e.target.value)} className={`${inputCls} appearance-none`}>
                          {ROOMS.map((r) => (
                            <option key={r.slug}>{r.name}</option>
                          ))}
                          <option>Advise me</option>
                        </select>
                        <ChevronDown size={15} className="pointer-events-none absolute top-1/2 right-1 -translate-y-1/2 text-stone" />
                      </span>
                    </Field>
                  </div>

                  <div className="flex items-center justify-between rounded-[4px] bg-sand px-4 py-3 font-mono text-[10px] tracking-[1.4px]">
                    <span className="text-stone">YOUR STAY</span>
                    <AnimatePresence mode="popLayout">
                      <motion.span
                        key={nights}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="text-clay"
                      >
                        {nights > 0 ? `${nights} NIGHT${nights === 1 ? "" : "S"}` : "SELECT DATES"}
                      </motion.span>
                    </AnimatePresence>
                  </div>

                  <Field label="NAME">
                    <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" className={inputCls} />
                  </Field>
                  <Field label="EMAIL OR WHATSAPP">
                    <input value={contact} onChange={(e) => setContact(e.target.value)} placeholder="How should we reach you?" className={inputCls} />
                  </Field>
                  <Field label="ANYTHING WE SHOULD KNOW?">
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Dietary needs, airport transfer, celebrations…"
                      rows={3}
                      className={`${inputCls} resize-none`}
                    />
                  </Field>

                  <AnimatePresence>
                    {error && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden text-[13px] text-clay"
                      >
                        {error}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <motion.button
                    type="submit"
                    disabled={status === "sending"}
                    whileHover={status === "idle" ? { scale: 1.02 } : undefined}
                    whileTap={status === "idle" ? { scale: 0.98 } : undefined}
                    className="flex cursor-pointer items-center justify-center gap-3 rounded-[4px] bg-ink py-4 font-mono text-[10px] tracking-[1.6px] text-cream transition-colors duration-300 hover:bg-clay disabled:opacity-70"
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 size={15} className="animate-spin" /> SENDING…
                      </>
                    ) : (
                      <>
                        SEND ENQUIRY <ArrowUpRight size={15} />
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </Reveal>
        </div>
      </section>

      {/* assurances */}
      <section className="bg-cream">
        <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-[120px] md:py-24">
          <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
            <Headline lines={["Arrive with ease."]} className="text-4xl md:text-[43px]" />
            <Reveal>
              <p className="font-mono text-[9px] tracking-[1.9px] text-clay">THOUGHTFUL FROM FIRST HELLO</p>
            </Reveal>
          </div>
          <Stagger className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {ASSURANCES.map((a) => (
              <Item key={a.heading} className="group flex flex-col gap-4 border border-line bg-cream p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(41,36,31,0.35)]">
                <a.icon size={26} strokeWidth={1.5} className="text-clay" />
                <p className="font-mono text-[10px] tracking-[1.8px]">{a.heading}</p>
                <p className="text-[14px] leading-[22px] text-stone">{a.copy}</p>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}
