import {
  Bath,
  BedDouble,
  Bike,
  Car,
  Coffee,
  MessageCircle,
  Snowflake,
  Sparkles,
  Trees,
  Utensils,
  Waves,
  Wifi,
  Wind,
  type LucideIcon,
} from "lucide-react";

import amenitiesHero from "../assets/img/amenities-hero.webp";
import amenitiesPoolside from "../assets/img/amenities-poolside.jpg";
import bookingGarden from "../assets/img/booking-garden.jpg";
import diningBreakfast from "../assets/img/dining-breakfast.jpg";
import diningHero from "../assets/img/dining-hero.webp";
import diningLongtable from "../assets/img/dining-longtable.jpg";
import experiencesHero from "../assets/img/experiences-hero.webp";
import landingGardenSuite from "../assets/img/landing-garden-suite.jpg";
import landingHero from "../assets/img/landing-hero.webp";
import landingMountain from "../assets/img/landing-mountain.jpg";
import landingTable from "../assets/img/landing-table.jpg";
import landingVillage from "../assets/img/landing-village.jpg";
import landingWater from "../assets/img/landing-water.jpg";
import roomCanopyDetail from "../assets/img/room-canopy-detail.jpg";
import roomCanopyHero from "../assets/img/room-canopy-hero.webp";
import roomCanopyMain from "../assets/img/room-canopy-main.jpg";
import roomCourtyardDetail from "../assets/img/room-courtyard-detail.jpg";
import roomCourtyardHero from "../assets/img/room-courtyard-hero.webp";
import roomCourtyardMain from "../assets/img/room-courtyard-main.jpg";
import roomGardenDetail from "../assets/img/room-garden-detail.jpg";
import roomGardenHero from "../assets/img/room-garden-hero.webp";
import roomGardenMain from "../assets/img/room-garden-main.jpg";
import stayHero from "../assets/img/stay-hero.webp";
import stayRitual from "../assets/img/stay-ritual.jpg";
import stayTerrace from "../assets/img/stay-terrace.jpg";

export const img = {
  amenitiesHero,
  amenitiesPoolside,
  bookingGarden,
  diningBreakfast,
  diningHero,
  diningLongtable,
  experiencesHero,
  landingGardenSuite,
  landingHero,
  landingMountain,
  landingTable,
  landingVillage,
  landingWater,
  roomCanopyDetail,
  roomCanopyHero,
  roomCanopyMain,
  roomCourtyardDetail,
  roomCourtyardHero,
  roomCourtyardMain,
  roomGardenDetail,
  roomGardenHero,
  roomGardenMain,
  stayHero,
  stayRitual,
  stayTerrace,
};

/* ---------------------------------- nav ---------------------------------- */

export const NAV_LINKS = [
  { label: "Stay", to: "/stay" },
  { label: "Experiences", to: "/experiences" },
  { label: "Dining", to: "/dining" },
  { label: "Amenities", to: "/amenities" },
  { label: "Contact", to: "/booking" },
];

export const WHATSAPP_URL = "https://wa.me/6281234567890";
export const EMAIL_URL = "mailto:hello@sukhabali.com";
export const PHONE_DISPLAY = "+62 812 3456 7890";

/* ---------------------------------- rooms --------------------------------- */

export interface RoomInclusion {
  icon: LucideIcon;
  label: string;
  copy: string;
}

export interface Room {
  slug: string;
  index: string;
  view: string;
  name: string;
  tagline: string;
  overviewLabel: string;
  overviewTitle: [string, string];
  overviewBody: string;
  heroImg: string;
  mainImg: string;
  mainCaption: string;
  detailImg: string;
  materialTitle: [string, string];
  materialCopy: string;
  specs: { guests: string; bed: string; size: string; outdoor: string };
  price: string;
  terms: string;
  bookingLabel: string;
  cardDescription: string;
  inclusions: RoomInclusion[];
}

const baseInclusions = (bed: string, outdoor: [string, string]): RoomInclusion[] => [
  { icon: BedDouble, label: bed, copy: "Cotton linen" },
  { icon: Bath, label: "ENSUITE BATH", copy: "Rain shower + bath salts" },
  { icon: Coffee, label: "BREAKFAST", copy: "Served each morning" },
  { icon: Trees, label: outdoor[0], copy: outdoor[1] },
  { icon: Wifi, label: "WI-FI", copy: "Wi-Fi access in the room" },
  { icon: Wind, label: "CLIMATE", copy: "A/C and ceiling fan" },
];

