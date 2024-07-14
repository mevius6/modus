import postcssPresetEnv from 'postcss-preset-env'
import postcssImport    from 'postcss-import'
import cssnano          from 'cssnano'

// REFS https://vitejs.dev/guide/features.html#css

/** @type {import('postcss-load-config').Config} */
const config = {
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

export default config;
