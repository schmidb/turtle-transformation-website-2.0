import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
// Production runs on the custom domain https://turtletrafo.com and MUST be built with USE_CUSTOM_DOMAIN=true (site root '/').
// Without the flag the build targets the github.io preview sub-path '/turtle-transformation-website-2.0' (local dev only).
// The GitHub repo variable USE_CUSTOM_DOMAIN must stay 'true'. See README.md and docs/infrastructure.md.
const isCustomDomain = process.env.USE_CUSTOM_DOMAIN === 'true';
export default defineConfig({
  site: isCustomDomain ? 'https://turtletrafo.com' : 'https://schmidb.github.io',
  base: isCustomDomain ? '/' : '/turtle-transformation-website-2.0',
  integrations: [
    tailwind(),
    sitemap({
      // Keep the 404 page out of the sitemap.
      filter: (page) => !page.includes('/404'),
    }),
  ],
});
