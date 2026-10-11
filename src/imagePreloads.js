import logo from './assets/images/db log.webp';
import background from './assets/images/hero-dark-background.webp';
import banner from './assets/images/about-banner-briyani.webp';
import { firstHeroImage, heroImageSources } from './heroImageSources';

function preloadImage(href, priority, sources = {}) {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = href;
  link.fetchPriority = priority;
  if (sources.srcSet) {
    link.imageSrcset = sources.srcSet;
    link.imageSizes = sources.sizes;
  }
  document.head.appendChild(link);
}

// Run before React mounts, and only request imagery for the initial route.
const pathname = window.location.pathname.replace(/\/+$/, '') || '/';
if (pathname === '/') {
  preloadImage(firstHeroImage, 'high', heroImageSources(firstHeroImage));
  preloadImage(background, 'high');
} else if (['/about', '/services', '/contact'].includes(pathname.toLowerCase())) {
  preloadImage(banner, 'high');
}
preloadImage(logo, 'auto');
