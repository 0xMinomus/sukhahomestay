import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, CalendarDays, Check, ChevronDown } from "lucide-react";
import { useEffect, useId, useMemo, useRef, useState, type FormEvent } from "react";
import { Eyebrow, Headline, Item, ParallaxImage, Reveal, Stagger } from "../components/motion";
import { ASSURANCES, BOOKING_STEPS, PHONE_DISPLAY, ROOMS, WHATSAPP_URL, img } from "../data/content";

/* Nothing is booked here: the form only prepares a WhatsApp enquiry for the guest to send. */
type Status = "idle" | "prepared";
type ErrorField = "checkIn" | "checkOut" | "name" | "contact";
type FormError = { field: ErrorField; message: string };

const inputCls =
  "w-full border-b border-line bg-transparent py-3 text-[15px] text-ink outline-none transition-colors placeholder:text-stone/50 focus:border-clay";

const GUEST_OPTIONS = ["1 adult", "2 adults", "2 adults + 1 child", "2 adults + 2 children"];
const ROOM_OPTIONS = ROOMS.map((r) => r.name);

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function toISODate(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

/* Local midnight for a yyyy-mm-dd value, or null when it isn't a real calendar date. */
function parseISODate(value: string): number | null {
  if (!DATE_RE.test(value)) return null;
  const [y, m, d] = value.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) return null;
  return date.getTime();
}

function formatStayDate(value: string): string {
  const ms = parseISODate(value);
  if (ms === null) return value;
  return new Date(ms).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

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

/* A date input with appearance-none keeps the native picker hit target, so the field is a
   house underline carrying our own formatted value, and a real button stands in for the
   native indicator: focusable, keyboard-operable, and the only thing that opens the picker.
   The input stays in the DOM with its name, ref, min and aria wiring, and is hidden by
   painting alone — absolute, opacity-0, and not pointer-events-none — so it can never
   swallow a click meant for the button. */
function DateField({
  name,
  label,
  value,
  min,
  inputRef,
  invalid,
  describedBy,
  onChange,
}: {
  name: string;
  label: string;
  value: string;
  min: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
  invalid: boolean;
  describedBy?: string;
  onChange: (value: string) => void;
}) {
  const openPicker = () => {
    const el = inputRef.current;
    if (!el) return;
    try {
      el.showPicker();
    } catch {
      // NotAllowedError without a fresh user gesture, InvalidStateError when the picker is
      // already open. Both are expected and there is nothing to recover.
    }
  };
  const openFromKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      openPicker();
    }
  };
  const labelId = `${name}-label`;

  return (
    <div>
      <span id={labelId} className="font-mono text-[9px] tracking-[1.8px] text-clay">
        {label}
      </span>
      <div className="relative mt-1 flex items-center justify-between border-b border-line py-3 transition-colors hover:border-blushline focus-within:border-clay">
        <span
          aria-hidden="true"
          className={`text-[15px] ${value ? "text-ink" : "text-stone/50"}`}
        >
          {value ? formatStayDate(value) : "Select a date"}
        </span>
        <span aria-hidden="true" className="text-clay">
          <CalendarDays size={15} />
        </span>
        <input
          ref={inputRef}
          type="date"
          name={name}
          value={value}
          min={min}
          /* The trigger below is the one tab stop for this field, so the input is reachable
             by script and by assistive tech but not twice by keyboard. Leaving it tabbable
             also made Tab walk its internal day/month/year segments — three stops the guest
             cannot see. */
          tabIndex={-1}
          aria-labelledby={labelId}
          aria-invalid={invalid}
          aria-describedby={describedBy}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={openFromKey}
          className="absolute inset-0 h-full w-full appearance-none bg-transparent opacity-0"
        />
        {/* type="button" keeps Enter from implicitly submitting the form and Space from
            scrolling the page; the native button semantics then open the picker for free.
            The label carries the current value because the visible text is aria-hidden. */}
        <button
          type="button"
          onClick={openPicker}
          onKeyDown={openFromKey}
          aria-label={`Choose ${label.toLowerCase()} date${value ? `, currently ${formatStayDate(value)}` : ""}`}
          className="absolute inset-x-0 top-0 -bottom-px z-10 cursor-pointer"
        />
      </div>
    </div>
  );
}

/* A select-only combobox, following the W3C APG pattern: the trigger keeps DOM focus at all
   times and the highlighted option is published through aria-activedescendant, so Escape
   closes the list without focus ever leaving the field. The option list is house-styled
   rather than drawn by the OS, which is the only way the open state can be on-brand — a
   native <select> menu is drawn in the system font on the system surface and no CSS
   reaches it. */
