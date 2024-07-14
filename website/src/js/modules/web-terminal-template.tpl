<style type="text/css">
  /* FIXME https://support.mozilla.org/bm/questions/1426612 */
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap');

  @import 'css/console.css' layer(terminal);
</style>
<!--
  + --------------------------- +
  | Web Terminal (emu) <[ *_*]/ |
  + --------------------------- +
-->
<section aria-labelledby="region1">
  <h2 id="region1" class="sr-only">title for region area 1</h2>
  <!-- TODO:
    - Fetch latest deployments status from gh repo
    - Terminal-like boot state and type animations
    - Print source code structure, in tree order
        https://dom.spec.whatwg.org/#concept-tree-order
        https://dom.spec.whatwg.org/#concept-tree-root
        https://www.npmjs.com/package/tree-console
        https://github.com/structure-codes/cli
        https://console.spec.whatwg.org/
  -->
  <!--
    Console session:
      https://man7.org/tlpi/
      https://man7.org/linux/man-pages/man1/intro.1.html
      https://www.opennet.ru/base/dev/zsh_intro.txt.html -->
  <!--
    Semantic markup:
      https://html.spec.whatwg.org/#the-code-element
      https://html.spec.whatwg.org/#the-samp-element
      https://html.spec.whatwg.org/#the-output-element -->
  <!--
    Simulate render:
      https://drafts.csswg.org/css-ui/#caret

    [session start]
      Last login: Thu Jun 20 20:12:22 on ttys002
      Documents/Code/→ Projects on 🐳 v26.1.4 (desktop-linux)
  -->
  <pre><code data-lang="shell" data-shell="zsh" class="session">
    <span class="line sep">=============================</span>
    <span class="line">==> Latest deployments</span>
    <span class="line sep">=============================</span>
    <!-- Github repo data -->
    <span class="line"><mark>&emsp14;💫&emsp14;</mark>
    &#x20;<samp><span id="repo_upd"></span></samp></span>
    <span class="line"><mark>&emsp14;⏱️&emsp14;</mark>
    &#x20;Page speed:&#x20;<samp id="perf">&marker;</samp>
    </span>
    <!-- Last modification / current time -->
    <span class="line"><mark>&emsp14;🌿&emsp14;</mark>
    &#x20;Last modified:&#x20;<samp id="time">&marker;</samp></span>
    <span class="line">&#x0A;</span>
    <span class="line prompt" data-hostname="user@host">user@mevius6&#x003a;&#x223c;&dollar;</span>
    <span class="line"><span data-char-symbol="➜">&gt;&#x20;</span>
    <kbd contenteditable="true" spellcheck="false">cd&#x20;&#x002e;&#x002e;</kbd><span class="caret" style="animation: var(--animation-blink);">&#x7c;</span>
    </span>
    <span class="line">&#x0D;</span>
  </code></pre>
  <!--
    TODO curl -X GET "https://api.w3.org/" -H "accept: application/json"
    https://www.w3.org/api/; https://api.w3.org/doc
  -->
  <!-- OR -->
  <!-- table>tbody>(tr>td.line-number[value=$]+td.line-content>{…})*N -->
</section>
