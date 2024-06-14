# Starter

<!-- TODO List
     https://alistapart.com/article/daily-ethical-design/
     https://alistapart.com/article/mobile-first-css-is-it-time-for-a-rethink/

  1. Microdata
     https://whatwg.org/
     https://schema.org/
     https://www.gs1.org/voc/
     https://developers.google.com/search/docs/appearance
     https://developer.mozilla.org/en-US/docs/Web/HTML/Microdata
     Tools:
          https://validator.schema.org/
          https://search.google.com/test/rich-results
          https://github.com/google/schemarama/
          http://linter.structured-data.org/
          https://json-ld.org/playground/
          https://sdocheck.semantify.it/
          https://yandex.com/support/webmaster/yandex-indexing/validator.html
     Types:
          https://schema.org/docs/full.html
          https://schema.org/WebPage
          https://schema.org/WebPageElement
          https://schema.org/SiteNavigationElement
          https://schema.org/WPSideBar
          https://schema.org/WPHeader
          https://schema.org/WPFooter
          https://schema.org/mainEntity

  2. Custom Emmet Snippets
     https://docs.emmet.io/customization/snippets/
     https://docs.emmet.io/customization/preferences/
     https://docs.emmet.io/cheat-sheet/
     https://code.visualstudio.com/docs/editor/emmet
     https://github.com/emmetio/snippets/blob/master/html.json
     https://www.smashingmagazine.com/2021/06/custom-emmet-snippets-vscode/
     https://macromates.com/

     1. Using the BEM methodology as a class naming convention.
     ```
     body.page.page--loading[itemscope itemtype="https://schema.org/WebPage"]
       aside>nav#globalNav.nav
         ul.nav__items[itemscope itemtype="https://schema.org/SiteNavigationElement" aria-label="Main Menu"]
           (li#$.nav__item>a.nav__link[title itemprop="url"]>.nav__link-text[itemprop="name"]{Link $})*N
       hdr.page__header[itemscope itemtype="https://schema.org/WPHeader"]
       main[itemprop="mainEntity" itemid="https://"]
         h1[itemprop="name"]
         pic>src:t+img[itemprop="image" alt="cover art"]
       ftr.page__footer[itemscope itemtype="https://schema.org/WPFooter"]
         adr>a:mail+br+a:tel>span[itemprop="telephone" content="+7"]{+7}
         small>time[datetime=Y itemprop="copyrightYear"]{Y}+{&COPY;&nbsp;}+span[itemprop="name"]{Brandname}

     ```

  3. Accessibility (a11y)
     │
     ├╴W3C WAI-ARIA
     │ ├╴https://www.w3.org/WAI/resources/
     │ └╴https://w3c.github.io/aria/
     │
     └╴W3C standards and drafts
       ├╴https://www.w3.org/TR/WCAG20/
       └╴https://www.w3.org/TR/WCAG20-TECHS/

     https://developer.mozilla.org/en-US/docs/Web/Accessibility
     https://appraisd-a11y.netlify.app/

     1. Structure (semantic "markup")
        https://www.a11yproject.com/resources/#html-and-aria
        https://www.a11yproject.com/posts/what-is-semantic-html/
        https://webaim.org/techniques/semanticstructure/
        https://www.w3.org/WAI/tutorials/page-structure/example/
        https://www.html5accessibility.com/
        https://cbracco.github.io/html5-test-page/
        https://microformats.org/wiki/existing-rel-values

     2. Color (contrast)
        https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html
        https://www.w3.org/TR/WCAG20-TECHS/G17.html%23G17-tests
        https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html
        https://www.digitala11y.com/understanding-sc-1-4-3-contrast-minimum/
        https://github.com/jhogue/automated-a11y-sass
        https://webaim.org/resources/contrastchecker/
        https://www.lambdatest.com/blog/css-color-contrast/

  4. Progressive Web App
     https://web.dev/learn/pwa
        ├╴/web-app-manifest
        ├╴/enhancements
        ├╴/capabilities#resources
        └╴[…]
     https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps
     https://learn.microsoft.com/en-us/microsoft-edge/
     1. Progressive Enhancement
        https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement
        https://web.dev/baseline
        https://adactio.com/journal/21128
     2. Feature Detection
        https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Cross_browser_testing/Feature_detection
        https://firt.dev/notes/pwa
        https://tomayac.github.io/pwa-feature-detector/
     3. Icons
        https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs
        https://css-tricks.com/svg-favicons-and-all-the-fun-things-we-can-do-with-them/
        https://css-tricks.com/emoji-as-a-favicon/
        https://realfavicongenerator.net/
        https://github.com/elegantapp/pwa-asset-generator
        https://github.com/GoogleChromeLabs/pwacompat
        https://maskable.app/
        https://web.dev/articles/maskable-icon
        https://web.dev/patterns/web-apps/badges
     4. Manifest
        https://w3c.github.io/manifest/#dfn-manifest
        https://developer.mozilla.org/en-US/docs/Web/Manifest
        https://developer.chrome.com/docs/capabilities/pwa-manifest-id
        https://web.dev/articles/add-manifest

  5. Custom Web Components
     https://developer.mozilla.org/en-US/docs/Web/API/Web_components
     https://wicg.github.io/webcomponents/spec/imports/
     https://github.com/GoogleWebComponents
     https://amp.dev/documentation/guides-and-tutorials/learn/spec/amphtml
     https://htmx.org/
     https://lit.dev/
     https://adactio.com/journal/20618
     https://www.zachleat.com/web/?category=web-components
     https://daverupert.com/2024/05/cold-turkey-wont-fix-your-javascript-addiction/
     https://hawkticehurst.com/writing/bring-your-own-base-class/
     https://github.com/shoelace-style/shoemaker
     https://github.com/mdn/web-components-examples/blob/main/shadow-part/index.html
     https://drafts.csswg.org/css-shadow-parts/#part
     https://developer.mozilla.org/en-US/docs/Web/CSS/::part
     https://drafts.csswg.org/css-scoping/#slotted-pseudo

  6. CDN / CMS
     https://www.smashingmagazine.com/2024/05/netlify-platform-primitives/#image-cdn

  7. Variable Font
     https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_fonts/Variable_fonts_guide
     https://evilmartians.com/chronicles/the-joy-of-variable-fonts-getting-started-on-the-frontend

     https://variablefonts.io/
     https://www.axis-praxis.org
     https://play.typedetail.com/
     http://www.very-able-fonts.com/

     Open source variable fonts with Cyrillic support:
     * https://v-fonts.com/fonts/amstelvar
     * https://v-fonts.com/fonts/handjet
     * https://v-fonts.com/fonts/sf-pro
     * https://v-fonts.com/fonts/sf-compact
     * https://v-fonts.com/fonts/science-gothic
     * https://v-fonts.com/fonts/libre-franklin
     * https://v-fonts.com/fonts/aktiv-grotesk-vf
     * [http://standart.gov.design/design/typography]
     * https://v-fonts.com/fonts/golos-vf
     * https://v-fonts.com/fonts/pt-root-ui-vf

     Paid/Trial:
     * https://v-fonts.com/fonts/zenith-var
     * https://v-fonts.com/fonts/cofo-peshka-variable

  ✊🏻 https://humanewebmanifesto.com/
-->