export const ROOMS: Room[] = [
  {
    slug: "garden-suite",
    index: "01",
    view: "GARDEN VIEW",
    name: "Garden Suite",
    tagline: "A private garden room made for open doors and slow mornings.",
    overviewLabel: "YOUR OWN CORNER OF THE GARDEN",
    overviewTitle: ["Where the garden", "comes inside."],
    overviewBody:
      "The Garden Suite opens directly to a shaded terrace framed by frangipani and palms. Inside, cool stone floors, local timber and handwoven textiles create a calm, tactile retreat.",
    heroImg: roomGardenHero,
    mainImg: roomGardenMain,
    mainCaption: "PRIVATE TERRACE · GARDEN VIEW",
    detailImg: roomGardenDetail,
    materialTitle: ["Stone, timber,", "and woven cotton."],
    materialCopy: "Stone, local timber and handwoven textiles bring a tactile, natural palette.",
    specs: { guests: "2 GUESTS", bed: "KING BED", size: "46 M²", outdoor: "PRIVATE TERRACE" },
    price: "From IDR 1.850K / night",
    terms: "Breakfast included · 2 guests · Minimum stay may apply",
    bookingLabel: "STAY IN THE GARDEN SUITE",
    cardDescription: "Largest room with a private terrace opening directly to the garden.",
    inclusions: baseInclusions("KING BED", ["TERRACE", "Private garden seating"]),
  },
  {
    slug: "canopy-room",
    index: "02",
    view: "ELEVATED VIEW",
    name: "Canopy Room",
    tagline: "An elevated hideaway wrapped in leaves and mountain air.",
    overviewLabel: "HIGH AMONG THE TREES",
    overviewTitle: ["Wake within", "the canopy."],
    overviewBody:
      "Perched above the garden, the Canopy Room looks toward palms and distant ridgelines. Breezes move through timber shutters while a private balcony becomes your front-row seat to sunrise.",
    heroImg: roomCanopyHero,
    mainImg: roomCanopyMain,
    mainCaption: "PRIVATE BALCONY · CANOPY VIEW",
    detailImg: roomCanopyDetail,
    materialTitle: ["Timber, rattan,", "and soft linen."],
    materialCopy: "Lightweight materials keep the room airy and connected to the trees.",
    specs: { guests: "2 GUESTS", bed: "QUEEN BED", size: "38 M²", outdoor: "CANOPY BALCONY" },
    price: "From IDR 1.550K / night",
    terms: "Breakfast included · 2 guests · Upper-floor access",
    bookingLabel: "STAY IN THE CANOPY ROOM",
    cardDescription: "A breezy upper-floor hideaway with a balcony among the treetops.",
    inclusions: baseInclusions("QUEEN BED", ["BALCONY", "Elevated garden view"]),
  },
  {
    slug: "courtyard-studio",
    index: "03",
    view: "PRIVATE COURTYARD",
    name: "Courtyard Studio",
    tagline: "A quiet studio gathered around its own sunlit courtyard.",
    overviewLabel: "PRIVATE, COOL, AND CLOSE TO EARTH",
    overviewTitle: ["A courtyard of", "your own."],
    overviewBody:
      "The Courtyard Studio is compact, grounded and deeply private. A walled garden draws daylight into the room while polished stone and hand-finished plaster keep the atmosphere cool.",
    heroImg: roomCourtyardHero,
    mainImg: roomCourtyardMain,
    mainCaption: "WALLED COURTYARD · MORNING LIGHT",
    detailImg: roomCourtyardDetail,
    materialTitle: ["Plaster, stone,", "and handmade tile."],
    materialCopy: "Polished stone and hand-finished plaster bring a cool, grounded palette.",
    specs: { guests: "2 GUESTS", bed: "KING BED", size: "34 M²", outdoor: "PRIVATE COURTYARD" },
    price: "From IDR 1.350K / night",
    terms: "Breakfast included · 2 guests · Ground-floor access",
    bookingLabel: "STAY IN THE COURTYARD STUDIO",
    cardDescription: "A compact, cool studio wrapped around its own walled garden.",
    inclusions: baseInclusions("KING BED", ["COURTYARD", "Private walled garden"]),
  },
];

/* -------------------------------- amenities ------------------------------- */

export interface Amenity {
  icon: LucideIcon;
  label: string;
  copy: string;
}

