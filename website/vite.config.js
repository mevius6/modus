/**
 * @todo Study SSR
 * @file Vite {@link https://vitejs.dev/config/ config}
 *
 * @see
 * - [Awesome Vite](https://github.com/vitejs/awesome-vite)
 * - [Vite MPA](https://vitejs.dev/guide/build.html#multi-page-app)
 * - [Vite PWA](https://vite-pwa-org.netlify.app/)
 * - [Vite SSR](https://vitejs.dev/guide/ssr.html)
 * - [SSR Vue](https://github.com/vitejs/vite-plugin-vue/tree/main/playground/ssr-vue)
 * - [SWC](https://swc.rs/)
 * - [esbuild try](https://esbuild.github.io/try/)
 *
 * @see
 * - https://github.com/cosmiconfig/cosmiconfig
 * - https://github.com/posthtml/posthtml
 * - https://github.com/posthtml/htmlnano
 * - https://github.com/cssnano/cssnano
 * - https://github.com/postcss/postcss#usage
 * - https://github.com/svg/svgo
 * - https://vitejs.dev/guide/features.html#css
 * - https://vitejs.dev/guide/features.html#lightning-css
 */
let _overview;

/** @type {import('vite').UserConfig} */
export default {
  // css: { omit },
  build: {
    target: 'esnext',
    modulePreload: {polyfill: false},
    outDir: 'dist',
    assetsDir: 'assets',
    assetsInlineLimit: 0,
    cssCodeSplit: false,
    cssTarget: false,
    cssMinify: false,
    minify: 'esbuild',
    // https://github.com/vitejs/vite/discussions/13421#discussioncomment-6081692
    // rollupOptions: { input: {}, output: {} },
    manifest: true,
  },
}
