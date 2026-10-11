# Image performance report

Optimized 25 source assets from 57.36 MB to 7.47 MB (87% smaller), plus four optional 800-pixel hero plate sources. These are summed source-file sizes, not a measured page transfer; shared identical assets are deduplicated by Vite. All original files are retained.

## Assets

Sizes below use decimal KB. High-quality WebP (quality 92) retains full photographic resolution. Only small decorative onion/leaves/chilli layers are reduced to 768 × 512, preserving their canvas and aspect ratio. The logo is a lossless 280 × 280 WebP, sufficient for its existing 80px maximum display at over 3× density. Alpha channels were verified against their corresponding originals/resized sources.

| Original asset under `src/assets` | Original KB | WebP KB |
| --- | ---: | ---: |
| `about-animation/bottom-red-paper.png` | 1289.1 | 221.7 |
| `about-animation/briyani-plate.png` | 2501.4 | 581.7 |
| `about-animation/chilli.png` | 1985.9 | 100.4 |
| `about-animation/leaves.png` | 2635.4 | 207.3 |
| `about-animation/onion.png` | 2399.5 | 113.2 |
| `about-animation/top-red-paper.png` | 958.5 | 183.5 |
| `about-briyani.png` | 521.9 | 79.1 |
| `about-firewood.png` | 541.4 | 82.3 |
| `hero-motion/chicken-briyani.png` | 2501.4 | 581.7 |
| `hero-motion/chicken65-briyani.png` | 2416.2 | 545.9 |
| `hero-motion/chicken65.png` | 2453.0 | 564.6 |
| `hero-motion/leaves.png` | 2635.4 | 207.3 |
| `hero-motion/mutton-briyani.png` | 2417.7 | 547.4 |
| `hero-motion/onion.png` | 2399.5 | 113.2 |
| `images/about-banner-briyani.png` | 2499.5 | 339.8 |
| `images/db log.png` | 6147.4 | 82.2 |
| `images/Dhanush Briyani shop.png` | 2655.7 | 435.9 |
| `images/dhanush-founder.png` | 2391.6 | 285.0 |
| `images/dhanush-hero.png` | 1903.7 | 231.0 |
| `images/hero-dark-background.png` | 1963.7 | 179.6 |
| `images/why-catering.png` | 2313.1 | 337.4 |
| `images/why-firewood.png` | 2332.1 | 333.0 |
| `images/why-fresh-prep.png` | 2379.7 | 323.2 |
| `images/why-ingredients.png` | 2846.1 | 488.8 |
| `images/why-natural-cooking.png` | 2267.9 | 300.4 |

| Responsive hero source | KB |
| --- | ---: |
| `chicken-briyani-800.webp` | 251.6 |
| `chicken65-800.webp` | 247.0 |
| `chicken65-briyani-800.webp` | 248.6 |
| `mutton-briyani-800.webp` | 240.3 |

The 15–29 KB wedding, birthday and corporate images remain unchanged. The 160 KB engagement JPEG remains unchanged because a high-quality WebP was larger. The 379 KB review QR is intentionally untouched, with its built file verified byte-for-byte identical. No QR resampling or recompression was performed.

Unused large originals remain in the repository: the poster (1.97 MB), spice bowls (1.73/2.04 MB) and hero-motion chilli (1.99 MB). They are not requested by active routes. `public` contains only small SVG assets.

## Loading

- Initial Home: preload the first mutton plate with high priority, using the same `srcSet`/`sizes` as its image and decode gate; preload the exact CSS background with high priority. Preload the small branding logo at normal priority.
- All visible Home composition images are eager with async decoding. The first main plate explicitly has high fetch priority. Other plates remain available for the existing entrance gate, selectors and autoplay; animation timing and logic are preserved.
- The same responsive plate source selection is used for preload, thumbnails, full plates and the existing image decoder to avoid mismatched duplicate downloads. Browser network verification remains outstanding.
- Initial About/Catering/Contact: preload their own shared banner and logo, without requesting Home hero imagery. Home does not preload any inner-page banner, founder or shop images. Static image imports supply URLs; they do not fetch other routes' image bytes.
- Home About artwork, service previews, Why Dhanush photos, founder, lower About firewood photo, catering cards, review QR and footer logo are lazy with async decoding. The About shop photo is eager because it can appear below the banner in a tall desktop viewport. Unmounted legacy gallery/story/signature components also have lazy/async attributes.
- Existing fixed dimensions/aspect ratios in CSS continue to reserve image space. Navbar logo intrinsic dimensions were added without changing its CSS dimensions. All cropping, positioning, layout, typography and animation CSS is preserved; CSS edits only substitute image URLs.
- Vite emits hashed assets as before. No routing, custom cache code, hosting configuration, quotation or WhatsApp logic changed. Vite/Vercel's standard asset handling remains in place; deployed response headers were not tested. See [Vite asset handling](https://vite.dev/guide/assets.html).

## Files changed by this task

- Added `src/imagePreloads.js` and `src/heroImageSources.js`; imported preloads in `src/main.jsx`.
- Image references/loading attributes in components: `AboutIntro.jsx`, `Footer.jsx`, `FounderSection.jsx`, `Gallery.jsx`, `Hero.jsx`, `InnerPageHero.jsx`, `Navbar.jsx`, `OurStory.jsx`, `ServicesPreview.jsx`, `SignatureBriyani.jsx`, `Testimonials.jsx`, `WhyChooseDhanush.jsx`.
- Image references/loading attributes in `src/pages/About.jsx`, `src/pages/Services.jsx`, and `src/data/services.js`.
- Image URLs only in `src/components/Hero.css` and `src/index.css`.
- 29 WebP files under `src/assets`, and this report. Existing user edits were preserved, including the already-modified founder original and quotation files.
- Temporary audit scripts/results remain in `.image-audit/`; permission to remove that directory was declined. They are not part of the production build.

## Validation

- `npm.cmd run build`: passed (Vite 8.3.0, 90 modules).
- Server-rendered all four routes: Home 25 image elements (16 lazy, 9 eager), About 6 (4 lazy, 2 eager), Catering 8 (7 lazy, 1 eager), Contact 3 (2 lazy, 1 eager). Every image source exists, and every image uses async decoding.
- Verified main Home plate eager/high priority and responsive attributes, all four initial-route preload selections, and 38 production asset references resolving to existing files.
- All 31 production image URLs returned HTTP 200 with image MIME types from the local production preview.
- All generated WebPs decode successfully; alpha channels are preserved. Built QR bytes match the original (SHA-256 `04241259d2ce5601f0f4174666492bdb34ebc32bf55b7e7cd01a5b1b0e55bbfc`).
- Browser validation could not run: sandbox Chrome did not start, and permission to run it outside the sandbox was declined. Mobile/desktop screenshots, actual request deduplication/priorities, browser console errors, live animations, visual quality comparison and physical QR scanning are therefore **not verified**. No measured LCP/speed score is claimed.
- Changes are local; no deployment was performed.