function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  const uid = useId();
  const labelId = `${uid}-label`;
  const listId = `${uid}-list`;
  const optionId = (i: number) => `${listId}-opt-${i}`;
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [flip, setFlip] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const show = () => {
    const rect = rootRef.current?.getBoundingClientRect();
    if (rect) {
      const below = window.innerHeight - rect.bottom;
      setFlip(below < 200 && rect.top > below);
    }
    setActive(Math.max(0, options.indexOf(value)));
    setOpen(true);
  };
  const commit = (i: number) => {
    onChange(options[i]);
    setOpen(false);
  };

  /* A pointer-down anywhere else closes the list. The setState lives in the listener, not
     in the effect body, so it is a genuine outside interaction rather than a render-phase
     update. */
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "Enter":
      case " ":
        e.preventDefault();
        if (open) commit(active);
        else show();
        break;
      case "ArrowDown":
        e.preventDefault();
        if (!open) show();
        else setActive((i) => Math.min(options.length - 1, i + 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        if (!open) show();
        else setActive((i) => Math.max(0, i - 1));
        break;
      case "Home":
        if (!open) return;
        e.preventDefault();
        setActive(0);
        break;
      case "End":
        if (!open) return;
        e.preventDefault();
        setActive(options.length - 1);
        break;
      case "Escape":
        if (!open) return;
        e.preventDefault();
        setOpen(false);
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  };

  return (
    <div ref={rootRef}>
      <span id={labelId} className="font-mono text-[9px] tracking-[1.8px] text-clay">
        {label}
      </span>
      <div className="relative mt-1">
        {/* The trigger is a real button carrying the value and the chevron, not a
            transparent overlay: an empty overlay is invisible to naive hit-testing, and the
            field has to be clickable for a guest, a screen reader and a test harness alike. */}
        <button
          type="button"
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listId}
          aria-labelledby={labelId}
          aria-activedescendant={open ? optionId(active) : undefined}
          onClick={() => (open ? setOpen(false) : show())}
          onKeyDown={onKeyDown}
          className="flex w-full cursor-pointer items-center justify-between gap-3 border-b border-line py-3 text-left transition-colors hover:border-blushline focus:border-clay"
        >
          <span className="text-[15px] text-ink">{value}</span>
          <span
            aria-hidden="true"
            className={`shrink-0 text-clay transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          >
            <ChevronDown size={15} />
          </span>
        </button>
        {/* Always in the DOM, hidden when collapsed, so aria-controls resolves to a real
            element id in both states rather than dangling at null while closed. */}
        <ul
          id={listId}
          role="listbox"
          aria-labelledby={labelId}
          className={`absolute inset-x-0 z-30 overflow-hidden rounded-[4px] border border-line bg-cream py-1 shadow-[0_20px_40px_-24px_rgba(41,36,31,0.35)] ${
            open ? (flip ? "bottom-full mb-1" : "top-full mt-1") : "hidden"
          }`}
        >
            {options.map((o, i) => (
              <li
                key={o}
                id={optionId(i)}
                role="option"
                aria-selected={o === value}
                onMouseEnter={() => setActive(i)}
                onClick={() => commit(i)}
                className={`flex min-h-[44px] cursor-pointer items-center justify-between gap-3 px-4 text-[15px] transition-colors ${
                  i === active ? "bg-sand text-ink" : "text-ink"
                }`}
              >
                <span>{o}</span>
                {o === value && (
                  <span className="shrink-0 text-clay">
                    <Check size={14} strokeWidth={2} />
                  </span>
                )}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default function Booking() {
  const reduce = useReducedMotion();
  const today = useMemo(() => toISODate(new Date()), []);
  const todayMs = useMemo(() => parseISODate(today) ?? 0, [today]);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2 adults");
  const [room, setRoom] = useState(ROOMS[0].name);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<FormError | null>(null);
  const [handoffUrl, setHandoffUrl] = useState("");

  const checkInRef = useRef<HTMLInputElement>(null);
  const checkOutRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const contactRef = useRef<HTMLInputElement>(null);

  const nights = useMemo(() => {
    const inMs = parseISODate(checkIn);
    const outMs = parseISODate(checkOut);
    if (inMs === null || outMs === null) return 0;
    return Math.max(0, Math.round((outMs - inMs) / 86400000));
  }, [checkIn, checkOut]);

  function focusField(field: ErrorField) {
    const el =
      field === "name" ? nameRef.current
      : field === "contact" ? contactRef.current
      : field === "checkIn" ? checkInRef.current
      : checkOutRef.current;
    el?.focus();
  }

  function clearErrorFor(field: ErrorField) {
    setError((prev) => (prev?.field === field ? null : prev));
  }

  function validate(): FormError | null {
    if (!name.trim()) return { field: "name", message: "Please add the name we should reply to." };
    if (!contact.trim()) {
      return { field: "contact", message: "Please add an email address or WhatsApp number so we can reply." };
    }
    if (!checkIn || !checkOut) {
      return {
        field: checkIn ? "checkOut" : "checkIn",
        message: "Please choose both your check-in and check-out dates.",
      };
    }
    const inMs = parseISODate(checkIn);
    if (inMs === null) return { field: "checkIn", message: "That check-in date isn't a real date — please choose another." };
    const outMs = parseISODate(checkOut);
    if (outMs === null) return { field: "checkOut", message: "That check-out date isn't a real date — please choose another." };
    if (inMs < todayMs) return { field: "checkIn", message: "Check-in can't be in the past — please choose today or later." };
    if (outMs < todayMs) return { field: "checkOut", message: "Check-out can't be in the past — please choose today or later." };
    if (outMs <= inMs) return { field: "checkOut", message: "Check-out needs to fall at least one night after check-in." };
    return null;
  }

  function buildHandoffUrl(): string {
    const body = [
      "Hello Sukha Homestay — I'd like to ask about a stay.",
      "",
      `Name: ${name.trim()}`,
      `Contact: ${contact.trim()}`,
      `Check in: ${formatStayDate(checkIn)}`,
      `Check out: ${formatStayDate(checkOut)}`,
      `Nights: ${nights}`,
      `Guests: ${guests}`,
      `Room preference: ${room}`,
      ...(message.trim() ? ["", message.trim()] : []),
    ].join("\n");
    const query = WHATSAPP_URL.includes("?") ? "&text=" : "?text=";
    return `${WHATSAPP_URL}${query}${encodeURIComponent(body)}`;
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    const invalid = validate();
    if (invalid) {
      setError(invalid);
      focusField(invalid.field);
      return;
    }
    setError(null);
    const url = buildHandoffUrl();
    setHandoffUrl(url);
    setStatus("prepared");
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function reset() {
    setStatus("idle");
    setHandoffUrl("");
    setName("");
    setContact("");
    setMessage("");
    setError(null);
    window.requestAnimationFrame(() => nameRef.current?.focus());
  }

  return (
    <>
      {/* header — cream, so the nav renders in dark tone */}
      <section className="bg-cream pt-[76px]">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-10 px-6 pt-14 pb-16 md:grid-cols-[1.2fr_1fr] md:items-end md:px-[72px] lg:px-[120px] md:pt-20">
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
              Choose your dates and we’ll write the enquiry out for you. You send it from your own
              WhatsApp, and a host replies there with room options and the details for an easy arrival.
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
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-6 py-16 md:gap-16 md:px-[72px] lg:px-[120px] md:py-20 lg:grid-cols-2">
          <div>
            <ParallaxImage src={img.bookingGarden} alt="The garden at Sukha" className="aspect-[4/3] w-full" amount={40} />
            <Reveal className="mt-10">
              <Eyebrow>01 / SHARE YOUR DATES</Eyebrow>
            </Reveal>
            <Headline lines={["Start with the", "essentials."]} className="mt-4 text-4xl md:text-[44px]" />
            <Reveal delay={0.08}>
              <p className="mt-5 max-w-md text-[15px] leading-[25px] text-stone">
                This is an enquiry, not an instant booking. Nothing is sent from this page: the form
                hands your dates and details to WhatsApp, and you send them yourself. Replies come
                from the host on WhatsApp.
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
          <Reveal delay={0.1} className="h-fit rounded-[6px] border border-line bg-cream p-7 lg:sticky lg:top-24 md:p-10">
            <AnimatePresence mode="wait">
              {status === "prepared" ? (
                <motion.div
                  key="prepared"
                  ref={(el) => {
                    el?.focus();
                  }}
                  tabIndex={-1}
                  role="status"
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
                  animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex min-h-[480px] flex-col items-center justify-center gap-5 text-center outline-none"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-clay text-cream">
                    <ArrowUpRight size={28} />
                  </span>
                  <Eyebrow>WHATSAPP HANDOFF · NOT SENT YET</Eyebrow>
                  <h3 className="font-serif text-4xl">Ready to send, {name.split(" ")[0]}.</h3>
                  <p className="max-w-sm text-[15px] leading-[25px] text-stone">
                    WhatsApp should be opening in a new tab with your enquiry written out. Nothing has
                    been sent and nothing is held — tap send there and a host will reply to{" "}
                    <span className="text-ink">{contact.trim()}</span> personally.
                  </p>
                  <dl className="w-full max-w-sm border-t border-line font-mono text-[10px] tracking-[1.4px]">
                    {[
                      ["CHECK IN", formatStayDate(checkIn)],
                      ["CHECK OUT", formatStayDate(checkOut)],
                      ["NIGHTS", String(nights)],
                      ["GUESTS", guests],
                      ["ROOM PREFERENCE", room],
                    ].map(([label, value]) => (
                      <div key={label} className="flex items-baseline justify-between gap-4 border-b border-line py-3 text-left">
                        <dt className="shrink-0 text-stone">{label}</dt>
                        <dd className="text-right text-clay">{value}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="max-w-sm text-[12px] leading-[19px] text-stone">
                    No WhatsApp tab? Your browser may have blocked it —{" "}
                    <a href={handoffUrl} target="_blank" rel="noreferrer" className="text-clay underline underline-offset-4">
                      open the prepared message
                    </a>
                    .
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <button
                      onClick={reset}
                      className="cursor-pointer rounded-[4px] border border-ink px-6 py-3 font-mono text-[10px] tracking-[1.4px] transition-colors hover:bg-ink hover:text-cream"
                    >
                      EDIT DETAILS
                    </button>
                    <a
                      href={handoffUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 rounded-[4px] bg-ink px-6 py-3 font-mono text-[10px] tracking-[1.4px] text-cream transition-colors hover:bg-clay"
                    >
                      OPEN WHATSAPP AGAIN <ArrowUpRight size={14} />
                    </a>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  noValidate
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
                  animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
                  transition={{ duration: 0.4 }}
                  onSubmit={submit}
                  className="flex flex-col gap-6"
                >
                  <h3 className="font-serif text-[28px]">Your stay enquiry</h3>
                  <div className="grid grid-cols-1 gap-6 min-[420px]:grid-cols-2">
                    <DateField
                      name="checkIn"
                      label="CHECK IN"
                      value={checkIn}
                      min={today}
                      inputRef={checkInRef}
                      invalid={error?.field === "checkIn"}
                      describedBy={error?.field === "checkIn" ? "booking-error" : undefined}
                      onChange={(v) => {
                        setCheckIn(v);
                        clearErrorFor("checkIn");
                      }}
                    />
                    <DateField
                      name="checkOut"
                      label="CHECK OUT"
                      value={checkOut}
                      min={checkIn || today}
                      inputRef={checkOutRef}
                      invalid={error?.field === "checkOut"}
                      describedBy={error?.field === "checkOut" ? "booking-error" : undefined}
                      onChange={(v) => {
                        setCheckOut(v);
                        clearErrorFor("checkOut");
                      }}
                    />
                    <SelectField
                      label="GUESTS"
                      value={guests}
                      options={GUEST_OPTIONS}
                      onChange={setGuests}
                    />
                    <SelectField
                      label="ROOM PREFERENCE"
                      value={room}
                      options={[...ROOM_OPTIONS, "Advise me"]}
                      onChange={setRoom}
                    />
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
                    <input
                      ref={nameRef}
                      name="name"
                      autoComplete="name"
                      value={name}
                      aria-invalid={error?.field === "name"}
                      aria-describedby={error?.field === "name" ? "booking-error" : undefined}
                      onChange={(e) => {
                        setName(e.target.value);
                        clearErrorFor("name");
                      }}
                      placeholder="Your full name"
                      className={inputCls}
                    />
                  </Field>
                  <Field label="EMAIL OR WHATSAPP">
                    <input
                      ref={contactRef}
                      name="contact"
                      autoComplete="off"
                      value={contact}
                      aria-invalid={error?.field === "contact"}
                      aria-describedby={error?.field === "contact" ? "booking-error" : undefined}
                      onChange={(e) => {
                        setContact(e.target.value);
                        clearErrorFor("contact");
                      }}
                      placeholder="How should we reach you?"
                      className={inputCls}
                    />
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
                        key="error"
                        id="booking-error"
                        role="alert"
                        initial={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
                        animate={reduce ? { opacity: 1 } : { opacity: 1, height: "auto" }}
                        exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
                        className="overflow-hidden text-[13px] text-clay"
                      >
                        {error.message}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <div>
                    <motion.button
                      type="submit"
                      whileHover={reduce ? undefined : { scale: 1.02 }}
                      whileTap={reduce ? undefined : { scale: 0.98 }}
                      className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-[4px] bg-ink py-4 font-mono text-[10px] tracking-[1.6px] text-cream transition-colors duration-300 hover:bg-clay"
                    >
                      CONTINUE IN WHATSAPP <ArrowUpRight size={15} />
                    </motion.button>
                    <p className="mt-3 text-center font-mono text-[9px] leading-[15px] tracking-[1.5px] text-stone">
                      HANDOFF ONLY · WHATSAPP OPENS WITH YOUR DETAILS · YOU TAP SEND THERE
                    </p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </Reveal>
        </div>
      </section>

      {/* assurances */}
      <section className="bg-cream">
        <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-[72px] lg:px-[120px] md:py-24">
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
