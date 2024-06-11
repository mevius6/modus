const doc = document, { documentElement: root, body } = doc;

window.addEventListener('load', () => {
  root.classList.replace('no-js', 'js');
  body.classList.replace('page--loading', 'page--loaded');

  // console.clear();
});
