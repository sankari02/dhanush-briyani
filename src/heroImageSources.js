import mutton from './assets/hero-motion/mutton-briyani.webp';
import muttonSmall from './assets/hero-motion/mutton-briyani-800.webp';
import chicken from './assets/hero-motion/chicken-briyani.webp';
import chickenSmall from './assets/hero-motion/chicken-briyani-800.webp';
import chicken65Briyani from './assets/hero-motion/chicken65-briyani.webp';
import chicken65BriyaniSmall from './assets/hero-motion/chicken65-briyani-800.webp';
import chicken65 from './assets/hero-motion/chicken65.webp';
import chicken65Small from './assets/hero-motion/chicken65-800.webp';

const sources = new Map([
  [mutton, [muttonSmall, 1321]],
  [chicken, [chickenSmall, 1321]],
  [chicken65Briyani, [chicken65BriyaniSmall, 1322]],
  [chicken65, [chicken65Small, 1322]],
]);

export const firstHeroImage = mutton;

// Share the plate-sized source with thumbnails and the decode gate so they
// reuse one request, including on high-density mobile screens.
export function heroImageSources(src) {
  const source = sources.get(src);
  if (!source) return {};
  return {
    srcSet: `${source[0]} 800w, ${src} ${source[1]}w`,
    sizes: '(max-width: 767px) 320px, 500px',
  };
}
