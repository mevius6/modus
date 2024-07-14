import { cwd, env } from 'node:process'
import { resolve } from 'node:path'
// import { log } from 'node:console'
// import { UserConfig } from 'vite'

/**
 * @file Vite {@link https://vitejs.dev/config/ config}
 *
 * @see
 * **Vite Plugins**
 * - [Awesome Vite](https://github.com/vitejs/awesome-vite)
 * - [Vite PWA](https://github.com/vite-pwa/)
 * - [Vite Vue](https://github.com/vitejs/vite-plugin-vue)
 * * * *
 *
 * @todo Study Vue SSR and Express
 * @see
 * **SSR**
 * - [Vite SSR guide](https://vitejs.dev/guide/ssr.html)
 * * * *
 *
 * @see
 * **Base**
 * - [Node](https://nodejs.org/en)
 * - [Nx](https://nx.dev/nx-api/vite)
 * - [SWC](https://swc.rs/)
 * - [Rollup](https://rollupjs.org/)
 * - [esbuild](https://esbuild.github.io)
 *   - [API](https://esbuild.github.io/api/)
 * - [cosmiconfig](https://github.com/cosmiconfig/cosmiconfig)
 * * * *
 *
 * @see
 * **HTML/CSS/SVG processing tools**
 * - [HTML Sanitizer API](https://wicg.github.io/sanitizer-api/)
 * - [DOMPurify](https://github.com/cure53/DOMPurify)
 * - [postcss](https://github.com/postcss/postcss#usage)
 *   - [cssnano](https://github.com/cssnano/cssnano)
 * - [posthtml](https://github.com/posthtml/posthtml)
 *   - [htmlnano](https://github.com/posthtml/htmlnano)
 * - [svgo](https://github.com/svg/svgo)
 * - [lightningcss](https://lightningcss.dev/)
 */
let _overview;

/** @type {import('vite').UserConfig} */
export default {
  // https://vitejs.dev/guide/#index-html-and-project-root
  // https://github.com/vitejs/vite/discussions/9400
  root: cwd(),
  resolve: {
    alias: {
      // https://github.com/rollup/plugins/tree/master/packages/alias
      '~/': `${resolve(__dirname, 'src')}/`,
    },
  },
  server: {
    port: 3030,
    // https: { cert: env.CERT, key: env.KEY, }
  },
  // css: { modules: false }, // omit
  build: {
    target: 'esnext',
    modulePreload: {polyfill: false},
    // outDir: 'dist',
    assetsDir: 'assets',
    assetsInlineLimit: 0,
    // cssCodeSplit: false,
    cssTarget: false,
    cssMinify: false,
    minify: 'esbuild',
    // https://github.com/vitejs/vite/discussions/13421#discussioncomment-6081692
    // rollupOptions: { input: {}, output: {}, },
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        test: resolve(__dirname, 'src/test.html')
      },
      output: {
        dir: 'dist',
        // exports: 'named'
      }
    },
    manifest: true,
  },
  // https://stackoverflow.com/questions/69701743/how-can-i-configure-vites-dev-server-to-give-404-errors
  // https://vitejs.dev/guide/build.html#multi-page-app
  // appType: 'mpa',
}
