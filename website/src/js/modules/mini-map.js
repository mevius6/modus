const doc = document;
const vv = window.visualViewport;

// Spec: https://drafts.csswg.org/css-scoping/#default-element-styles
const sheet = new CSSStyleSheet();
// https://drafts.csswg.org/css-values-3/#strings
// sheet.replaceSync("\
sheet.replaceSync("mini-map {\
  display: block;z-index: 2;position: sticky;inset-block-start: 0;inset-inline-end: 0;inline-size: fit-content;max-block-size: 100%;padding: var(--spacer-2x);margin-block-start: calc(var(--min-touch-target-size) + 2ch);}\
");
sheet.insertRule("#live-preview {\
  border-radius: 0.5em;\
  box-shadow: none;\
  position: sticky;\
  inset-block: 1em;\
  padding: 16px;}\
");
sheet.insertRule("#slider {\
  border-radius: .375em;\
  position: absolute;\
  top: 8px;\
  inset-inline: -.25em;\
  transform: translateY(0);\
  border: 2px solid var(--apple-blue);\
  filter: drop-shadow(0 0 0.125rem #aaa);\
}");

const NAME = 'mini-map';

const template = doc.createElement('template');
template.innerHTML = `
  <div id="live-preview">
    <div id="slider"></div>
    <div id="output"></div>
  </div>
`;

/**
 * [vsc]: https://code.visualstudio.com/docs/getstarted/userinterface#_minimap
 *
 * @see https://www.stefanjudis.com/a-firefox-only-minimap/
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/element
 * @see https://drafts.csswg.org/css-images-4/#element-notation
 */
class MiniMap extends HTMLElement {
  constructor() {
    super();

    this._initializeDOM();
  }

  _initializeDOM() {
    this.isSupported = CSS.supports('background', 'white -moz-element(#main)');
    if (this.isSupported) {
      sheet.insertRule("[id=output] { background: canvas -moz-element(#main) no-repeat scroll center / contain; }");
      doc.adoptedStyleSheets = [sheet];

      // FIXME: https://drafts.csswg.org/css-images-4/#ex-invalid%20image
      // const shadowRoot = this.attachShadow({ mode: 'open' });
      // shadowRoot.appendChild(template.content.cloneNode(true));
      // shadowRoot.adoptedStyleSheets = [sheet];
      this.appendChild(template.content.cloneNode(true));

      this._preview = this.querySelector('#live-preview');
      this._pointer = this.querySelector('#slider');
      this._canvas = this.querySelector('#output');

      // doc main section (region area) as image source
      this.referencedElement = main; // doc.querySelector('#main');

      const { width: refW, height: refH, top: refTop } = this.referencedElement
        .getBoundingClientRect();

      this.DOMRect = {
        W: refW,
        H: refH
      }

      this.config = {
        width: 90,
        height: Math.floor(90 * (refH / refW)),
        topScrollBorder: refTop + window.scrollY,
        viewport: {
          w: vv.width,
          h: vv.height,
          ratio: vv.height / vv.width
        },
      }
      this.pointerHeight = (this.config.width + 2) *
        this.config.viewport.ratio *
        (this.config.viewport.w / this.DOMRect.W);
    }
  }

  removeMap() {
    return this.parentNode.removeChild(this);
  }

  connectedCallback() {
    if (!this.isSupported) return this.removeMap();

    const mq = window.matchMedia('(min-width: 74em)');
    const isNotEnoughSpace = this.config.height + 100 > window.innerHeight || !mq.matches;

    if (isNotEnoughSpace) return this.removeMap();
    mq.addEventListener('change', () => {
      if (!mq.matches) this.parentNode.removeChild(this);
    }, { once: true });

    this._canvas.style.width = `${ this.config.width }px`;
    this._canvas.style.height = `${ this.config.height }px`;
    this._pointer.style.height = `${ this.pointerHeight }px`;

    this._setPointerPosition(window.scrollY);

    window.addEventListener('scroll', () => {
      this._setPointerPosition(window.scrollY);
    }, { passive: true });
  }

  _setPointerPosition(scrollY) {
    const pixelsScrolledIntoMain = window.scrollY - this.config.topScrollBorder;
    const scrolledIntoRatio = pixelsScrolledIntoMain / this.DOMRect.H;
    const transform = Math.floor(scrolledIntoRatio * this.config.height);
    if (scrolledIntoRatio > 0 && transform < this.config.height - this.pointerHeight + 16) {
      this._pointer.style.transform = `translateY(${ transform }px)`;
    }
  }
}

customElements.define(NAME, MiniMap);
