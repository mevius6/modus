const doc = document;
const store = localStorage;

const NAME = 'theme-switch';
const DARK = 'dark';
const LIGHT = 'light';
const PREFERS_COLOR_SCHEME = 'prefers-color-scheme';
const MQ_DARK = `(${PREFERS_COLOR_SCHEME}:${DARK})`;
const MQ_LIGHT = `(${PREFERS_COLOR_SCHEME}:${LIGHT})`;
const COLOR_SCHEME_CHANGE = 'colorschemechange';
const PERMANENT_COLOR_SCHEME = 'permanentcolorscheme';

// const ID = 'iconGradient';
// const HEX = ['A8857A', 'A8857A'];
// const ICON_GRADIENT = `%3E%3Cdefs%3E%3ClinearGradient id='${ID}' gradientUnits='userSpaceOnUse' x1='0%25' y1='0%25' x2='100%25' y2='0%25' gradientTransform='rotate(45)'%3E%3Cstop offset='0%25' stop-color='%23${HEX[0]}' /%3E%3Cstop offset='100%25' stop-color='%23${HEX[1]}' /%3E%3C/linearGradient%3E%3C/defs%3E`;
// const PATH_DATA = '…';
// const ICON = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E${ICON_GRADIENT}%3Cpath fill='url(%23${ID})' d='${PATH_DATA}'/%3E%3C/svg%3E")`;
// const ICON_OUTLINED = ICON, ICON_FILLED = ICON;

//--> theme-switcher-template.tpl
const template = doc.createElement('template');
template.innerHTML = `
  <style>
    *,::after,::before{box-sizing:border-box}:host{contain:content;display:block}form{margin:0;padding:0;background:transparent;color:inherit}fieldset{border:0;margin:0;padding:0}legend{font:var(--${NAME}-legend-font,inherit);padding:0;margin-block-end:0.5rem}input,label{cursor:pointer}

    input {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      position: absolute;
      pointer-events: none;
      margin: 0;
      border: 0;
      padding: 0;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip: rect(0 0 0 0);
      clip-path: inset(100%);
      white-space: nowrap;
    }

    input:focus:not(:focus-visible) + label { outline: 0; }

    input:focus-visible + label {
      --${NAME}-border-color: var(--accent);
    }

    label {
      position: relative;
      /*
      border-width: 1px;
      border-style: solid;
      border-color: var(--${NAME}-border-color, transparent); */
      border-radius: 50%;
      font-family: ui-monospace, monospace;
      font-size: var(--${NAME}-font-size, 14px);
      line-height: 1cap;
    }

    @media (hover: hover) {
      label:hover::after { filter: brightness(120%); }
    }

    [part="toggleLabel"] > svg {
      inline-size: 100%;
      block-size: 100%;
      stroke-linecap: round;
    }

    .sun-and-moon > :is(.moon, .sun, .sun-beams) {
      transform-origin: center center;
    }
    .sun-and-moon > :is(.moon, .sun) {
      fill: var(--${NAME}-icon-fill);
    }
    [part="toggleLabel"]:is(:hover, :focus-visible) .sun {
      fill: var(--${NAME}-icon-fill-hover);
    }
    [part="toggleLabel"] .sun-beams {
      stroke: var(--${NAME}-icon-fill);
      stroke-width: 2px;
    }
    [part="toggleLabel"]:is(:hover, :focus-visible) .sun-beams {
      stroke: var(--${NAME}-icon-fill-hover);
    }

    @media (prefers-reduced-motion: no-preference) {
      .sun-and-moon > .sun {
        transition:
          transform
            var(--sun-duration, .5s)
            var(--sun-easing, cubic-bezier(.5, 1.25, .75, 1.25));
        transform: scale(var(--sun-sx, 1));
      }
      .sun-and-moon > .sun-beams {
        opacity: var(--beams-a, 1);
        transform: rotateZ(var(--beams-r, 0));
        transition:
          transform
            var(--beams-duration, .5s)
            cubic-bezier(.5, 1.5, .75, 1.25),
          opacity
            var(--beams-duration, .5s)
            cubic-bezier(.25, 0, .3, 1);
      }
      .sun-and-moon > .moon > circle {
        transform: translateX(var(--moon-tx, 0));
        transition: transform var(--moon-duration, .25s) cubic-bezier(0,0,0,1);
        transition-delay: var(--moon-delay, 0s);
      }
    }
  </style>
  <form part="form">
    <fieldset part="fieldset">
      <input part="toggleCheckbox" id="cb" type="checkbox">
      <label part="toggleLabel" for="cb" title="Поменять оформление">
        <svg class="sun-and-moon" aria-hidden="true" width="24" height="24" viewBox="0 0 24 24">
          <mask class="moon" id="moon-mask">
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            <circle cx="24" cy="10" r="6" fill="black" />
          </mask>
          <circle class="sun" cx="12" cy="12" r="6" mask="url(#moon-mask)" fill="currentColor" />
          <g class="sun-beams" stroke="currentColor">
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </g>
        </svg>
      </label>
    </fieldset>
  </form>
`;

