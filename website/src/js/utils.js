/**
 * Returns a promise that will resolve after passed ms.
 * @param  {number} ms
 * @return {Promise}
 */
export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


export const asyncFetchJSON = async (url, options = {}, query = {}) => {
  const response = await fetch(url, options, query);
  const json = await response.json();

  if (!response.ok || json.errors) {
    // console.error(json.errors);
    const message = `Произошла ошибка: ${response.status}`;
    throw new Error(message);
  }

  return json;
};
