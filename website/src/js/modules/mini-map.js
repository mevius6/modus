const NAME = 'mini-map';

// Specs:
// https://drafts.csswg.org/css-scoping/#default-element-styles
// https://drafts.csswg.org/css-scoping/#shadow-dom
// https://drafts.csswg.org/css-scoping/#shadow-cascading

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
      z-index: 1;
      position: sticky;
      inset-block-start: 0;
      inset-inline-end: 0;
      inline-size: fit-content;
      max-block-size: 100%;
      padding: var(--spacer-2x);
      margin-block-start: calc(var(--min-touch-target-size) + 2ch);
    }

    [part=container] {
      border-radius: 0.5em;
      box-shadow: none;
      position: sticky;
      inset-block: 1em;
      padding: 16px;
    }

    [part=pointer] {
      padding: 0.25em;
      border-radius: .375em;
      position: absolute;
      top: 8px;
      inset-inline: -.25em;
      transform: translateY(0);
      border: 2px solid var(--apple-blue);
      filter: drop-shadow(0 0 0.125rem #aaa);
    }

    [part=preview] {
      background: canvas -moz-element(#main) no-repeat scroll center / contain;
    }
  </style>
  <div part="container">
    <div part="pointer"></div>
    <div part="preview"></div>
  </div>
`;

/**
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
      // FIXME: test1
      // const style = document.createElement('style');
      // style.textContent = `
      //   ${NAME}::part(preview),
      //   ${NAME} [part=preview] {
      //     background: canvas -moz-element(#main) no-repeat scroll center center / contain;
      //   }
      // `;
      // document.head.appendChild(style);

      // FIXME: https://drafts.csswg.org/css-images-4/#ex-invalid%20image
      const shadowRoot = this.attachShadow({mode: 'open'});
      shadowRoot.appendChild(template.content.cloneNode(true));

      this._container = shadowRoot.querySelector('[part=container]');
      this._pointer = shadowRoot.querySelector('[part=pointer]');
      this._preview = shadowRoot.querySelector('[part=preview]');

      // FIXME: test2
      // https://developer.mozilla.org/en-US/docs/Web/API/Document/mozSetImageElement
      // document.mozSetImageElement(this.referencedElement.id, this._preview);

      this.referencedElement = main; // document.querySelector('#main');

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
          w: window.visualViewport.width,
          h: window.visualViewport.height,
          ratio: window.visualViewport.height / window.visualViewport.width
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

    this._preview.style.width = `${ this.config.width }px`;
    this._preview.style.height = `${ this.config.height }px`;
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
