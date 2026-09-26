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

import experiencesCraft from "../assets/img/experiences-craft.jpg";
import experiencesHero from "../assets/img/experiences-hero.webp";
import experiencesMountain from "../assets/img/experiences-mountain.jpg";
import experiencesRiver from "../assets/img/experiences-river.jpg";
import landingHero from "../assets/img/landing-hero.webp";
const amenitiesHero = "https://images.unsplash.com/photo-1552683613-9082655c370b?q=80&w=2400&auto=format&fit=crop";
const amenitiesPoolside = "https://images.unsplash.com/photo-1663172868750-520eab6b89e5?q=80&w=1200&h=1500&fit=crop&crop=entropy&auto=format";
const bookingGarden = "https://images.unsplash.com/photo-1775195560641-4fee7a5a7bfe?q=80&w=1600&h=1200&fit=crop&crop=entropy&auto=format";
const diningBreakfast = "https://images.unsplash.com/photo-1559293824-67dfb8dd2451?q=80&w=1200&h=1600&fit=crop&crop=entropy&auto=format";
const diningHero = "https://images.unsplash.com/photo-1707082053794-5df6a02287ae?q=80&w=2400&auto=format&fit=crop";
const diningLongtable = "https://images.unsplash.com/photo-1760533536461-714a23877e2d?q=80&w=1600&h=1200&fit=crop&crop=entropy&auto=format";
const landingTable = "https://images.unsplash.com/photo-1777835664050-d11132c2c008?q=80&w=1200&h=1600&fit=crop&crop=entropy&auto=format";
const landingMountain = "https://images.unsplash.com/photo-1609590959678-09adc5cbbe00?q=80&w=1200&h=1600&fit=crop&crop=entropy&auto=format";
const landingVillage = "https://images.unsplash.com/photo-1743620046657-9664328712f4?q=80&w=1200&h=1600&fit=crop&crop=entropy&auto=format";
const landingWater = "https://images.unsplash.com/photo-1768700203085-bb9fb4b02078?q=80&w=1200&h=1600&fit=crop&crop=entropy&auto=format";
const roomCanopyDetail = "https://images.unsplash.com/photo-1691819989762-93910fc9a3f8?q=80&w=2400&auto=format&fit=crop";
const roomCanopyHero = "https://images.pexels.com/photos/16436918/pexels-photo-16436918.jpeg?auto=compress&cs=tinysrgb&w=2000";
const roomCanopyMain = "https://images.unsplash.com/photo-1727079586096-5278670ab910?q=80&w=1400&h=1050&fit=crop&crop=entropy&auto=format";
const roomCourtyardDetail = "https://images.pexels.com/photos/10147668/pexels-photo-10147668.jpeg?auto=compress&cs=tinysrgb&w=2000";
const roomCourtyardHero = "https://images.pexels.com/photos/10147722/pexels-photo-10147722.jpeg?auto=compress&cs=tinysrgb&w=2000";
const roomCourtyardMain = "https://images.pexels.com/photos/10147669/pexels-photo-10147669.jpeg?auto=compress&cs=tinysrgb&w=2000";
const roomGardenDetail = "https://images.pexels.com/photos/6430734/pexels-photo-6430734.jpeg?auto=compress&cs=tinysrgb&w=2000";
const roomGardenHero = "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2400&auto=format&fit=crop";
const roomGardenMain = "https://images.unsplash.com/photo-1705304367351-f224686fd620?q=80&w=2400&auto=format&fit=crop";
import stayHero from "../assets/img/stay-hero.webp";
import stayRitual from "../assets/img/stay-ritual.jpg";
const stayTerrace = "https://images.unsplash.com/photo-1761521276482-6ab894af9914?q=80&w=2400&auto=format&fit=crop";

