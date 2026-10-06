import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// When previewing on GitHub Pages subfolder (https://schmidb.github.io/turtle-transformation-website-2.0/),
// base must be set to '/turtle-transformation-website-2.0'.
// Once custom domain DNS for turtletrafo.com is switched, set USE_CUSTOM_DOMAIN=true to deploy at root '/'.
const isCustomDomain = process.env.USE_CUSTOM_DOMAIN === 'true';

export default defineConfig({
  site: isCustomDomain ? 'https://turtletrafo.com' : 'https://schmidb.github.io',
  base: isCustomDomain ? '/' : '/turtle-transformation-website-2.0',
  integrations: [tailwind()],
});
