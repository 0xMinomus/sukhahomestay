import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import { HashRouter, Link, Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Eyebrow, Headline } from "./components/motion";
import Amenities from "./pages/Amenities";
import Booking from "./pages/Booking";
import Dining from "./pages/Dining";
import Experiences from "./pages/Experiences";
import Landing from "./pages/Landing";
import RoomDetail from "./pages/RoomDetail";
import Stay from "./pages/Stay";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
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
      <ScrollToTop />
      <Navbar tone={tone} />
      <AnimatePresence mode="wait">
        <motion.main
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
    <HashRouter>
      <Shell />
    </HashRouter>
  );
}
