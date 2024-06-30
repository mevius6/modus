/**
 * Returns a promise that will resolve after passed ms.
 * @param  {number} ms
 * @return {Promise}
 */
export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function getRectRelativeToOffsetParent(element, offsetParent) {
  let rect = element.getBoundingClientRect();
  let offsetRect = offsetParent.getBoundingClientRect();
  return {
    x: rect.x - offsetRect.x,
    y: rect.y - offsetRect.y,
    width: rect.width,
    height: rect.height,
  };
}
