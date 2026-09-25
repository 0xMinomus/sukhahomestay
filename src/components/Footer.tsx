import { Link } from "react-router-dom";
import { EMAIL_URL, WHATSAPP_URL } from "../data/content";
import { Reveal } from "./motion";

const COLS: { heading: string; links: { label: string; to?: string; href?: string }[] }[] = [
  {
    heading: "STAY",
    links: [
      { label: "Rooms", to: "/stay" },
      { label: "Amenities", to: "/amenities" },
    ],
  },
  {
    heading: "EXPLORE",
    links: [
      { label: "Experiences", to: "/experiences" },
      { label: "Dining", to: "/dining" },
    ],
  },
  {
    heading: "CONTACT",
    links: [
      { label: "WhatsApp", href: WHATSAPP_URL },
      { label: "Email", href: EMAIL_URL },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-moss text-cream">
      <div className="mx-auto max-w-[1440px] px-6 py-12 md:px-[72px] md:pt-[48px] md:pb-[34px]">
        <Reveal>
          <div className="flex flex-col justify-between gap-10 md:flex-row md:items-start">
            <Link to="/" className="flex flex-col gap-[7px]">
              <span className="font-serif text-[38px] leading-none tracking-[7px]">SUKHA</span>
              <span className="font-mono text-[9px] tracking-[2px] text-footmuted">
                SIDEMEN · EAST BALI
              </span>
            </Link>
            <div className="flex flex-wrap gap-12 md:gap-[70px]">
              {COLS.map((c) => (
                <div key={c.heading} className="flex flex-col gap-[11px]">
                  <p className="font-mono text-[9px] tracking-[2px] text-claylight">{c.heading}</p>
                  {c.links.map((l) =>
                    l.to ? (
                      <Link key={l.label} to={l.to} className="group relative inline-flex min-h-[24px] w-fit items-center text-[13px] text-foottext">
                        {l.label}
                        <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-claylight transition-transform duration-300 group-hover:scale-x-100" />
                      </Link>
                    ) : (
                      <a
                        key={l.label}
                        href={l.href}
                        target={l.href?.startsWith("http") ? "_blank" : undefined}
                        rel="noreferrer"
                        className="group relative inline-flex min-h-[24px] w-fit items-center text-[13px] text-foottext"
                      >
                        {l.label}
                        <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-claylight transition-transform duration-300 group-hover:scale-x-100" />
                      </a>
                    ),
                  )}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
        <div className="mt-[42px] border-t border-footline pt-[18px]">
          <p className="font-mono text-[9px] tracking-[1.5px] text-[#A39C91]">© 2026 SUKHA HOMESTAY</p>
        </div>
      </div>
    </footer>
  );
}
