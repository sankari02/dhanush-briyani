import { readdirSync } from 'node:fs';
import assert from 'node:assert/strict';
const files = readdirSync('dist/assets').filter(name => /\.(webp|png|jpe?g)$/.test(name));
for (const name of files) {
  const response = await fetch('http://127.0.0.1:4173/assets/' + encodeURIComponent(name));
  assert.equal(response.status, 200, name);
  assert(response.headers.get('content-type').startsWith('image/'), name);
  await response.arrayBuffer();
}
console.log(`${files.length} production image URLs returned HTTP 200 with image MIME types.`);