export const AMENITIES_ROW_1: Amenity[] = [
  { icon: Waves, label: "POOL", copy: "Garden pool with valley views" },
  { icon: Utensils, label: "BREAKFAST", copy: "Daily breakfast at the long table" },
  { icon: Wifi, label: "WI-FI", copy: "Wi-Fi around the property" },
  { icon: Snowflake, label: "COOL ROOMS", copy: "Fans and air-conditioning" },
];

export const AMENITIES_ROW_2: Amenity[] = [
  { icon: Car, label: "TRANSFERS", copy: "Airport and Ubud transfers on request" },
  { icon: Bike, label: "LOCAL RIDES", copy: "Scooters and bicycles arranged" },
  { icon: Sparkles, label: "HOUSEKEEPING", copy: "Daily room refresh" },
  { icon: MessageCircle, label: "LOCAL HOST", copy: "Ask your host for local suggestions" },
];

export const RHYTHM: { time: string; event: string }[] = [
  { time: "07:00", event: "COFFEE & MOUNTAIN LIGHT" },
  { time: "08:30", event: "BREAKFAST IN THE GARDEN" },
  { time: "12:00", event: "SWIM OR VILLAGE WALK" },
  { time: "16:30", event: "TEA ON THE TERRACE" },
  { time: "19:00", event: "SUPPER, WHEN SERVED" },
];

export const PRACTICAL: { label: string; value: string }[] = [
  { label: "CHECK-IN", value: "From 2:00 PM" },
  { label: "CHECK-OUT", value: "By 11:00 AM" },
  { label: "CHILDREN", value: "Ask us first" },
  { label: "PETS", value: "Ask us first" },
];

/* --------------------------------- dining --------------------------------- */

export const SEASONAL: { label: string; copy: string }[] = [
  { label: "GARDEN", copy: "Young coconut, herbs, banana blossom" },
  { label: "FIELDS", copy: "Heritage rice, cassava, corn" },
  { label: "MARKET", copy: "Tropical fruit, tempeh, mountain greens" },
  { label: "PANTRY", copy: "Cacao, coffee, palm sugar" },
];

/* ------------------------------- experiences ------------------------------ */

export type ExperienceSlug =
  | "rice-field-walk"
  | "river-stones-waterfalls"
  | "sunrise-on-the-ridge"
  | "hands-at-work";

export interface ExperienceFact {
  readonly label: string;
  readonly value: string;
}

export interface Experience {
  readonly slug: ExperienceSlug;
  readonly index: "01 / FIELD" | "02 / RIVER" | "03 / MOUNTAIN" | "04 / CRAFT";
  readonly title: string;
  readonly heroTitle: string[];
  readonly img: string;
  readonly imageAlt: string;
  readonly imageCaption: string;
  readonly tagline: string;
  readonly overviewLabel: string;
  readonly overviewTitle: string[];
  readonly overviewBody: string;
  readonly facts: readonly ExperienceFact[];
  readonly hostConfirmation: string;
  readonly enquiryLabel: string;
  readonly seoDescription: string;
}

