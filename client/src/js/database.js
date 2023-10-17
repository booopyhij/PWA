import { openDB } from 'idb';
//start the DB
const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
        //if db exists do nothing. else create the Jate db
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
    //store an object
    const store = tx.objectStore("jate");
    //use method to pass in content
    const request = store.put({ value: content });
    //async end of the function
    const result = await request;
     // console.log to make sure the logic runs properly
  
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
    // .getAll() method to get all data 
    const request = store.getAll();
    //async end of the function
    const result = await request;
  // console.log to make sure the logic runs properly
    console.log("result.value", result);
  
    return result.value;
  };

initdb();
