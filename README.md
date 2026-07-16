# Atomic Docs

Documentation site for configuring Atomic, built with [MkDocs Material](https://squidfunk.github.io/mkdocs-material/).

## Run it locally

```bash
# from the docs-site folder
pip install -r requirements.txt
mkdocs serve
```

Then open http://127.0.0.1:8000.

## Build static site

```bash
mkdocs build
```

Output goes to `site/`. Host that folder anywhere (GitHub Pages, Netlify, Vercel, Cloudflare Pages, etc.).

## Structure

```
docs-site/
├─ mkdocs.yml            # site config + theme
├─ requirements.txt
└─ docs/
   ├─ index.md           # home
   ├─ getting-started.md
   ├─ configuration.md   # the important one
   ├─ features/
   │  ├─ combat.md
   │  ├─ character.md
   │  ├─ visuals.md
   │  └─ other.md
   ├─ troubleshooting.md
   └─ stylesheets/extra.css
```
