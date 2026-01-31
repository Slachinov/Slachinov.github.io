/**
 * Создаёт IndexedDB-хранилище с универсальным API
 * @param {string} dbName - имя базы
 * @param {string} storeName - имя object store
 * @param {object} options - { keyPath: string|null, autoIncrement: boolean }
 * @returns {object} - { save, load, delete, getAllKeys }
 */
export function createIDB(dbName, storeName, options = {}) {
  const keyPath = options.keyPath || null;
  const autoIncrement = options.autoIncrement || false;


  // открытие базы
  function openDB() {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open(dbName, 1);


      req.onupgradeneeded = e => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName, { keyPath, autoIncrement });
        }
      };


      req.onsuccess = e => resolve(e.target.result);
      req.onerror = e => reject(e.target.error);
    });
  }


  // save: если keyPath есть, передаём объект с ключом внутри, иначе ключ отдельно
  async function save(data, key) {
    const db = await openDB();
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);


    let req;
    if (keyPath) {
      req = store.put(data); // ключ внутри объекта
    } else {
      req = store.put(data, key); // ключ передан отдельно
    }


    return new Promise((resolve, reject) => {
      req.onsuccess = () => {
        qq.cl(`Сохранено: ${req.result}`);
        db.close();
        resolve(req.result);
      };
      req.onerror = () => {
        db.close();
        reject(req.error);
      };
    });
  }


  // load
  async function load(key) {
    const db = await openDB();
    const tx = db.transaction(storeName, 'readonly');
    const store = tx.objectStore(storeName);


    return new Promise((resolve, reject) => {
      const req = store.get(key);
      req.onsuccess = () => {
        db.close();
        resolve(req.result);
      };
      req.onerror = () => {
        db.close();
        reject(req.error);
      };
    });
  }


  // delete
  async function remove(key) {
    const db = await openDB();
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);


    return new Promise((resolve, reject) => {
      const req = store.delete(key);
      req.onsuccess = () => {
        db.close();
        resolve(true);
      };
      req.onerror = () => {
        db.close();
        reject(req.error);
      };
    });
  }


  // get all keys
  async function getAllKeys() {
    const db = await openDB();
    const tx = db.transaction(storeName, 'readonly');
    const store = tx.objectStore(storeName);


    return new Promise((resolve, reject) => {
      const req = store.getAllKeys();
      req.onsuccess = () => {
        db.close();
        resolve(req.result);
      };
      req.onerror = () => {
        db.close();
        reject(req.error);
      };
    });
  }


  return { save, load, remove, getAllKeys };
}