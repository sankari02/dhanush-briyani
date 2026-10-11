from pathlib import Path
import re

names = ['AboutIntro', 'FounderSection', 'Footer', 'ServicesPreview', 'Testimonials', 'Gallery', 'OurStory', 'SignatureBriyani']
paths = [Path(f'src/components/{name}.jsx') for name in names] + [Path('src/pages/About.jsx'), Path('src/pages/Services.jsx')]
for path in paths:
    text = path.read_text(encoding='utf-8')
    def attrs(match):
        tag = match.group()
        if 'loading=' not in tag:
            tag = tag.replace('<img', '<img loading="lazy"', 1)
        if 'decoding=' not in tag:
            tag = tag.replace('<img', '<img decoding="async"', 1)
        return tag
    text = re.sub(r'<img\b[^>]*?/>', attrs, text, flags=re.S)
    # The shop photo can be visible beneath the banner on a tall desktop.
    if path.name == 'About.jsx':
        text = re.sub(r'(<img[^>]*src=\{shopImage\}[^>]*loading=)"lazy"', r'\1"eager"', text)
    path.write_text(text, encoding='utf-8')
path = Path('src/components/Navbar.jsx')
text = path.read_text(encoding='utf-8').replace('<img className="logo-mark"', '<img loading="eager" decoding="async" width="280" height="280" className="logo-mark"')
path.write_text(text, encoding='utf-8')