export const img = {
  amenitiesHero,
  amenitiesPoolside,
  bookingGarden,
  diningBreakfast,
  diningHero,
  diningLongtable,
  experiencesHero,
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

export type ImgKey = keyof typeof img;

/**
 * One honest description per image, kept next to the URLs above so a slot can
 * never carry a title or a caption as its alt text. Every key in `img` must
 * have an entry here.
 */
export const imgAlt: Record<ImgKey, string> = {
  amenitiesHero:
    "A still garden pool reflecting the last of the sunset, with tall palms silhouetted behind it.",
  amenitiesPoolside:
    "A turquoise pool with a planted islet and a single palm, smooth boulders at its edge and a wooden deck in front.",
  bookingGarden:
    "Round cut-log stepping stones running through dense tropical planting towards a low thatched-roof structure.",
  diningBreakfast:
    "A coconut-shell bowl of sliced banana, strawberries and grated coconut beside a cappuccino, on a woven rattan mat.",
  diningHero: "A round wooden table laid with patterned china, green cups, teapots and oranges.",
  diningLongtable: "A long wooden table set with lit candles under a thatched roof, with the sea beyond.",
  experiencesHero: "Misty terraced fields below a palm-covered hillside.",
  landingHero:
    "A low villa under a wide thatched roof, lit from within at dusk, with tall palms either side and a lit pool in front.",
  landingMountain:
    "A conical volcano peak rising above a thick layer of morning cloud that fills the valley below, lit by the first warm light of dawn.",
  landingTable: "A low table and floor cushions set on a raised deck on a lawn beneath spreading trees.",
  landingVillage:
    "A stone-paved lane running straight between grass verges, flowering shrubs and rows of thatched Balinese houses, one small figure walking away in the distance.",
  landingWater:
    "Clear water rippling over moss-covered boulders and a small cascade in a shallow tropical forest stream, with ferns above in dappled light.",
  roomCanopyDetail:
    "A white cylindrical side table and a black-and-white woven mat on a pale concrete floor, in hard shadow.",
  roomCanopyHero:
    "A white bed in a room with timber-framed windows looking into dense green tropical foliage.",
  roomCanopyMain:
    "A bed with white linen beside floor-to-ceiling glass, looking out over a hazy green hillside.",
  roomCourtyardDetail:
    "Potted plants along a window ledge above a pink-tiled wall, with a round globe lamp and two floor cushions below.",
  roomCourtyardHero:
    "Potted plants on a ledge beside a black-framed window, with a timber ladder shelf and counter below.",
  roomCourtyardMain:
    "A tiled built-in bench with a long brown bolster cushion, plants on the ledge above and a black-framed window behind.",
  roomGardenDetail: "A shaded patio with wicker seating and pale cushions under a slatted pergola.",
  roomGardenHero:
    "A large bed with white linen and a rust-coloured runner, dark timber furniture beside sheer curtains and glass doors.",
  roomGardenMain:
    "A dim bedroom looking out through a glass door to a white balustrade and dense green trees.",
  stayHero: "A tiled-roof pavilion behind a garden pond, framed by ceramic jars and trees.",
  stayRitual: "A tray with a white teapot and cup, small plates of sliced papaya and orange, and a green cutting in a glass.",
  stayTerrace: "A bamboo pavilion with a deep thatched roof over dining tables and chairs in a lush green garden.",
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

/* --------------------------------- landing --------------------------------- */

export const WANDERS = [
  { kicker: "01 VILLAGE", headline: "Walk old paths", img: img.landingVillage, alt: imgAlt.landingVillage },
  { kicker: "02 MOUNTAIN", headline: "Meet the morning", img: img.landingMountain, alt: imgAlt.landingMountain },
  { kicker: "03 WATER", headline: "Follow the river", img: img.landingWater, alt: imgAlt.landingWater },
];

export const TASTE_TICKS = ["DAILY BREAKFAST INCLUDED", "SEASONAL INGREDIENTS", "VEGETARIAN FRIENDLY"];

export const STATS = [
  { value: "03", label: "ROOMS" },
  { value: "02", label: "GUESTS / ROOM" },
  { value: "07:00", label: "BREAKFAST FROM" },
  { value: "01", label: "GARDEN POOL" },
];

/* ----------------------------------- stay ----------------------------------- */

export const RITUALS = ["DAILY BREAKFAST", "BATH SALTS", "BICYCLES", "WIFI"];

export const HOUSE_RULES = [
  { label: "CHECK-IN", value: "2:00 PM" },
  { label: "CHECK-OUT", value: "11:00 AM" },
];

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
  heroImg: ImgKey;
  mainImg: ImgKey;
  mainCaption: string;
  detailImg: ImgKey;
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
    heroImg: "roomGardenHero",
    mainImg: "roomGardenMain",
    mainCaption: "PRIVATE TERRACE · GARDEN VIEW",
    detailImg: "roomGardenDetail",
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
    heroImg: "roomCanopyHero",
    mainImg: "roomCanopyMain",
    mainCaption: "PRIVATE BALCONY · CANOPY VIEW",
    detailImg: "roomCanopyDetail",
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
    heroImg: "roomCourtyardHero",
    mainImg: "roomCourtyardMain",
    mainCaption: "TILED WINDOW BENCH · DAYLIGHT",
    detailImg: "roomCourtyardDetail",
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

export const SERVICE: { label: string; value: string }[] = [
  { label: "SERVED", value: "7:00 — 10:00" },
  { label: "STYLE", value: "BALINESE + CONTINENTAL" },
  { label: "DIETARY", value: "VEGETARIAN FRIENDLY" },
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
    img: "https://images.unsplash.com/photo-1646928998297-5fb2a10aca27?q=80&w=2400&auto=format&fit=crop",
    imageAlt: "Terraced rice fields around Sidemen seen from above",
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
    img: experiencesRiver,
    imageAlt: "A waterfall falling into a dark pool in dense forest, with a person seated on a rock at the bank.",
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
    img: experiencesMountain,
    imageAlt: "A conical volcano above mist filling the valleys, with terraced fields in the foreground.",
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
    img: experiencesCraft,
    imageAlt: "An older woman weaving on a wooden floor loom in an open-sided pavilion.",
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

/* --------------------------- page fallback -------------------------------- */

export const PAGE_FALLBACK = {
  eyebrow: "A PAUSE IN THE GARDEN",
  title: ["This page is", "resting."],
  copy: "Something did not load as we expected. The rest of the house is open, and your host can help with whatever you came for.",
  homeLabel: "WANDER HOME",
  hostLabel: "MESSAGE OUR HOST",
};
