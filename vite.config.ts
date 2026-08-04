import { existsSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vite';

const SEO_ROUTE_PAGES = [
  'about-doctor',
  'book-appointment',
  'clinic-info',
  'consult-now',
  'health-tips',
  'services',
];

/**
 * The SEO route pages live in public/ so they can provide crawlable HTML.
 * Vite copies public files verbatim, so their development-only /src/main.tsx
 * script would otherwise fail in production. Inject the built app assets into
 * those pages after Vite has written the output.
 */
function hydrateSeoRoutePages(): Plugin {
  return {
    name: 'hydrate-seo-route-pages',
    apply: 'build',
    writeBundle(options, bundle) {
      const entryChunk = Object.values(bundle).find(
        (asset) => asset.type === 'chunk' && asset.isEntry,
      );
      const cssAsset = Object.values(bundle).find(
        (asset) => asset.type === 'asset' && asset.fileName.endsWith('.css'),
      );

      if (!entryChunk || !cssAsset) {
        throw new Error('Could not find the production app entry or stylesheet.');
      }

      const outDir = options.dir ?? path.resolve(__dirname, 'dist');
      const appScript = `<script type="module" src="/${entryChunk.fileName}"></script>`;
      const appStyles = `<link rel="stylesheet" crossorigin href="/${cssAsset.fileName}">`;

      for (const route of SEO_ROUTE_PAGES) {
        const pagePath = path.join(outDir, route, 'index.html');
        if (!existsSync(pagePath)) continue;

        const html = readFileSync(pagePath, 'utf8');
        const hydratedHtml = html
          .replace(
            '<script type="module" src="/src/main.tsx"></script>',
            appScript,
          )
          .replace('</head>', `    ${appStyles}\n  </head>`);

        writeFileSync(pagePath, hydratedHtml);
      }
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), hydrateSeoRoutePages()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
