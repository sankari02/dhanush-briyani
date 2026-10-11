from pathlib import Path

rows = []
for path in sorted(Path('src/assets').rglob('*.webp')):
    original = path.with_suffix('.png')
    if original.exists():
        rows.append((original, path))
old = sum(a.stat().st_size for a, b in rows)
new = sum(b.stat().st_size for a, b in rows)
text = f'''# Image performance report

Optimized {len(rows)} source assets from {old / 1e6:.2f} MB to {new / 1e6:.2f} MB (87% smaller), plus four optional 800-pixel hero plate sources. These are summed source-file sizes, not a measured page transfer; shared identical assets are deduplicated by Vite. All original files are retained.

## Assets

Sizes below use decimal KB. High-quality WebP (quality 92) retains full photographic resolution. Only small decorative onion/leaves/chilli layers are reduced to 768 × 512, preserving their canvas and aspect ratio. The logo is a lossless 280 × 280 WebP, sufficient for its existing 80px maximum display at over 3× density. Alpha channels were verified against their corresponding originals/resized sources.

| Original asset under `src/assets` | Original KB | WebP KB |
| --- | ---: | ---: |
'''
for a,b in rows:
    text += f'| `{a.relative_to("src/assets").as_posix()}` | {a.stat().st_size / 1000:.1f} | {b.stat().st_size / 1000:.1f} |\n'
text += '\n| Responsive hero source | KB |\n| --- | ---: |\n'
for path in sorted(Path('src/assets/hero-motion').glob('*-800.webp')):
    text += f'| `{path.name}` | {path.stat().st_size / 1000:.1f} |\n'
text += '''
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

## Validation

- `npm.cmd run build`: passed (Vite 8.3.0, 90 modules).
- Server-rendered all four routes: Home 25 image elements (16 lazy, 9 eager), About 6 (4 lazy, 2 eager), Catering 8 (7 lazy, 1 eager), Contact 3 (2 lazy, 1 eager). Every image source exists, and every image uses async decoding.
- Verified main Home plate eager/high priority and responsive attributes, all four initial-route preload selections, and 38 production asset references resolving to existing files.
- All generated WebPs decode successfully; alpha channels are preserved. Built QR bytes match the original (SHA-256 `04241259d2ce5601f0f4174666492bdb34ebc32bf55b7e7cd01a5b1b0e55bbfc`).
- Browser validation could not run: sandbox Chrome did not start, and permission to run it outside the sandbox was declined. Mobile/desktop screenshots, actual request deduplication/priorities, browser console errors, live animations, visual quality comparison and physical QR scanning are therefore **not verified**. No measured LCP/speed score is claimed.
- Changes are local; no deployment was performed.
'''
Path('IMAGE-PERFORMANCE.md').write_text(text, encoding='utf-8')
