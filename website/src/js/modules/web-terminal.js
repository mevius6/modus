const doc = document;
const store = localStorage;
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

const dateOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};


const NAME = 'web-terminal';

//--> web-terminal-template.tpl
const template = doc.createElement('template');
template.innerHTML = `
  <style>
    @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap');
    @import 'css/console.css' layer(terminal);
  </style>
  <!-- Console session -->
  <pre><code data-shell="zsh" class="session">
    <span class="line sep">=============================</span>
    <span class="line">==> Latest deployments</span>
    <span class="line sep">=============================</span>
    <span class="line"
      ><mark>&emsp14;⏱️&emsp14;</mark>&#x20;Page speed:&#x20;<samp id="perf">&marker;</samp>
    </span>
    <span class="line"
      ><mark>&emsp14;🌿&emsp14;</mark>
      <!-- Last modification / current time -->
      &#x20;Last modified:&#x20;<samp id="time">&marker;</samp></span>
    <span class="line">&#x0A;</span>
    <span class="line prompt" data-hostname="user@local"
      >user@mevius6&#x003a;&#x223c;&dollar;</span>
    <span class="line"
      ><span data-char-symbol="➜">&gt;&#x20;</span>
      <kbd contenteditable="true">cd&#x20;&#x002e;&#x002e;</kbd><span class="caret" style="animation: var(--animation-blink);">&#x7c;</span>
    </span>
    <span class="line">&#x0D;</span>
  </code></pre>
`;

/**
 * TODO Use GitHub REST API; eg to fetch latest deployments status
 *
 * See:
 * - https://docs.github.com/rest
 * - https://docs.github.com/rest/repos
 * - https://docs.github.com/rest/meta
 * - https://docs.github.com/ru/rest/search/ 😈
 * - https://github.com/octokit/octokit.js/#readme
 * - https://css-tricks.com/using-fetch/
 * - https://curl.se/download.html
 *
 * ```
 * $ curl https://api.github.com/zen
 * $ curl https://api.github.com/emojis
 * ```
 */
const gh = {},
{
  // TODO Add "preconnect" and "dns-prefetch" resource hints
  hostname: GH_API = 'api.github.com',
  username: MEVIUS6 = 'mevius6',
  repo: MODUS = 'modus',
} = gh;

/* console.log(fetch(`https://${endpoint}/users/${username}/repos?sort=pushed`)
  .then((response) => response.json())
  // .then((data) => console.log(data))
  .then((data) => {
    data.map(async (repo, i) => {
      const {
        id = 0,
        name = 'modus',
        owner: { avatar_url, html_url },
        url,
        deployments_url: {
          task,
          environment,
          statuses_url,
          creator: { login },
        },
        created_at,
        updated_at,
        pushed_at,
        // https://docs.github.com/rest/commits/commits
        // https://docs.github.com/rest/commits/statuses
        // statuses_url,
        // https://docs.github.com/rest/branches/branches
        // https://docs.github.com/rest/git/trees#get-a-tree
        // trees_url,
        homepage,
        default_branch = 'main',
      } = repo;
      if (name == reponame) console.dir(repo);
      else return;
    });
  });
)
*/

// TODO Use W3C API; eg to find latest specs
// https://www.w3.org/api/; https://api.w3.org/doc
// $ curl -X GET "https://api.w3.org" -H "accept: application/json"

// https://infra.spec.whatwg.org/#code-points
// https://html.spec.whatwg.org/multipage/named-characters.html
// https://w3c.github.io/rdf-turtle/spec/#selected-terminal-literal-strings

export class WebTerminal extends HTMLElement {
  constructor() {
    super();

    this._initializeDOM();
  }

  _initializeDOM() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(template.content.cloneNode(true));
  }

  // TODO
  async _getRepo() {
    const req = fetch(`https://${GH_API}/users/${MEVIUS6}/repos?sort=pushed`)
      .then((res) => res.json())
      .then((data) => data.filter((e) => e.name === MODUS));
  }

  _dispatchEvent(type, value) {
    this.dispatchEvent(new CustomEvent(type, {
      bubbles: true,
      composed: true,
      detail: value,
    }));
  }

  // connectedCallback() {}
  // disconnectedCallback() {}
}

window.customElements.define(NAME, WebTerminal);
