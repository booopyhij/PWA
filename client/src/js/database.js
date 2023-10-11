import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

//logic that accepts some content and adds it to the database
export const putDb = async (content) => {
    console.log("PUT to the database");
    //openDB to get into jate database
    const jateDb = await openDB("jate", 1);
    //create transaction
    const tx = jateDb.transaction("jate", "readwrite");
    //object store
    const store = tx.objectStore("jate");
    //use method to pass in content
    const request = store.put({ value: content });
    const result = await request;
  
    console.log("data stored successfully", result);
  };
  
  // logic that gets all the content from the database
  export const getDb = async () => {
    console.log("GET from the database");
  
    //openDB to get into jate database
    const jateDb = await openDB("jate", 1);
    //read only transaction
    const tx = jateDb.transaction("jate", "readonly");
    //object store
    const store = tx.objectStore("jate");
    // .getAll() method to get all data in the database
    const request = store.getAll();
    const result = await request;
  
    console.log("result.value", result);
  
    return result.value;
  };
  
initdb();
