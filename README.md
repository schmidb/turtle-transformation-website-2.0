# Turtle Transformation website

Marketing site for Turtle Transformation Limited, live at **https://turtletrafo.com**.
Built with [Astro](https://astro.build) and Tailwind CSS, deployed as a static site to GitHub Pages.

## Quick start

Requires Node.js 22 (see `.nvmrc`).

```bash
npm ci
npm run dev        # http://localhost:4321/turtle-transformation-website-2.0/
```

| Command | What it does |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the built `dist/` locally |

### The `USE_CUSTOM_DOMAIN` flag

The site is built for two hosting locations, selected by one environment variable:

| `USE_CUSTOM_DOMAIN` | Site URL | Base path | Use |
|---|---|---|---|
| unset / `false` | `https://schmidb.github.io` | `/turtle-transformation-website-2.0` | Local dev, github.io preview |
| `true` | `https://turtletrafo.com` | `/` | **Production** |

Production builds must set it, otherwise assets load from the wrong path:

```bash
# PowerShell
$env:USE_CUSTOM_DOMAIN="true"; npm run build; npm run preview
# bash
USE_CUSTOM_DOMAIN=true npm run build && npm run preview
```

On GitHub it is the repository variable `USE_CUSTOM_DOMAIN` (Settings, Secrets and variables, Actions, Variables). It must stay `true`.
Canonical URLs always point to `https://turtletrafo.com`, regardless of this flag.

## Project layout

```
src/pages/        index (12-month coaching), about, data-ai-consulting (AI & Data Advisory), imprint, privacy, 404
src/components/   Header, Footer, Faq, Analytics (GA4 consent banner), YouTubeTestimonial (click-to-load)
src/layouts/      Layout.astro: meta tags, canonical, Open Graph, JSON-LD
src/utils/        schema.ts (structured data + constants), paths.ts (base-path helper)
public/           static files: robots.txt, llms.txt, og-image.png, images, CNAME
docs/             source material and research (see below)
.kiro/steering/   rules for Kiro / AI assistants working on this repo
```

Sitemap is generated at build time (`/sitemap-index.xml`). Structured data lives in `src/utils/schema.ts`.

## Deployment

Push to `main`. `.github/workflows/deploy.yml` builds with Node 22 and publishes to GitHub Pages.
The custom domain is set in Settings, Pages (`turtletrafo.com`) and in `public/CNAME`.
DNS, redirects and email records are documented in [`docs/infrastructure.md`](docs/infrastructure.md).

## Content sources (`docs/`)

- `12-month-coaching-price`, `12-month-coaching-v1`, `12-month-coaching-v2`: programme description and pricing. **The current programme overview is the source of truth** (EUR 5,400, two installments of EUR 2,700).
- `15-year-leadership-mastery - written by Markus`, `M20-Year Evolution ... Miriam.pdf`: founder stories.
- `existing-website-research.md`: research on the legacy GoHighLevel site (now at `old.turtletrafo.com`).

## Rules for changing content

Brand, compliance and technical rules are in `.kiro/steering/`. Read them before editing copy, pricing, testimonials, analytics or contact details.
