import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import { BrowserRouter, Link, Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Eyebrow, Headline } from "./components/motion";
import { ROOMS } from "./data/content";
import Amenities from "./pages/Amenities";
import Booking from "./pages/Booking";
import Dining from "./pages/Dining";
import Experiences from "./pages/Experiences";
import Landing from "./pages/Landing";
import RoomDetail from "./pages/RoomDetail";
import Stay from "./pages/Stay";

const SITE_NAME = "Sukha Homestay";
const DEFAULT_TITLE = "Sukha · Bali Homestay — Sidemen, East Bali";

function routeMeta(pathname: string): { title: string; description: string } {
  if (pathname === "/") {
    return {
      title: DEFAULT_TITLE,
      description:
        "Sukha is an intimate, family-led homestay in Sidemen, East Bali — slow mornings, garden rooms, seasonal food and valley walks.",
    };
  }
  if (pathname === "/stay") {
    return {
      title: `Stay · ${SITE_NAME}`,
      description:
        "Three garden rooms in Sidemen, East Bali — honest comfort, natural materials, valley air.",
    };
  }
  if (pathname.startsWith("/rooms/")) {
    const slug = pathname.slice("/rooms/".length);
    const room = ROOMS.find((r) => r.slug === slug);
    if (room) {
      return {
        title: `${room.name} · ${SITE_NAME}`,
        description: `${room.name} at Sukha Homestay, Sidemen, East Bali — ${room.tagline}`,
      };
    }
  }
  const pages: Record<string, { title: string; description: string }> = {
    "/amenities": {
      title: `Amenities · ${SITE_NAME}`,
      description:
        "Fans, air-conditioning, hot water, fast Wi-Fi and garden corners at Sukha Homestay, Sidemen.",
    },
    "/dining": {
      title: `Dining · ${SITE_NAME}`,
      description:
        "Seasonal Balinese home cooking, breakfast in the garden, long-table dinners in Sidemen.",
    },
    "/experiences": {
      title: `Experiences · ${SITE_NAME}`,
      description:
        "Valley walks, rice-field mornings and slow craft afternoons around Sukha Homestay, East Bali.",
    },
    "/booking": {
      title: `Booking · ${SITE_NAME}`,
      description:
        "Reserve your stay at Sukha Homestay, Sidemen, East Bali — direct rates, no fees.",
    },
  };
  return (
    pages[pathname] ?? {
      title: `Not Found · ${SITE_NAME}`,
      description: "This path has overgrown.",
    }
  );
}

function setMetaTag(selector: string, attr: string, value: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, value);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function RouteMeta() {
  const { pathname } = useLocation();
  useEffect(() => {
    const { title, description } = routeMeta(pathname);
    document.title = title;
    setMetaTag('meta[name="description"]', "name", "description", description);
    setMetaTag('meta[property="og:title"]', "property", "og:title", title);
    setMetaTag('meta[property="og:description"]', "property", "og:description", description);
    setMetaTag('meta[property="og:url"]', "property", "og:url", window.location.href);
    setMetaTag('meta[name="twitter:title"]', "name", "twitter:title", title);
    setMetaTag('meta[name="twitter:description"]', "name", "twitter:description", description);
  }, [pathname]);
  return null;
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    scrollToTop();
    const frame = window.requestAnimationFrame(scrollToTop);
    const timeout = window.setTimeout(scrollToTop, 0);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
    };
  }, [pathname]);

  return null;
}

function NotFound() {
  return (
    <div className="flex min-h-[80svh] flex-col items-center justify-center gap-6 bg-cream px-6 text-center">
      <Eyebrow>ELSEWHERE IN THE GARDEN</Eyebrow>
      <Headline lines={["This path has", "overgrown."]} className="text-5xl md:text-6xl" />
      <Link
        to="/"
        className="rounded-[4px] bg-ink px-8 py-4 font-mono text-[10px] tracking-[1.6px] text-cream transition-colors hover:bg-clay"
      >
        WANDER HOME
      </Link>
    </div>
  );
}

function Shell() {
  const location = useLocation();
  const tone = location.pathname.startsWith("/booking") ? "dark" : "light";

  return (
    <div className="min-h-screen bg-cream">
      <RouteMeta />
      <ScrollToTop />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-ink focus:px-4 focus:py-3 focus:text-cream"
      >
        Skip to content
      </a>
      <Navbar tone={tone} />
      <AnimatePresence mode="wait">
        <motion.main
          id="main-content"
          key={location.pathname}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <Routes location={location}>
            <Route path="/" element={<Landing />} />
            <Route path="/stay" element={<Stay />} />
            <Route path="/rooms/:slug" element={<RoomDetail />} />
            <Route path="/amenities" element={<Amenities />} />
            <Route path="/dining" element={<Dining />} />
            <Route path="/experiences" element={<Experiences />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  );
}
