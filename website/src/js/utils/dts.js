/**
 * Unix Date-Timestamps
 *
 * About:
 *   → https://en.wikipedia.org/wiki/Timestamp
 *   → https://en.wikipedia.org/wiki/ISO_8601
 *   → https://man7.org/linux/man-pages/man3/strftime.3.html
 *   → https://www.iana.org/time-zones
 * Tools:
 *   → https://www.unixtimestamp.com/
 *   → https://currentmillis.com/
 * Specs:
 *   → https://tc39.es/proposal-temporal/docs/
 *   → https://tc39.es/ecma262/#sec-date-time-string-format
 *   → https://html.spec.whatwg.org/dev/dom.html#resource-metadata-management
 *   → https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#dates-and-times
 */
let _overview;

const dateOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

const timeOptions = {
  hour12: false,
  hour: 'numeric',
  minute: '2-digit',
  second: '2-digit',
};

const options = {
  ...timeOptions,
  ...dateOptions,
}

/**
 * @summary Doc load state management.
 *
 * **Specs**
 *
 * [html]: https://html.spec.whatwg.org/#dom-document-lastmodified
 * [http]: https://httpwg.org/specs/rfc7232.html#header.last-modified
 *
 * @see
 * [HTML Spec DOM Document][html]
 * @see
 * [HTTP WG Spec RFC7232][http]
 */
const docLastModified = new Date(document.lastModified);
const ds_l10n = docLastModified.toLocaleDateString(undefined, options);
const ds_year = docLastModified.getUTCFullYear();

copy.dateTime = ds_year; // ISO 8601
copy.textContent = ds_year;
time.textContent = ds_l10n;
