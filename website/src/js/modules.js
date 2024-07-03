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
    // const carousel = await import('./modules/carousel');
    // const map = await import('./modules/map');

    const update = ({ x, y }) => {
      root.style.setProperty('--x', Math.floor(x))
      root.style.setProperty('--y', Math.floor(y))
      // doc.body.dataset.mouseX = x
      // doc.body.dataset.mouseY = y
    }
    const onPointerEvent = update;

    doc.body.addEventListener('pointermove', async (ev) => onPointerEvent(ev), false);
  }

  const sidenav = await import('./modules/sidenav.js');
  // const nav = await loadNav('.nav-button');
})();

async function loadNav(control) {
  const { default: DisclosureForNav } = await import('./modules/nav');
  // eslint-disable-next-line no-unused-vars
  const disclosure = new DisclosureForNav(doc.querySelector(control));
}

async function loadMap() {
  // eslint-disable-next-line no-undef
  const node = map;
  const loadTrigger = createObserver(node)
    .then(async () => await import('./modules/map'));
}

async function loadTrigger(elementId) {
  let el = doc.getElementById(elementId);
  let io = await createObserver(el);
  return io;
}

async function createObserver(el, ops={}) {
  let isIntersecting;

  if (Object.entries(ops).length === 0) {
    ops.root = el.parentNode;
    ops.rootMargin = '0px';
    ops.threshold = 0;
  }

  const observer = new IntersectionObserver((entries, observer) => {
    for (const entry of entries) {
      console.log(entries);
      ({ isIntersecting } = entry);
      if (isIntersecting) observer.unobserve(entry.target);
    }
  });
  observer.observe(el, ops);

  return isIntersecting;
}

async function loadCardFeed() {
  const { default: CardFeed } = await import('./modules/card-feed');

  // eslint-disable-next-line no-undef
  const firstPost = post1;
  const loadTrigger = createObserver(firstPost);

  loadTrigger.then(() => {
    // eslint-disable-next-line no-unused-vars
    const feed = new CardFeed(firstPost.parentNode);
  });
}

/* eslint-enable no-unused-vars */
