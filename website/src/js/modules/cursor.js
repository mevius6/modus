const doc = document, { documentElement: root, body } = doc;

// https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet
// const sheet = new CSSStyleSheet();
// sheet.replaceSync(".custom-cursor {\
//   display: block;\
// }");
// doc.adoptedStyleSheets = [sheet];

// const el = doc.querySelector('#cursor'); // [id=cursor]

const update = ({ x, y }) => {
  root.style.setProperty('--x', Math.floor(x))
  root.style.setProperty('--y', Math.floor(y))
  // doc.body.dataset.mouseX = x
  // doc.body.dataset.mouseY = y
}
const onPointerEvent = update;

/**
 * @see https://drafts.csswg.org/web-animations-1/#example-c881d871
 * @see https://caniuse.com/web-animation
 */
// const onPointerEvent = async ev => {
//   const animation = cursor.animate(
//     { transform: `translate(${ev.clientX}px, ${ev.clientY}px)` },
//     { duration: 300, fill: 'forwards' }
//   );
//   await animation.finished;
//   // commitStyles will record the style up to and including `animation` and
//   // update elem’s specified style with the result.
//   animation.commitStyles();
//   animation.cancel();
// }

body.addEventListener('pointermove', async ev => onPointerEvent(ev), false);
