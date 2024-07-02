const doc = document,
  {
    // developer.mozilla.org/en-US/docs/Web/API/Document/cookie
    // https://datatracker.ietf.org/doc/html/rfc6265
    documentElement: root, body, cookie,
    location: curr_url,
    lastModified: page_modified,
    // adoptedStyleSheets,
    // developer.mozilla.org/en-US/docs/Web/API/Document/adoptedStyleSheets
    // https://drafts.csswg.org/cssom/#css-style-sheet-collections
  } = doc;

const onloadEv = async (ev) => {
  root.classList.replace('no-js', 'js');
  body.classList.replace('page--loading', 'page--loaded');

  root.setAttribute('data', page_modified);
  // console.info(doc.designMode)
}

window.addEventListener('load', (ev) => onloadEv(ev), true);
