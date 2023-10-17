// Import to get the index db from the database and header front end JS
import { getDb, putDb } from './database';
import { header } from './header';

//creating a class for export
export default class {
  constructor() {
    //creating a const to grab data from the local storage
    const localData = localStorage.getItem('content');

    // check if CodeMirror is working
    if (typeof CodeMirror === 'undefined') {
      throw new Error('CodeMirror is not loaded');
    }

    this.editor = CodeMirror(document.querySelector('#main'), {
      value: '',
      mode: 'javascript',
      theme: 'monokai',
      lineNumbers: true,
      lineWrapping: true,
      autofocus: true,
      indentUnit: 2,
      tabSize: 2,
    });

 
    // Fall back to localStorage if nothing is stored in indexeddb, and if neither is available, set the value to header.
    //when editor is loaded. set the value to what is in the db
    getDb().then((data) => {
      console.log('Loaded data from IndexedDB, injecting into editor');
      // setting the value as localdata
      this.editor.setValue(data || localData || header);
    });
// on a change set the content of the change to local storage then retrieve the data
    this.editor.on('change', () => {
      localStorage.setItem('content', this.editor.getValue());
    });

    // Save the content of the editor 
    this.editor.on('blur', () => {
      console.log('The editor has lost focus');
      putDb(localStorage.getItem('content'));
    });
  }
}
