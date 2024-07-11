import { getRepo } from "./gh-api.js";
import { formatter } from "../utils/formatter.js";

// import * as styles from '/src/css/console.css';

const doc = document;
const store = localStorage;

const date = formatter(new Date(doc.lastModified));

/**
 * @namespace console
 *
 * [Console Standard]: https://console.spec.whatwg.org/
 * [MDN article]: https://developer.mozilla.org/en-US/docs/Web/API/Console_API
 * [Google Chrome]: https://developer.chrome.com/docs/devtools/console/api (Google Chrome DevTools implementation)
 * [Safari]: https://developer.apple.com/library/archive/documentation/AppleApplications/Conceptual/Safari_Developer_Guide/Console/Console.html (Safari DevTools implementation)
 * [Firefox]: https://firefox-source-docs.mozilla.org/devtools-user/web_console/index.html (Firefox DevTools Docs)
 *
 * @see {@link [Console Standard]}
 * @see {@link [MDN article]}
 *
 * @see
 * [Google Chrome], [Safari] and [Firefox] DevTools implementations
 */
const {log, dir} = console;

const NAME = 'web-terminal';
const MODUS = 'modus';

// https://geist-ui.dev/en-us/components/icons
const SVG_ICON = `
<svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" shape-rendering="geometricPrecision" viewBox="0 0 24 24" height="24" width="24" style="color: currentcolor;"><path d="M4 17l6-6-6-6M12 19h8"></path></svg>
`;

//--> web-terminal-template.tpl
const template = doc.createElement('template');
template.innerHTML = `
  <!-- Console session -->
  <pre><code data-lang="shell" data-shell="zsh" class="session">
    <span class="line sep">=============================</span>
    <span class="line">==> Latest deployments</span>
    <span class="line sep">=============================</span>
    <!-- Github repo data -->
    <span class="line"><mark>&emsp14;💫&emsp14;</mark>
    &#x20;<slot id="repo_upd"></slot></span>
    <!-- <span class="line"><mark>&emsp14;⏱️&emsp14;</mark>
    &#x20;Page speed:&#x20;<slot id="perf">&marker;</slot> -->
    </span>
    <!-- Last modification / current time -->
    <span class="line"><mark>&emsp14;🌿&emsp14;</mark>
    &#x20;Last modified:&#x20;<samp id="time">${date}</samp></span>
    <span class="line">&#x0A;</span>
    <span class="line prompt" data-hostname="user@host">user@mevius6&#x003a;&#x223c;&dollar;</span>
    <span class="line"><span data-char-symbol="➜">&gt;&#x20;</span>
    <kbd contenteditable="true" spellcheck="false">cd&#x20;&#x002e;&#x002e;</kbd><span class="caret" style="animation: var(--animation-blink);">&#x7c;</span>
    </span>
    <span class="line">&#x0D;</span>
  </code></pre>
`;

// TODO Use W3C API; eg to find latest specs
// https://www.w3.org/api/; https://api.w3.org/doc
// $ curl -X GET "https://api.w3.org" -H "accept: application/json"

// https://infra.spec.whatwg.org/#code-points
// https://html.spec.whatwg.org/multipage/named-characters.html
// https://w3c.github.io/rdf-turtle/spec/#selected-terminal-literal-strings

export class WebTerminal extends HTMLElement {
  constructor() {
    super();

    // const styleEl = document.createElement("style");
    // styleEl.innerHTML = `${styles}`;
    // document.head.appendChild(styleEl);

    this._initializeDOM();
  }

  _initializeDOM() {
    // const shadowRoot = this.attachShadow({ mode: 'open' });
    // shadowRoot.appendChild(template.content.cloneNode(true));
    this.appendChild(template.content.cloneNode(true));

    this._getData();
  }

  async _getData() {
    // const req = fetch(`https://${GH_API}/users/${MEVIUS6}/repos?sort=pushed`)
    //   .then((res) => res.json())
    //   .then((data) => data.filter((e) => e.name === MODUS));

    await getRepo();
  }

  _dispatchEvent(type, value) {
    this.dispatchEvent(new CustomEvent(type, {
      bubbles: true,
      composed: true,
      detail: value,
    }));
  }

  connectedCallback() {
    // Adds "preconnect" and "dns-prefetch" resource hints
    ['preconnect', 'dns-prefetch'].forEach((hint, i) => {
      let link = document.createElement('link');
      link.rel = hint;
      link.href = 'api.github.com';
      if (i == 0) link.crossOrigin = '';
      document.head.appendChild(link);
    });
  }
  // disconnectedCallback() {}
}

window.customElements.define(NAME, WebTerminal);
