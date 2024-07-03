// https://dom.spec.whatwg.org/#interface-document
const doc = document,
  {
    // https://datatracker.ietf.org/doc/html/rfc6265
    documentElement: root, body, cookie,
    // https://url.spec.whatwg.org/#api
    documentURI: DOC_URL, URL, location,
    timeline: tl,
    lastModified,
    visibilityState: page_visibility, // "hidden" or "visible"
    // defaultView,
    // adoptedStyleSheets,
    // https://drafts.csswg.org/cssom/#css-style-sheet-collections
  } = doc, { dataset } = root;

const onloadEv = async (ev) => {
  root.classList.replace('no-js', 'js');
  body.classList.replace('page--loading', 'page--loaded');

  const UPD_DTS = new Date(lastModified).toLocaleString(undefined, {
    day:'numeric',
    month: 'long',
    weekday: 'short',
    year: 'numeric',
  });

  // Последнее обновление:
  root.setAttribute('data-page-modified', UPD_DTS);

  // console.info(dataset)
  // console.dir(location)
}

window.addEventListener('load', (ev) => onloadEv(ev), true);
