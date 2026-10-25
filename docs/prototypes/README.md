# Prototypes (direction B "Obra")

Approved HTML prototypes for the Home, the category grid and the model page (PROJECT_SPEC D-11).
They are the visual reference for Phase 2: layout, tokens, copy structure and motion. They are not
part of the site build.

| File | What it is |
| --- | --- |
| `home.src.html` | Home, structured like tradermacusa.com |
| `category.src.html` | Category grid (line tabs, sort, All Terrain explainer) |
| `model.src.html` | Model page (gallery, key specs, full spec sheet with filter, related, enquiry) |
| `base.css` / `base.js` | Shared tokens, components and motion (reveal, masked words, hover pan) |
| `build-data.mjs` / `build.py` | Inline repo data and images into self-contained HTML files |

Rebuild the self-contained pages (outputs are gitignored):

```bash
node docs/prototypes/build-data.mjs . docs/prototypes
python3 docs/prototypes/build.py
```

The Home expects the videos in `video/` next to it: copy `public/video/` into `docs/prototypes/video/`
to open `home.html` locally.

Published previews (claude.ai artifacts): Home https://claude.ai/artifact/C3h47DA2ZXzMyyKNye9xXP ·
category https://claude.ai/artifact/6rCQ1YD2T3gBBLXAVXYY9C · model https://claude.ai/artifact/MNhKA4iE5NvM5oi3XpFc5G
