# design/source

Original artwork the site's shipped assets are derived from. Nothing here is
served — Vite only copies `public/`, so these are versioned for provenance and
so the assets can be regenerated at different sizes later.

| file | used for | derived assets |
|---|---|---|
| `favicon-pink-512.png` | site-wide favicon (current) | `public/favicon.ico`, `favicon-32.png`, `favicon-180.png`, `favicon-512.png` |
| `favicon-purple-512-superseded.png` | first favicon, replaced same day | — |
| `avatar-tb-1172.png` | Coming Soon avatar, idle frame | `public/avatar-tb.png` (168px) |
| `avatar-hi-tb-1172.png` | Coming Soon avatar, hover/waving frame | `public/avatar-hi-tb.png` (168px) |

The waving frame was REPLACED on 2026-07-25: the previous artwork's skin was
`rgb(252,190,125)` against the idle frame's `rgb(253,198,138)`, so the face
changed tone as the frames crossfaded. The current pair matches exactly. The
superseded art is not kept here — it is in git history, and a frame with the
wrong palette is not worth shipping in the repo as provenance.

Frames must stay REGISTERED: same canvas size, and the body, hood, belt and
feet on the same pixels, so only the pose changes when they swap. The CSS
deliberately applies no transform to them, so any misalignment left in the
artwork is visible directly. Current pair agrees to within 1-2px at 168 (under
0.7px at the 56px render), which reads as static.

## Regenerating

Favicons — nearest-neighbour keeps the pixel-art blocks hard-edged, and 512→32
is an exact 16:1 reduction:

```python
from PIL import Image
src = Image.open('design/source/favicon-pink-512.png').convert('RGBA')
src.resize((32,32), Image.NEAREST).save('public/favicon-32.png')
src.resize((180,180), Image.NEAREST).save('public/favicon-180.png')
src.save('public/favicon-512.png')
src.resize((48,48), Image.NEAREST).save('public/favicon.ico', sizes=[(16,16),(32,32),(48,48)])
```

Avatars — these have no clean native pixel grid (exported at a non-integer
scale), so there is no small original to recover. They ship at 168px, which is
3x the 56px render size, downscaled with LANCZOS:

```python
from PIL import Image
Image.open('design/source/avatar-tb-1172.png').convert('RGBA') \
     .resize((168,168), Image.LANCZOS).save('public/avatar-tb.png', optimize=True)
```
