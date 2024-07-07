// import { resolve } from 'node:path'
import { defineConfig } from 'vite'

/**
 * @todo Study…
 *
 * @see
 * - [Awesome Vite](https://github.com/vitejs/awesome-vite)
 * - [Vite MPA](https://vitejs.dev/guide/build.html#multi-page-app)
 * - [Vite PWA](https://vite-pwa-org.netlify.app/)
 * - [Vite SSR](https://vitejs.dev/guide/ssr.html)
 * - [SSR Vue](https://github.com/vitejs/vite-plugin-vue/tree/main/playground/ssr-vue)
 * - [SWC](https://swc.rs/)
 * - [esbuild try](https://esbuild.github.io/try/)
 */
let _overview;

// https://github.com/cosmiconfig/cosmiconfig
// https://vitejs.dev/config/
export default defineConfig({
  root: process.cwd(),
  base: '/',
  html: { // omit
    // https://github.com/posthtml/posthtml
    // https://github.com/posthtml/htmlnano
    // https://github.com/svg/svgo
  },
  css: {
    modules: 'false',
    // https://vitejs.dev/guide/features.html#css
    // transformer: 'postcss'
    postcss: './postcss.config.js',
    // preprocessorOptions: {…},
    // https://vitejs.dev/guide/features.html#lightning-css
    // lightningcss: {…}
  },
  server: {
    port: 3030,
  },
  preview: {
    port: 8080,
  },
  build: {
    base: './',
    target: 'esnext',
    outDir: 'dist',
    assetsDir: 'assets',
    assetsInlineLimit: 0,
    cssCodeSplit: false,
    cssTarget: false,
    // cssMinify: true,
    // https://lightningcss.dev/minification.html
    // cssMinify: 'lightningcss',
    // https://esbuild.github.io/api/
    // minify: 'esbuild',
    // manifest: true,
    // rollupOptions: {
    //   input: '/src/index.html',
    //   output: {
    //     // https://evanw.github.io/source-map-visualization/
    //     // sourcemap: 'hidden',
    //     dir: 'dist',
    //   },
    // },
    // emptyOutDir: true,
    // copyPublicDir: true,
  },
  publicDir: 'public',
  // esbuild: { loader: 'css' }
  experimental: {
    // https://vitejs.dev/guide/build.html#advanced-base-options
    // renderBuiltUrl(filename, { hostId, hostType, type }) {…},
  },
  plugins: [
    // https://vitejs.dev/guide/api-plugin.html#transformindexhtml
  ]
})
