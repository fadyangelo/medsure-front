// @ts-check
// astro.config.mjs
import { defineConfig } from 'astro/config';
import node from '@astrojs/node'; // OR vercel, netlify, etc.
import tailwindcss from '@tailwindcss/vite';

import { envField } from 'astro/config';


// https://astro.build/config
export default defineConfig({
  // 1. THIS IS REQUIRED
  output: 'server', 

  // 2. You need an adapter (like Node.js, Vercel, Netlify)
  adapter: node({
    mode: 'standalone',
  }),
   vite: {
    plugins: [tailwindcss()]
  },
  env: {
    schema: {
      STRAPI_URL: envField.string({
        context: 'server', 
        access: 'secret', 
        default: 'https://medsure1.itspark-eg.com' 
      }),
      // Use this if you need it in the browser:
      PUBLIC_STRAPI_URL: envField.string({
        context: 'client',
        access: 'public',
        optional: true
      }),
	  
    }
  }
});