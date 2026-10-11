import { createServer } from 'vite';
import { renderToStaticMarkup } from 'react-dom/server';
import { createElement } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { readFileSync, existsSync, readdirSync, writeFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
try {
  const { default: App } = await server.ssrLoadModule('/src/App.jsx');
  const results = [];
  for (const route of ['/', '/about', '/services', '/contact']) {
    const html = renderToStaticMarkup(createElement(MemoryRouter, { initialEntries: [route] }, createElement(App)));
    const images = [...html.matchAll(/<img\b[^>]*>/g)].map(([tag]) => {
      const attrs = Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map(([, key, value]) => [key, value]));
      assert(existsSync('.' + decodeURIComponent(attrs.src.replaceAll('&amp;', '&'))), `Missing source: ${attrs.src}`);
      assert.equal(attrs.decoding, 'async', tag);
      return attrs;
    });
    assert(images.length > 0);
    assert.equal(images[0].loading, 'eager');
    if (route === '/') {
      const hero = images.find(img => img.class === 'home-food-plate-image');
      assert.equal(hero.loading, 'eager');
      assert.equal(hero.fetchPriority, 'high');
      assert(hero.srcSet.includes('800.webp 800w'));
      assert(images.filter(img => img.loading === 'lazy').length >= 15);
      assert(!html.includes('Dhanush%20Briyani%20shop'));
      assert(!html.includes('about-banner-briyani'));
      assert(!html.includes('dhanush-founder'));
    } else {
      assert(!html.includes('hero-dark-background'));
      assert(!html.includes('mutton-briyani'));
      assert(html.includes('about-banner-briyani'));
    }
    results.push({ route, images: images.length, lazy: images.filter(img => img.loading === 'lazy').length, eager: images.filter(img => img.loading === 'eager').length });
    writeFileSync(`.image-audit/render-${route.replaceAll('/', '') || 'home'}.html`, html);
  }
  // Exercise the initial-route preload module independently for each document.
  const code = readFileSync('src/imagePreloads.js', 'utf8').replace(/^import .*;\r?\n/gm, '');
  for (const pathname of ['/', '/about', '/services', '/contact']) {
    const links = [];
    const document = { createElement: () => ({}), head: { appendChild: link => links.push(link) } };
    new Function('document', 'window', 'logo', 'background', 'banner', 'firstHeroImage', 'heroImageSources', code)(document, { location: { pathname } }, 'logo', 'background', 'banner', 'plate', () => ({ srcSet: 'small 800w, plate 1321w', sizes: '320px' }));
    assert.deepEqual(links.map(link => link.href), pathname === '/' ? ['plate', 'background', 'logo'] : ['banner', 'logo']);
    assert.equal(links[0].fetchPriority, 'high');
  }
  let checked = 0;
  for (const filename of readdirSync('dist/assets').filter(name => /\.(css|js)$/.test(name))) {
    const code = readFileSync(`dist/assets/${filename}`, 'utf8');
    for (const [, asset] of code.matchAll(/["'`(]\/assets\/([^"'`)]+)["'`)]/g)) {
      assert(existsSync('dist/assets/' + decodeURIComponent(asset)), `Missing build asset: ${asset}`);
      checked++;
    }
  }
  console.log(JSON.stringify({ routes: results, productionAssetReferencesChecked: checked, preloadChecks: 'passed' }, null, 2));
} finally {
  await server.close();
}
