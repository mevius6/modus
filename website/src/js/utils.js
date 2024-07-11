/**
 * Returns a promise that will resolve after passed ms.
 * @param  {number} ms
 * @return {Promise}
 */
export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// https://swr.vercel.app/docs/api
const fetcher = (...args) => fetch(...args).then(res => res.json());

export const asyncFetchJSON = async (url, options = {}, query = {}) => {
  const response = await fetch(url, options, query);
  const json = await response.json();

  // https://httpwg.org/specs/rfc9110.html#status.codes
  // https://infra.spec.whatwg.org/#tuples
  // https://fetch.spec.whatwg.org/#statuses
  // https://fetch.spec.whatwg.org/#ref-for-dom-response-status
  const statusInstance = { // example
    code: 403,
    message: 'API rate limit exceeded'
  }

  if (!response.ok || json.errors) {
    // console.error(json.errors);
    console.info(json?.message);
    const message = `Произошла ошибка: ${response.status}`;
    throw new Error(message);
  }

  return json;
};

export async function createObserver(el, ops={}) {
  let isIntersecting;

  if (Object.entries(ops).length === 0) {
    ops.root = el.parentNode;
    ops.rootMargin = '0px';
    ops.threshold = 0;
  }

  const observer = new IntersectionObserver((entries, observer) => {
    for (const entry of entries) {
      console.log(entries);
      ({ isIntersecting } = entry);
      if (isIntersecting) observer.unobserve(entry.target);
    }
  });
  observer.observe(el, ops);

  return isIntersecting;
}

// https://dev.to/anmolbaranwal/15-amazing-things-you-can-do-with-simple-javascript-g88
function detectMobile() {
  if (
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i)
  ) {
    return true;
  } else {
    return false;
  }
}
