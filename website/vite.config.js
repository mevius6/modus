import { resolve } from 'node:path'
import { defineConfig } from 'vite'

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
    transformer: 'postcss',
    // postcss: {
    //   from: './src/css/*.css',
    //   to: './dist/css/*.css'
    // },
    // lightningcss: {…}
  },
  // https://vitejs.dev/config/server-options.html
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
    cssCodeSplit: true,
    // https://lightningcss.dev/minification.html
    // cssMinify: 'lightningcss',
    // https://esbuild.github.io/api/
    minify: 'esbuild',
    rollupOptions: {
      input: {
        // entryAlias
        main: resolve(__dirname, 'index.html'),
      },
      output: {
        dir: 'dist'
      }
    },
    // emptyOutDir: false,
  },
})
