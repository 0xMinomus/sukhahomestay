# Image provenance manifest

## Scope

This manifest records the image sources used by the current Sukha Homestay site. It covers **the remote images the current site loads over the network**, and it explicitly records the separate, unresolved status of the locally bundled image assets.

Sources inspected for this record:

- `src/data/content.ts` — the `img` map and the `EXPERIENCES` registry, the only place remote image URLs are declared.
- `vercel.json` — `img-src` permits `https://images.unsplash.com` and `https://images.pexels.com`, which is consistent with the URL list below.

Review date for the entries below: **2026-09-26**.

## Remote images

Provider, source page, photographer, and source-stated location below come from the image researchers' verified source-page metadata. `Unknown` means the source page did not state a place; no location is inferred.

| Slot | Direct URL | Provider | Source page | Photographer | Source-stated location | Review date |
| --- | --- | --- | --- | --- | --- | --- |
| `img.roomCanopyDetail` | `https://images.unsplash.com/photo-1691819989762-93910fc9a3f8?q=80&w=2400&auto=format&fit=crop` | Unsplash | https://unsplash.com/photos/a-wicker-chair-sitting-on-top-of-a-cement-floor-1ZiBSwM1iwQ | Fito García | Tulum, Mexico | 2026-09-26 |
| `img.roomCanopyHero` | `https://images.pexels.com/photos/16436918/pexels-photo-16436918.jpeg?auto=compress&cs=tinysrgb&w=2000` | Pexels | https://www.pexels.com/photo/room-with-the-view-of-palm-trees-in-a-tropical-resort-16436918/ | Luis Zambrano | Unknown | 2026-09-26 |
| `img.roomCanopyMain` | `https://images.unsplash.com/photo-1727079586096-5278670ab910?q=80&w=1400&h=1050&fit=crop&crop=entropy&auto=format` | Unsplash | https://unsplash.com/photos/a-bedroom-with-a-view-of-the-forest-m0eShioKzr8 | Polina Kuzovkova | Bali, Indonesia | 2026-09-26 |
| `img.roomCourtyardDetail` | `https://images.pexels.com/photos/10147668/pexels-photo-10147668.jpeg?auto=compress&cs=tinysrgb&w=2000` | Pexels | https://www.pexels.com/photo/growing-indoor-plants-near-the-glass-windows-10147668/ | bryantj | Unknown (its source page states no location; the other two frames of this shoot state Bali, and that is not inferred here) | 2026-09-26 |
| `img.roomCourtyardHero` | `https://images.pexels.com/photos/10147722/pexels-photo-10147722.jpeg?auto=compress&cs=tinysrgb&w=2000` | Pexels | https://www.pexels.com/photo/green-plants-near-the-glass-window-10147722/ | bryantj | Bali, Indonesia | 2026-09-26 |
| `img.roomCourtyardMain` | `https://images.pexels.com/photos/10147669/pexels-photo-10147669.jpeg?auto=compress&cs=tinysrgb&w=2000` | Pexels | https://www.pexels.com/photo/decor-in-restaurant-10147669/ | bryantj | Bali, Indonesia | 2026-09-26 |
| `img.roomGardenDetail` | `https://images.pexels.com/photos/6430734/pexels-photo-6430734.jpeg?auto=compress&cs=tinysrgb&w=2000` | Pexels | https://www.pexels.com/photo/backyard-of-modern-residential-villa-with-comfy-wicker-furniture-and-tropical-plants-6430734/ | Skylar Kang | Unknown | 2026-09-26 |
| `img.roomGardenHero` | `https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2400&auto=format&fit=crop` | Unsplash | https://unsplash.com/photos/white-bed-linen-with-brown-wooden-bed-frame-67-sOi7mVIk | Sasha Kaunas | Thailand | 2026-09-26 |
| `img.roomGardenMain` | `https://images.unsplash.com/photo-1705304367351-f224686fd620?q=80&w=2400&auto=format&fit=crop` | Unsplash | https://unsplash.com/photos/an-open-door-leading-to-a-bedroom-with-a-view-of-trees-CVqTb0N9Bxk | Khanh Do | Unknown | 2026-09-26 |
| `img.stayTerrace` | `https://images.unsplash.com/photo-1761521276482-6ab894af9914?q=80&w=2400&auto=format&fit=crop` | Unsplash | https://unsplash.com/photos/bamboo-pavilion-with-tables-and-chairs-in-lush-garden-9gFRyqtArCk | Nicole Arango Lang | Indonesia | 2026-09-26 |
| `EXPERIENCES["rice-field-walk"].img` | `https://images.unsplash.com/photo-1646928998297-5fb2a10aca27?q=80&w=2400&auto=format&fit=crop` | Unsplash | https://unsplash.com/photos/an-aerial-view-of-a-lush-green-rice-field-pp_PQJj8iWE | Geio Tischler | Sidemen, Bali, Indonesia | 2026-09-26 |

