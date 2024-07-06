import { resolve } from 'node:path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/server-options.html
// import dns from 'node:dns'
// dns.setDefaultResultOrder('verbatim')

// https://github.com/cosmiconfig/cosmiconfig
// https://vitejs.dev/config/
export default defineConfig({
  // https://github.com/posthtml/posthtml
  // https://github.com/posthtml/htmlnano
  // https://github.com/svg/svgo
  // indexHtmlTransforms: [{ omit }],
  server: {
    port: 3030,
  },
  preview: {
    port: 8080,
  },
  build: {
    cssCodeSplit: false,
    // https://lightningcss.dev/minification.html
    cssMinify: 'lightningcss',
    // https://rollupjs.org/
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        // nested: resolve(__dirname, 'nested/index.html'),
      },
    },
  },
})
