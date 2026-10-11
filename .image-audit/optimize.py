from pathlib import Path
from PIL import Image, ImageChops
import json
import re

root = Path.cwd()
sources = list(Path('src').rglob('*.jsx')) + list(Path('src').rglob('*.css')) + list(Path('src/data').glob('*.js'))
references = '\n'.join(p.read_text(encoding='utf-8') for p in sources)
report = []
for path in Path('src/assets').rglob('*'):
    if path.suffix.lower() not in ('.png', '.jpg', '.jpeg'):
        continue
    original = Image.open(path)
    row = dict(source=path.as_posix(), original=path.stat().st_size, width=original.width, height=original.height)
    if (path.name not in references and path.with_suffix('.webp').name not in references) or 'review-qr' in path.name or path.stat().st_size < 100000:
        row['status'] = 'preserved (unused, already small, or QR code)'
        report.append(row)
        continue
    output = path.with_suffix('.webp')
    image = original.copy()
    if path.name in ('onion.png', 'leaves.png', 'chilli.png'):
        image.thumbnail((768, 512), Image.Resampling.LANCZOS)
        image.save(output, 'WEBP', quality=92, method=4, exact=True)
    elif path.name == 'db log.png':
        image.thumbnail((280, 280), Image.Resampling.LANCZOS)
        image.save(output, 'WEBP', lossless=True, method=6, exact=True)
    elif not output.exists() or output.stat().st_size == 0:
        image.save(output, 'WEBP', quality=92, method=4, exact=True)
    decoded = Image.open(output)
    assert decoded.size == image.size
    if image.mode == 'RGBA':
        assert ImageChops.difference(image.getchannel('A'), decoded.convert('RGBA').getchannel('A')).getbbox() is None
    row.update(optimized=output.stat().st_size, output=output.as_posix(), status='optimized')
    # Full resolution is retained; smaller sources are optional browser choices.
    if path.parent.name == 'hero-motion' and 'briyani' in path.name or path.name == 'chicken65.png':
        mobile = image.resize((800, round(image.height * 800 / image.width)), Image.Resampling.LANCZOS)
        mobile_path = path.with_name(path.stem + '-800.webp')
        mobile.save(mobile_path, 'WEBP', quality=92, method=4, exact=True)
        row.update(mobile=mobile_path.stat().st_size, mobileOutput=mobile_path.as_posix())
    for source in sources:
        text = source.read_text(encoding='utf-8')
        # Match the path tail so identical basenames in other directories stay untouched.
        old = path.relative_to('src').as_posix()
        new = output.relative_to('src').as_posix()
        updated = text.replace(old, new)
        if updated != text:
            with source.open('w', encoding='utf-8', newline='') as stream:
                stream.write(updated)
    report.append(row)
Path('.image-audit/assets.json').write_text(json.dumps(report, indent=2), encoding='utf-8')
for row in report:
    if 'optimized' in row:
        print(row['source'], row['original'], '->', row['optimized'])

