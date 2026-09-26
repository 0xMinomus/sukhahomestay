import { Component, type ReactNode } from "react";
import { PAGE_FALLBACK, WHATSAPP_URL } from "../data/content";
import { GhostButton } from "./bits";
import { Eyebrow, Headline } from "./motion";

/* Holds a throw from any page so the Navbar, the footer and the way home survive it.
   Mounted inside the keyed <main> in App.tsx: a throw in one page never takes down the
   site, and moving to another route remounts the boundary, so the next page loads clean.
   No componentDidCatch on purpose — nothing here reports anywhere. */
export default class ErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state: { failed: boolean } = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (!this.state.failed) return this.props.children;

    return (
      <div className="flex min-h-[80svh] flex-col items-center justify-center gap-6 bg-cream px-6 text-center text-ink">
        <Eyebrow>{PAGE_FALLBACK.eyebrow}</Eyebrow>
        <Headline as="h1" lines={PAGE_FALLBACK.title} className="text-5xl md:text-6xl" />
        <p className="max-w-md text-[15px] leading-[25px] text-stone">{PAGE_FALLBACK.copy}</p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <GhostButton to="/" label={PAGE_FALLBACK.homeLabel} />
          <GhostButton href={WHATSAPP_URL} label={PAGE_FALLBACK.hostLabel} />
        </div>
      </div>
    );
  }
}
