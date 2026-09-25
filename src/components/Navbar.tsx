import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { EMAIL_URL, NAV_LINKS, ROOMS, WHATSAPP_URL } from "../data/content";
import { cn } from "../lib/cn";

const linkCls = (isActive: boolean) =>
  cn(
    "group relative inline-flex min-h-[44px] items-center font-mono text-[10px] tracking-[1.4px] transition-colors duration-300",
    isActive ? "opacity-100" : "opacity-80 hover:opacity-100",
  );

function Underline() {
  return (
    <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 ease-out group-hover:scale-x-100" />
  );
}

export default function Navbar({ tone }: { tone: "light" | "dark" }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();

  /* transparent at top → frosted glass as you scroll */
  const progress = useTransform(scrollY, [0, 140], [0, 1]);
  const bg = useTransform(progress, [0, 1], ["rgba(255,253,249,0)", "rgba(255,253,249,0.82)"]);
  const blur = useTransform(progress, (v) => `blur(${v * 14}px) saturate(1.25)`);
  const border = useTransform(progress, [0, 1], ["rgba(41,36,31,0)", "rgba(41,36,31,0.12)"]);
  const color = useTransform(
    progress,
    [0, 1],
    tone === "light" ? ["#FFFDF9", "#29241F"] : ["#29241F", "#29241F"],
  );

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 60);
  });

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open ]);

  return (
    <>
      <motion.header
        style={{
          backgroundColor: bg,
          backdropFilter: blur,
          WebkitBackdropFilter: blur,
          borderBottomColor: border,
          color,
        }}
        className="fixed inset-x-0 top-0 z-50 border-b border-transparent"
      >
        <nav className="mx-auto flex h-[68px] max-w-[1440px] items-center justify-between px-4 sm:h-[76px] sm:px-6 md:px-14">
          <button
            onClick={() => setOpen(true)}
            className="group flex min-h-[44px] cursor-pointer items-center gap-3 px-1"
            aria-label="Open menu"
          >
            <Menu size={18} strokeWidth={1.75} className="transition-transform duration-500 group-hover:rotate-90" />
            <span className="font-mono text-[11px] tracking-[1.8px]">MENU</span>
          </button>

          <Link
            to="/"
            onClick={() => {
              if (location.pathname === "/") window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="absolute left-1/2 flex -translate-x-1/2 flex-col items-center gap-[1px]"
            aria-label="Sukha home"
          >
            <span className="font-serif text-[20px] leading-none tracking-[5px] sm:text-[26px] sm:tracking-[7px] md:text-[30px]">SUKHA</span>
            <span className="font-mono text-[6px] tracking-[2.4px] sm:text-[7px] sm:tracking-[3.2px] md:text-[8px]">BALI HOMESTAY</span>
          </Link>

          <div className="flex items-center gap-5 md:gap-7">
            <NavLink to="/stay" className={({ isActive }) => cn(linkCls(isActive), "hidden translate-y-1 sm:inline-block")}>
              STAY
              <Underline />
            </NavLink>
            <NavLink to="/experiences" className={({ isActive }) => cn(linkCls(isActive), "hidden translate-y-1 sm:inline-block")}>
              EXPERIENCES
              <Underline />
            </NavLink>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Link
                to="/booking"
                className={cn(
                  "flex items-center gap-2 rounded-[4px] px-3 py-2.5 font-mono text-[10px] tracking-[1.4px] outline-1 -outline-offset-1 outline-current transition-colors duration-300 sm:gap-2.5 sm:px-4 sm:py-3",
                  scrolled ? "hover:bg-ink hover:text-cream" : "hover:bg-cream/15",
                )}
              >
                <span className="hidden min-[480px]:inline">BOOK YOUR STAY</span>
                <span className="min-[480px]:hidden">BOOK</span>
                <ArrowUpRight size={14} />
              </Link>
            </motion.div>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            className="fixed inset-0 z-[60] flex flex-col bg-moss text-cream"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mx-auto flex h-[68px] w-full max-w-[1440px] items-center justify-between px-4 sm:h-[76px] sm:px-6 md:px-14">
              <button
                onClick={() => setOpen(false)}
                className="group flex min-h-[44px] cursor-pointer items-center gap-3 px-1"
                aria-label="Close menu"
              >
                <X size={20} strokeWidth={1.75} className="transition-transform duration-500 group-hover:rotate-90" />
                <span className="font-mono text-[11px] tracking-[1.8px]">CLOSE</span>
              </button>
              <span className="absolute left-1/2 -translate-x-1/2 font-serif text-[18px] tracking-[5px] sm:text-[22px] sm:tracking-[6px]">
                SUKHA
              </span>
              <span className="hidden font-mono text-[11px] tracking-[1.8px] opacity-70 sm:block">
                SIDEMEN · EAST BALI
              </span>
            </div>

            <div className="mx-auto grid w-full max-w-[1440px] flex-1 grid-cols-1 items-center gap-6 overflow-y-auto px-6 pt-2 pb-10 sm:grid-cols-[1.15fr_1fr] sm:gap-8 md:gap-10 lg:grid-cols-[1.2fr_1fr] lg:px-14">
              <nav className="flex flex-col gap-1">
                {[{ label: "Home", to: "/" }, ...NAV_LINKS].map((l, i) => (
                  <motion.div
                    key={l.to}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.07, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      to={l.to}
                      className="group flex items-baseline gap-3 py-0.5 sm:gap-4 sm:py-1"
                    >
                      <span className="font-mono text-[10px] tracking-[2px] text-claylight">
                        0{i + 1}
                      </span>
                      <span className="font-serif text-4xl leading-[1.05] transition-all duration-300 group-hover:translate-x-3 group-hover:text-claylight md:text-5xl lg:text-6xl">
                        {l.label}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="hidden flex-col gap-8 sm:flex sm:pl-6 lg:pl-10"
              >
                <div>
                  <p className="mb-4 font-mono text-[9px] tracking-[2px] text-claylight">ROOMS</p>
                  <div className="flex flex-col gap-2">
                    {ROOMS.map((r) => (
                      <Link
                        key={r.slug}
                        to={`/rooms/${r.slug}`}
                        className="group flex items-center justify-between border-b border-cream/15 py-3"
                      >
                        <span className="font-serif text-xl transition-transform duration-300 group-hover:translate-x-2 sm:text-2xl">
                          {r.name}
                        </span>
                        <span className="hidden font-mono text-[10px] tracking-[1.5px] text-foottext lg:block">
                          {r.specs.size} · {r.price.split("/")[0].trim()}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2 font-mono text-[11px] tracking-[1.6px]">
                  <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="inline-flex min-h-[44px] w-fit items-center opacity-80 hover:text-claylight hover:opacity-100">
                    WHATSAPP ↗
                  </a>
                  <a href={EMAIL_URL} className="inline-flex min-h-[44px] w-fit items-center opacity-80 hover:text-claylight hover:opacity-100">
                    EMAIL ↗
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