export const EXPERIENCES: readonly Experience[] = [
  {
    slug: "rice-field-walk",
    index: "01 / FIELD",
    title: "Rice-field walk",
    heroTitle: ["Across the living", "rice fields."],
    img: "https://images.unsplash.com/photo-1754244431279-9cf4c7466405?q=85&w=2400&auto=format&fit=crop",
    imageAlt: "A path through the living rice fields around Sidemen",
    imageCaption: "01 / ACROSS THE LIVING RICE FIELDS",
    tagline: "Ask about a rice-field walk through the Sidemen landscape.",
    overviewLabel: "RICE-FIELD WALK",
    overviewTitle: ["Across the living", "rice fields."],
    overviewBody:
      "Ask about a rice-field walk through the Sidemen landscape. A host can confirm the route, timing and availability by message.",
    facts: [
      { label: "LANDSCAPE", value: "RICE FIELDS" },
      { label: "DETAILS", value: "CONFIRM BY MESSAGE" },
    ],
    hostConfirmation: "A host can confirm the route, timing and availability by message.",
    enquiryLabel: "ENQUIRE ABOUT THE RICE-FIELD WALK",
    seoDescription:
      "Ask about a rice-field walk through the Sidemen landscape and confirm the route, timing and availability by message with a Sukha Homestay host.",
  },
  {
    slug: "river-stones-waterfalls",
    index: "02 / RIVER",
    title: "River stones & waterfalls",
    heroTitle: ["River stones", "& waterfalls."],
    img: "https://images.unsplash.com/photo-1765988298864-9f2d6fe2af10?q=85&w=2400&auto=format&fit=crop",
    imageAlt: "River stones and flowing water in the Sidemen landscape",
    imageCaption: "02 / RIVER STONES & WATERFALLS",
    tagline: "Ask about river places and waterfalls around Sidemen.",
    overviewLabel: "RIVER PLACES",
    overviewTitle: ["River stones", "& waterfalls."],
    overviewBody:
      "Ask about river places and waterfalls around Sidemen. Share what you have in mind, and a host can confirm arrangements by message.",
    facts: [
      { label: "LANDSCAPE", value: "RIVER PLACES" },
      { label: "DETAILS", value: "CONFIRM BY MESSAGE" },
    ],
    hostConfirmation: "A host can confirm arrangements by message.",
    enquiryLabel: "ENQUIRE ABOUT RIVER STONES & WATERFALLS",
    seoDescription:
      "Ask about river places and waterfalls around Sidemen and confirm arrangements by message with a Sukha Homestay host.",
  },
  {
    slug: "sunrise-on-the-ridge",
    index: "03 / MOUNTAIN",
    title: "Sunrise on the ridge",
    heroTitle: ["Sunrise on", "the ridge."],
    img: "https://images.unsplash.com/photo-1761566538266-4a8c7bb60844?q=85&w=2400&auto=format&fit=crop",
    imageAlt: "Mountain light rising over the landscape near Sidemen",
    imageCaption: "03 / SUNRISE ON THE RIDGE",
    tagline: "Ask about mountain light and the ridge around Sidemen.",
    overviewLabel: "MOUNTAIN LIGHT",
    overviewTitle: ["Sunrise on", "the ridge."],
    overviewBody:
      "Ask about mountain light and the ridge around Sidemen. A host can confirm what you have in mind by message.",
    facts: [
      { label: "LANDSCAPE", value: "MOUNTAIN LIGHT" },
      { label: "DETAILS", value: "CONFIRM BY MESSAGE" },
    ],
    hostConfirmation: "A host can confirm what you have in mind by message.",
    enquiryLabel: "ENQUIRE ABOUT SUNRISE ON THE RIDGE",
    seoDescription:
      "Ask about mountain light and the ridge around Sidemen, with arrangements confirmed by message with a Sukha Homestay host.",
  },
  {
    slug: "hands-at-work",
    index: "04 / CRAFT",
    title: "Hands at work",
    heroTitle: ["Hands at", "work."],
    img: "https://images.unsplash.com/photo-1767032485205-3eb089e5dc33?q=85&w=2400&auto=format&fit=crop",
    imageAlt: "Hands working with materials in a craft setting",
    imageCaption: "04 / HANDS AT WORK",
    tagline: "Ask about craft visits around Sidemen.",
    overviewLabel: "CRAFT VISITS",
    overviewTitle: ["Hands at", "work."],
    overviewBody:
      "Ask about craft visits around Sidemen. Share what you would like to discuss, and a host can confirm the details by message.",
    facts: [
      { label: "ACTIVITY", value: "CRAFT VISITS" },
      { label: "DETAILS", value: "CONFIRM BY MESSAGE" },
    ],
    hostConfirmation: "A host can confirm the details by message.",
    enquiryLabel: "ENQUIRE ABOUT HANDS AT WORK",
    seoDescription:
      "Ask about craft visits around Sidemen and confirm the details by message with a Sukha Homestay host.",
  },
];

export function getExperienceBySlug(slug: string | undefined): Experience | undefined {
  const normalizedSlug = slug?.trim().replace(/\/+$/, "").toLowerCase();
  return EXPERIENCES.find((experience) => experience.slug === normalizedSlug);
}

/* --------------------------------- booking -------------------------------- */

export const BOOKING_STEPS = [
  "Share your preferred dates and room",
  "Continue in WhatsApp",
  "Confirm availability with your host",
];

export const ASSURANCES = [
  { icon: Car, heading: "PRIVATE TRANSFERS", copy: "Airport and Ubud transfers can be arranged on request." },
  { icon: Coffee, heading: "BREAKFAST INCLUDED", copy: "A Balinese breakfast is served each morning." },
  { icon: MessageCircle, heading: "PERSONAL HOSTING", copy: "A host can help with questions during your stay." },
];
