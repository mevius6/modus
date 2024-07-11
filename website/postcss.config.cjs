const postcssPresetEnv  = require('postcss-preset-env')
const postcssImport     = require('postcss-import')
const cssnano           = require('cssnano')

// FIXME https://vitejs.dev/guide/features.html#css
// https://github.com/argyleink/vite-postcss-preset-env
// https://github.com/argyleink/open-props/blob/main/postcss.config.cjs
module.exports = {
  plugins: [
    postcssImport(),
    postcssPresetEnv({
      // https://preset-env.netlify.app/features/#stage-0
      stage: 0,
      enableClientSidePolyfills: false,
      // autoprefixer: false,
      features: {
        'cascade-layers': false,
        'clamp': false,
        'logical-properties-and-values': false,
        'prefers-color-scheme-query': false,
        'gap-properties': false,
        'custom-properties': false,
        'place-properties': false,
        'not-pseudo-class': false,
        'dir-pseudo-class': false,
        'is-pseudo-class': false,
        'focus-within-pseudo-class': false,
        'focus-visible-pseudo-class': false,
        'color-functional-notation': false,
        'double-position-gradients': false,
      }
    }),
    cssnano({
      // https://cssnano.github.io/cssnano/docs/presets/
      preset: 'default'
    }),
  ]
}