Provider terms: [Unsplash License](https://unsplash.com/license) and [Pexels License](https://www.pexels.com/license/). Attribution is recommended even where not strictly required.

## Local bundled assets

The following images are bundled under `src/assets/img/` and imported by `src/data/content.ts`. Their **original source and licence cannot be recovered from repository metadata**: there are no source URLs, EXIF blocks, licence files, or author records in the tree, and the repository's only image-source record prior to this manifest was the URL list above.

| File | Slot | Status |
| --- | --- | --- |
| `amenities-hero.webp` | `img.amenitiesHero` | Source/licence unknown — owner verification required |
| `amenities-poolside.jpg` | `img.amenitiesPoolside` | Source/licence unknown — owner verification required |
| `booking-garden.jpg` | `img.bookingGarden` | Source/licence unknown — owner verification required |
| `dining-breakfast.jpg` | `img.diningBreakfast` | Source/licence unknown — owner verification required |
| `dining-hero.webp` | `img.diningHero` | Source/licence unknown — owner verification required |
| `dining-longtable.jpg` | `img.diningLongtable` | Source/licence unknown — owner verification required |
| `experiences-craft.jpg` | `EXPERIENCES["hands-at-work"].img` | Source/licence unknown — owner verification required |
| `experiences-hero.webp` | `img.experiencesHero` | Source/licence unknown — owner verification required |
| `experiences-mountain.jpg` | `EXPERIENCES["sunrise-on-the-ridge"].img` | Source/licence unknown — owner verification required |
| `experiences-river.jpg` | `EXPERIENCES["river-stones-waterfalls"].img` | Source/licence unknown — owner verification required |
| `landing-hero.webp` | `img.landingHero` | Source/licence unknown — owner verification required |
| `landing-mountain.jpg` | `img.landingMountain` | Source/licence unknown — owner verification required |
| `landing-table.jpg` | `img.landingTable` | Source/licence unknown — owner verification required |
| `landing-village.jpg` | `img.landingVillage` | Source/licence unknown — owner verification required |
| `landing-water.jpg` | `img.landingWater` | Source/licence unknown — owner verification required |
| `stay-hero.webp` | `img.stayHero` | Source/licence unknown — owner verification required |
| `stay-ritual.jpg` | `img.stayRitual` | Source/licence unknown — owner verification required |

These files are **not** attributed here to Unsplash, Pexels, any other stock provider, a commissioned photographer, or an AI generator. Their provenance is genuinely unknown, and no such claim should be added without the owner's evidence. **Owner verification is required before publication**: for each file the owner must identify where it came from and under what licence it may be displayed, and this manifest should then be updated with that information.

## Retired assets

The following files were present in the repository but are no longer imported by any current source file and have been removed from `src/assets/img/` as retired assets with no usable provenance record:

- `room-courtyard-detail.jpg`
- `room-courtyard-hero.webp`
- `room-courtyard-main.jpg`
- `room-canopy-detail.jpg`
- `room-canopy-hero.webp`
- `room-canopy-main.jpg`
- `room-garden-detail.jpg`
- `room-garden-hero.webp`
- `room-garden-main.jpg`
- `stay-terrace.jpg`
- `experiences-rice-terrace.jpg`
- `landing-garden-suite.jpg`

Their slots are now served by the remote images listed above. Nothing about how these files were produced is recorded here: the repository holds no source URL, EXIF data, licence file, or author record for them, so no claim is made that they were AI-generated, stock, commissioned, or owner-shot. They are simply retired and unverified.

## What this manifest is and is not

- This is a **documentation record**. Listing an image here records where the bytes come from; it is not a licence grant, not a verification that a licence permits this use, and not a substitute for the provider's own terms.
- Nothing in this file is evidence that a photograph depicts the actual Sukha Homestay property, its rooms, its staff, or Sidemen itself. Remote stock imagery and the unverified local files are presentation assets, and any impression that they are documentary photographs of the property would be unsupported.
- The review date is the date the URLs were read out of `src/data/content.ts` for this record. It is not a re-verification of provider availability or licence status.
