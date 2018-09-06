window.onload = () => {
  loader() 
  new Setup() 
  reloadButton()
}
const loader = action => action ? document.getElementById('loader').classList.remove('dom-loaded') : document.getElementById('loader').classList.add('dom-loaded');
const reloadButton = () => {
  let body = document.querySelector('body')
  let button = document.createElement('div')
  button.id = 'reload-button'
  button.innerHTML = '<i class="far fa-redo"></i>'
  body.appendChild(button)
  button.addEventListener('click', () => location.reload())
}