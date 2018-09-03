/* PROD WATCHING: BABEL_ENV=production npx babel src --watch --out-file dist/js/main.min.js */
/* PROD COMPILE: BABEL_ENV=production npx babel src --out-file dist/js/main.min.js */
window.onload = function () {
  document.getElementById('loader').classList.add('dom-loaded');
  new Setup();
};