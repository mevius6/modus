/**
 * @fileoverview This file contains the configuration for dynamically
 * loading modules.
 *
 * * * *
 *
 * [mods]: https://tc39.es/ecma262/#sec-modules
 * [spec]: https://tc39.es/proposal-dynamic-import/
 * [repo]: https://github.com/tc39/proposal-dynamic-import
 * [html-sec-8.1.5]: https://html.spec.whatwg.org/multipage/webappapis.html#module-specifier-resolution
 * [html-sec-8.1.6]: https://html.spec.whatwg.org/multipage/webappapis.html#javascript-specification-host-hooks
 *
 * @see `import()` [Specification][spec] and [Repository][repo]
 */
let _overview;

const parsedUrl = new URL(window.location.href);
const doc = document, { documentElement: root } = doc;

/* eslint-disable no-unused-vars */

// https://github.com/tc39/proposal-top-level-await
(async () => {
  const toggle = await import('./modules/theme-switcher.js').then(() => {
    const themeSwitch = doc.querySelector('theme-switch');
    root.setAttribute('data-theme-style', themeSwitch.mode === 'dark'
      ? 'dark'
      : 'light'
    );
    themeSwitch.addEventListener('colorschemechange', () => {
      root.dataset.themeStyle = themeSwitch.mode;
    });
  });

  if (
    parsedUrl.pathname === '/' ||
    parsedUrl.pathname === '/index.html'
  ) {
    const cursor = await import('./modules/cursor.js');
    // const carousel = await import('./modules/carousel');
    // const map = await import('./modules/map');
    const minimap = await import('./modules/mini-map.js');
    const webterm = await import('./modules/web-terminal.js');

    // ? https://github.blog/tag/homepage-design/
  }

  const sidenav = await import('./modules/sidenav.js');
  // const nav = await loadNav('.nav-button');
})();

// async function loadNav(control) {
//   const { default: DisclosureForNav } = await import('./modules/nav');
//   const disclosure = new DisclosureForNav(doc.querySelector(control));
// }

/* eslint-enable no-unused-vars */
