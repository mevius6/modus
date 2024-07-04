const doc = document;
const vv = window.visualViewport;

// https://drafts.csswg.org/cssom-view/#extensions-to-the-htmlelement-interface
const header = banner, { offsetHeight: offsetY } = header;
const { blockSize, paddingBlock } = getComputedStyle(header);
const insetBlockStart = parseInt(blockSize) + parseInt(paddingBlock) * 2;
// console.log(insetBlockStart); // w/o borders

// Spec: https://drafts.csswg.org/css-scoping/#default-element-styles
const sheet = new CSSStyleSheet();
// https://drafts.csswg.org/css-values-3/#strings
sheet.replaceSync(`mini-map {\
  display: block;\
  z-index: 2;\
  position: fixed;\
  inset-block-start: 0;\
  inset-inline-end: 0;\
  inline-size: fit-content;\
  max-block-size: 100%;\
  padding-inline: var(--spacer-2x, 16px);\
  margin-block-start: ${ offsetY + 32 }px;
}`);
sheet.insertRule(`#live-preview {\
  position: sticky;
  inset-block-start: ${ offsetY + 16 }px;
  box-shadow:
    rgba(3, 4, 7, 0.12) 0 -1px 2px 0,
    rgba(3, 4, 7, 0.13) 0 2px 1px -2px,
    rgba(3, 4, 7, 0.13) 0 5px 5px -2px,
    rgba(3, 4, 7, 0.14) 0 10px 10px -2px,
    rgba(3, 4, 7, 0.15) 0 20px 20px -2px,
    rgba(3, 4, 7, 0.17) 0 40px 40px -2px;
}`);
sheet.insertRule("#slider {\
  position: absolute;\
  inset-inline: -.25rem;\
  transform: translateY(0);\
  border: 2px solid var(--apple-blue);\
  border-radius: .375em;\
  filter: drop-shadow(0 0 .125rem #aaa);\
}");
sheet.insertRule(":where(#output) {\
  background-color: var(--background);\
  border: thin solid var(--apple-beige);\
  overflow: hidden;\
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

      // TODO MiniMap.side = (LH || RH)

      // doc main section (region area) as image source
      this.referencedElement = main; // doc.querySelector('#main');

      const {
        width: refWidth, height: refHeight
      } = this.referencedElement.getBoundingClientRect();

      // obj
      this.source = {
        w: refWidth,
        h: refHeight,
        // https://drafts.csswg.org/css-values-4/#ratios
        ratio: refHeight / refWidth,
      }

      this.el = {
        w: 90,
        h: Math.floor(90 * this.source.ratio),
      }

      this.pointerHeight = (this.el.w + 2) *
        (vv.height / vv.width) *
        (vv.width / this.source.w);
    }
  }

  removeMap() {
    return this.parentNode.removeChild(this);
  }

  connectedCallback() {
    if (!this.isSupported) return this.removeMap();

    const mq = window.matchMedia('(min-width: 74em)');
    const isNotEnoughSpace = this.el.h + 100 > window.innerHeight || !mq.matches;

    if (isNotEnoughSpace) return this.removeMap();
    mq.addEventListener('change', () => {
      if (!mq.matches) this.parentNode.removeChild(this);
    }, { once: true });

    this._canvas.style.width = `${ this.el.w }px`;
    this._canvas.style.height = `${ this.el.h }px`;
    this._pointer.style.height = `${ this.pointerHeight }px`;

    this._setPointerPosition(window.scrollY);

    window.addEventListener('scroll', () => {
      this._setPointerPosition(window.scrollY);
    }, { passive: true });
  }

  _setPointerPosition(scrollY) {
    const scrolledIntoRatio = window.scrollY / this.source.h;
    const transform = Math.floor(scrolledIntoRatio * this.el.h);
    if (scrolledIntoRatio > 0 && transform < this.el.h - this.pointerHeight) {
      this._pointer.style.transform = `translateY(${ transform }px)`;
      this._pointer.style.willChange = 'transform';
    }
  }
}

customElements.define(NAME, MiniMap);
