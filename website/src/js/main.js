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
  } = doc, { dataset } = root,
  {
    // https://drafts.csswg.org/cssom-view/#visualViewport
    // https://drafts.csswg.org/cssom-view/#dom-window-visualviewport
    visualViewport: vv,
  } = window,
  // https://wicg.github.io/netinfo/
  // https://html.spec.whatwg.org/multipage/system-state.html
  // https://html.spec.whatwg.org/multipage/system-state.html#dom-navigator-online-dev
  {
    userAgent: ua,
    onLine,
    // connection: { type: netinfo = undefined },
    geolocation: geo,
    // https://developer.mozilla.org/en-US/docs/Web/API/GPU
    // https://gpuweb.github.io/gpuweb/#gpu-interface
    // https://www.w3.org/TR/webgpu/
    gpu
  } = navigator;

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

// https://developer.mozilla.org/en-US/docs/Web/API/Battery_Status_API
// https://w3c.github.io/battery/#dom-navigator-getbattery
// navigator.getBattery().then((battery) => {});

window.addEventListener('load', (ev) => onloadEv(ev), true);
