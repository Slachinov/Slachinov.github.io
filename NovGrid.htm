async function upgradeDB({
  dbName,
  stores = [],
  deleteStores = []
}) {
  const list = await indexedDB.databases();
  const info = list.find(d => d.name === dbName);
  const currentVersion = info?.version || 0;


  const req = indexedDB.open(dbName, currentVersion + 1);


  return new Promise((resolve, reject) => {


    req.onblocked = () => {
      qq.er("blocked");
    };


    req.onerror = (e) => reject(e);


    req.onupgradeneeded = (e) => {
      const db = e.target.result;


      db.onversionchange = () => {
        qq.cl("versionchange");
        db.close();
      };


      // 1. DELETE STORES
      for (const name of deleteStores) {
        if (db.objectStoreNames.contains(name)) {
          db.deleteObjectStore(name);
        }
      }


      // 2. CREATE / UPDATE STORES
      for (const s of stores) {


        let store;


        if (!db.objectStoreNames.contains(s.name)) {
          store = db.createObjectStore(
            s.name,
            s.options || {}
          );
        } else {
          store = req.transaction.objectStore(s.name);
        }


        // 3. DELETE INDEXES
        for (const idxName of (s.deleteIndexes || [])) {
          if (store.indexNames.contains(idxName)) {
            store.deleteIndex(idxName);
          }
        }


        // 4. CREATE INDEXES
        for (const idx of (s.indexes || [])) {
          if (!store.indexNames.contains(idx.name)) {
            store.createIndex(
              idx.name,
              idx.keyPath,
              { unique: !!idx.unique }
            );
          }
        }
      }
    };


    req.onsuccess = (e) => {
      const db = e.target.result;


      db.onversionchange = () => {
        qq.cl("versionchange");
        db.close();
      };


      db.close();


      resolve(db);
    };


  });
}