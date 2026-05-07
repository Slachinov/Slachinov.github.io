export function createIDB(dbName, stores = []) {


  let db = null;






  async function openDB() {


    if (db) return db;


    try {


      db = await new Promise((resolve, reject) => {


        const req = indexedDB.open(dbName, 1);






        req.onupgradeneeded = e => {


          try {


            const database = e.target.result;






            for (const storeConfig of stores) {


              const {
                name,
                keyPath = null,
                autoIncrement = false,
                indexes = []
              } = storeConfig;






              let store;






              if (!database.objectStoreNames.contains(name)) {


                store = database.createObjectStore(name, {
                  keyPath,
                  autoIncrement
                });


                qq.cl(`Store created: ${name}`);


              } else {


                store = e.target.transaction.objectStore(name);


              }






              for (const index of indexes) {


                const {
                  name: indexName,
                  keyPath: indexKeyPath,
                  unique = false,
                  multiEntry = false
                } = index;






                if (!store.indexNames.contains(indexName)) {


                  store.createIndex(indexName, indexKeyPath, {
                    unique,
                    multiEntry
                  });


                  qq.cl(`Index created: ${name}.${indexName}`);


                }


              }


            }


          } catch (err) {


            qq.er(`Upgrade error: ${err.message}`);
            reject(err);


          }


        };






        req.onsuccess = e => {


          qq.cl(`DB opened: ${dbName}`);


          resolve(e.target.result);


        };






        req.onerror = e => {


          qq.er(`Open DB error: ${e.target.error?.message}`);
          reject(e.target.error);


        };






        req.onblocked = () => {


          qq.er(`DB blocked: ${dbName}`);


        };


      });






      return db;


    } catch (err) {


      qq.er(`openDB failed: ${err.message}`);
      throw err;


    }


  }






  function closeDB() {


    try {


      if (db) {


        db.close();


        qq.cl(`DB closed: ${dbName}`);


        db = null;


      }


    } catch (err) {


      qq.er(`Close DB error: ${err.message}`);


    }


  }






  async function save(storeName, data, key) {


    try {


      const database = await openDB();






      return await new Promise((resolve, reject) => {


        const tx = database.transaction(storeName, "readwrite");






        tx.onerror = e => {


          qq.er(`Transaction save error: ${e.target.error?.message}`);
          reject(e.target.error);


        };






        tx.onabort = e => {


          qq.er(`Transaction save aborted: ${e.target.error?.message}`);
          reject(e.target.error);


        };






        const store = tx.objectStore(storeName);






        let req;






        if (key !== undefined) {


          req = store.put(data, key);


        } else {


          req = store.put(data);


        }






        req.onsuccess = () => {


          qq.cl(`Saved in ${storeName}: ${req.result}`);
          resolve(req.result);


        };






        req.onerror = () => {


          qq.er(`Save request error: ${req.error?.message}`);
          reject(req.error);


        };


      });


    } catch (err) {


      qq.er(`save() failed: ${err.message}`);
      throw err;


    }


  }






  async function load(storeName, key) {


    try {


      const database = await openDB();






      return await new Promise((resolve, reject) => {


        const tx = database.transaction(storeName, "readonly");






        tx.onerror = e => {


          qq.er(`Transaction load error: ${e.target.error?.message}`);
          reject(e.target.error);


        };






        const store = tx.objectStore(storeName);


        const req = store.get(key);






        req.onsuccess = () => {


          qq.cl(`Loaded from ${storeName}: ${key}`);
          resolve(req.result);


        };






        req.onerror = () => {


          qq.er(`Load request error: ${req.error?.message}`);
          reject(req.error);


        };


      });


    } catch (err) {


      qq.er(`load() failed: ${err.message}`);
      throw err;


    }


  }






  async function remove(storeName, key) {


    try {


      const database = await openDB();






      return await new Promise((resolve, reject) => {


        const tx = database.transaction(storeName, "readwrite");






        tx.onerror = e => {


          qq.er(`Transaction remove error: ${e.target.error?.message}`);
          reject(e.target.error);


        };






        const store = tx.objectStore(storeName);


        const req = store.delete(key);






        req.onsuccess = () => {


          qq.cl(`Removed from ${storeName}: ${key}`);
          resolve(true);


        };






        req.onerror = () => {


          qq.er(`Remove request error: ${req.error?.message}`);
          reject(req.error);


        };


      });


    } catch (err) {


      qq.er(`remove() failed: ${err.message}`);
      throw err;


    }


  }






  async function getAllKeys(storeName) {


    try {


      const database = await openDB();






      return await new Promise((resolve, reject) => {


        const tx = database.transaction(storeName, "readonly");






        tx.onerror = e => {


          qq.er(`Transaction getAllKeys error: ${e.target.error?.message}`);
          reject(e.target.error);


        };






        const store = tx.objectStore(storeName);


        const req = store.getAllKeys();






        req.onsuccess = () => {


          qq.cl(`Keys loaded from ${storeName}`);
          resolve(req.result);


        };






        req.onerror = () => {


          qq.er(`getAllKeys request error: ${req.error?.message}`);
          reject(req.error);


        };


      });


    } catch (err) {


      qq.er(`getAllKeys() failed: ${err.message}`);
      throw err;


    }


  }






  return {
    openDB,
    closeDB,
    save,
    load,
    remove,
    getAllKeys
  };


}