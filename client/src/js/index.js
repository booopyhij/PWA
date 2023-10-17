// importing workbox, editor.js the indexed db and css
import { Workbox } from 'workbox-window';
import Editor from './editor';
import './database';
import '../css/style.css';

//creating the html 'main' a constant and setting it to empty
const main = document.querySelector('#main');
main.innerHTML = '';

//function to create divs
const loadSpinner = () => {
  const spinner = document.createElement('div');
  console.log(spinner);
  spinner.classList.add('spinner');
  //setting the innerhtml to div classes
  spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `;
  main.appendChild(spinner);
};

// creating a new editor
const editor = new Editor();
//if the editor is undefined, call the loadspinner function
if (typeof editor === 'undefined') {
  loadSpinner();
}

// Check if service workers are supported
if ('serviceWorker' in navigator) {
  // register workbox service worker
  const workboxSW = new Workbox('/src-sw.js');
  workboxSW.register();
} else {
    //logging error so programmer can see the error
  console.error('Service workers are not supported in this browser.');
}
