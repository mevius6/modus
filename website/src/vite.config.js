// import { resolve } from 'node:path'
// https://vitejs.dev/config/#configuring-vite
import { defineConfig } from 'vite'

// https://vitejs.dev/config/server-options.html
// import dns from 'node:dns'
// dns.setDefaultResultOrder('verbatim')

export default defineConfig({
  // omit
  publicDir: false,
  // https://vitejs.dev/config/preview-options.html
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
    rollupOptions: {
      input: {
        // main: resolve(__dirname, 'index.html'),
        // nested: resolve(__dirname, 'nested/index.html'),
      },
    },
  },
})
