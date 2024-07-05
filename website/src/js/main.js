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
    innerHeight: vh,
    innerWidth: vw,
    // https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
    // https://html.spec.whatwg.org/dev/webstorage.html#the-storage-interface
    // https://gist.github.com/paulirish/5558557
    localStorage: store,
    // https://html.spec.whatwg.org/multipage/nav-history-apis.html#window
    // https://webidl.spec.whatwg.org/#LegacyWindowAlias
    // https://html.spec.whatwg.org/multipage/nav-history-apis.html#windowproxy
    // https://drafts.csswg.org/cssom-view/#extensions-to-the-window-interface
    ...w
  } = window,
  // https://wicg.github.io/netinfo/
  // https://html.spec.whatwg.org/multipage/system-state.html
  // https://html.spec.whatwg.org/multipage/system-state.html#dom-navigator-online-dev
  {
    userAgent: ua,
    onLine,
    // connection: { type: netinfo = undefined },
    geolocation: geo,
    // https://www.w3.org/TR/device-memory/
    deviceMemory: ram,
    // https://gpuweb.github.io/gpuweb/#gpu-interface
    // https://www.w3.org/TR/webgpu/
    gpu
  } = navigator;

const onloadEv = async (ev) => {
  root.classList.replace('no-js', 'js');
  body.classList.replace('page--loading', 'page--loaded');

  // console.log(w.devicePixelRatio)
  // console.log(gpu.getPreferredCanvasFormat())

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

  // TODO: Battery API
  // https://w3c.github.io/battery/
  // https://www.w3.org/TR/battery-status/#examples
}

window.addEventListener('load', (ev) => onloadEv(ev), true);
