const doc = document;
const vv = window.visualViewport;
const {
  innerWidth: vw,
  innerHeight: vh,
  scrollX: pageX,
  scrollY: pageY
} = window;

const MIN_WIDTH = '(min-width: 74em)';
const mq = window.matchMedia(MIN_WIDTH);

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
  background-color: var(--background-a15);\
  filter: drop-shadow(0 0 .125rem #aaa) contrast(1.2);\
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
 * @see https://wwwindow.stefanjudis.com/a-firefox-only-minimap/
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

      // TODO
      // MiniMap.sliderDraggable = true
      // MiniMap.side = (LH || RH)

      // doc main section (region area) as image source
      this.referencedElement = main; // doc.querySelector('#main');

      const {
        width: refW, height: refH
      } = this.referencedElement.getBoundingClientRect();

      // obj
      this.source = {
        W: refW,
        H: refH,
        // https://drafts.csswg.org/css-values-4/#ratios
        ratio: refH / refW,
      }

      this.el = {
        W: 90,
        H: Math.floor(90 * this.source.ratio),
      }

      this.pointerHeight = (this.el.W + 2) *
        (vv.height / vv.width) *
        (vv.width / this.source.W);
    }
  }

  removeMap() {
    return this.parentNode.removeChild(this);
  }

  connectedCallback() {
    if (!this.isSupported) return this.removeMap();

    const isNotEnoughSpace = this.el.H + 100 > vh || !mq.matches;

    if (isNotEnoughSpace) return this.removeMap();
    mq.addEventListener('change', () => {
      if (!mq.matches) this.parentNode.removeChild(this);
    }, { once: true });

    this._canvas.style.width = `${ this.el.W }px`;
    this._canvas.style.height = `${ this.el.H }px`;
    this._pointer.style.height = `${ this.pointerHeight }px`;

    this._setPointerPosition();

    window.addEventListener('scroll', () => {
      this._setPointerPosition();
    }, { passive: true });
  }

  async _setPointerPosition() {
    // dynamically updated
    const scrolledIntoRatio = window.scrollY / this.source.H;
    const transform = Math.floor(scrolledIntoRatio * this.el.H);
    if (scrolledIntoRatio > 0 && transform < (this.el.H - this.pointerHeight)) {
      // FIXME: https://firefox-source-docs.mozilla.org/performance/scroll-linked_effects.html
      // this._pointer.style.transform = `translateY(${ transform }px)`;
      // this._pointer.style.willChange = 'transform';

      // TODO MiniMap.sliderSmoothAnim = true
      // https://drafts.csswg.org/web-animations-1/#example-c881d871
      const animation = this._pointer.animate(
        { transform: `translateY(${ transform }px)` },
        { duration: 300, fill: 'forwards' }
      );
      await animation.finished;
      // commitStyles will record the style up to and including `animation` and
      // update elem’s specified style with the result.
      animation.commitStyles();
      animation.cancel();
    }
  }
}

customElements.define(NAME, MiniMap);