export class ThemeSwitch extends HTMLElement {
  constructor() {
    super();

    doc.addEventListener(COLOR_SCHEME_CHANGE, (event) => {
      this.mode = event.detail.colorScheme;
      // this._updateRadios();
      this._updateCheckbox();
    });

    doc.addEventListener(PERMANENT_COLOR_SCHEME, (event) => {
      this.permanent = event.detail.permanent;
    });

    this._initializeDOM();
  }

  _initializeDOM() {
    const shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.appendChild(template.content.cloneNode(true));

    // this._lightRadio = shadowRoot.querySelector('[part=lightRadio]');
    // this._lightLabel = shadowRoot.querySelector('[part=lightLabel]');
    // this._darkRadio = shadowRoot.querySelector('[part=darkRadio]');
    // this._darkLabel = shadowRoot.querySelector('[part=darkLabel]');

    this._toggleCheckbox = shadowRoot.querySelector('[part=toggleCheckbox]');
    this._toggleLabel = shadowRoot.querySelector('[part=toggleLabel]');

    const hasNativePrefersColorScheme = matchMedia(MQ_DARK).media !== 'not all';

    if (hasNativePrefersColorScheme) {
      matchMedia(MQ_DARK).addListener(({matches}) => {
        this.mode = matches ? DARK : LIGHT;
        this._dispatchEvent(COLOR_SCHEME_CHANGE, {colorScheme: this.mode});
      });
    }

    const rememberedValue = store.getItem(NAME);

    if (rememberedValue && [DARK, LIGHT].includes(rememberedValue)) {
      this.mode = rememberedValue;
      this.permanent = true;
    }
    // Задать цветовую схему в зависимости от системных настроек
    else if (hasNativePrefersColorScheme) {
      this.mode = matchMedia(MQ_LIGHT).matches ? LIGHT : DARK;
    }
    if (!this.mode) {
      this.mode = DARK;
    }
    if (this.permanent && !rememberedValue) {
      store.setItem(NAME, this.mode);
    }

    // this._updateRadios();
    this._updateCheckbox();

    // [this._lightRadio, this._darkRadio].forEach((input) => {
    //   input.addEventListener('change', e => {
    //     if (e.target.checked) {
    //       this.mode = e.target.value;
    //       this._dispatchEvent(COLOR_SCHEME_CHANGE, {colorScheme: this.mode})
    //     }
    //   }, false);
    // });

    this._toggleCheckbox.addEventListener('change', () => {
      this.mode = this._toggleCheckbox.checked ? LIGHT : DARK;
      this._dispatchEvent(COLOR_SCHEME_CHANGE, {colorScheme: this.mode});

      this.permanent = true;

      if (this.permanent) {
        store.setItem(NAME, this.mode);
      } else {
        store.removeItem(NAME);
      }
    });

    this._dispatchEvent(COLOR_SCHEME_CHANGE, {colorScheme: this.mode});
    this._dispatchEvent(PERMANENT_COLOR_SCHEME, {
      permanent: this.permanent,
    });
  }

  _dispatchEvent(type, value) {
    this.dispatchEvent(new CustomEvent(type, {
      bubbles: true,
      composed: true,
      detail: value,
    }));
  }

  // _updateRadios() {
  //   if (this.mode === LIGHT) {
  //     this._lightRadio.checked = true;
  //   } else {
  //     this._darkRadio.checked = true;
  //   }
  // }

  _updateCheckbox() {
    if (this.mode === DARK) {
      this._toggleLabel.style.setProperty('--moon-duration', '.5s');
      this._toggleLabel.style.setProperty('--moon-delay', '.25s');
      this._toggleLabel.style.setProperty('--beams-duration', '.15s');
      this._toggleLabel.style.setProperty(
        '--sun-easing',
        'cubic-bezier(.25, 0, .3, 1)'
      );
      this._toggleLabel.style.setProperty('--sun-duration', '.25s');
      this._toggleLabel.style.setProperty('--sun-sx', 1.75);
      this._toggleLabel.style.setProperty('--moon-tx', '-7px');
      this._toggleLabel.style.setProperty('--beams-a', 0);
      this._toggleLabel.style.setProperty('--beams-r', '-25deg');

      // this._toggleLabel.style.setProperty(
      //   `--${NAME}-icon`, `${ICON_OUTLINED || ICON}`
      // );
      this._toggleCheckbox.checked = false;
    } else {
      this._toggleLabel.style.setProperty('--moon-duration', '.25s');
      this._toggleLabel.style.setProperty('--moon-delay', '0s');
      this._toggleLabel.style.setProperty('--beams-duration', '.5s');
      this._toggleLabel.style.setProperty(
        '--sun-easing',
        'cubic-bezier(.5, 1.25, .75, 1.25)'
      );
      this._toggleLabel.style.setProperty('--sun-duration', '.5s');
      this._toggleLabel.style.setProperty('--sun-sx', 1);
      this._toggleLabel.style.setProperty('--moon-tx', 0);
      this._toggleLabel.style.setProperty('--beams-a', 1);
      this._toggleLabel.style.setProperty('--beams-r', '0deg');

      // this._toggleLabel.style.setProperty(
      //   `--${NAME}-icon`, `${ICON_FILLED || ICON}`
      // );
      this._toggleCheckbox.checked = true;
    }
  }
}

window.customElements.define(NAME, ThemeSwitch);
