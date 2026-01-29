// myFilesDB.js


const DB_NAME = 'MyDB';
const STORE_NAME = 'files';
const DB_VERSION = 1;


// Открываем базу
function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);


    req.onupgradeneeded = function(event) {
      const db = event.target.result;


      if (!db.objectStoreNames.contains(STORE_NAME)) {
        // 🔥 Главное изменение
        db.createObjectStore(STORE_NAME, {
          keyPath: 'id',
          autoIncrement: true
        });
      }
    };


    req.onsuccess = event => resolve(event.target.result);
    req.onerror = event => reject(event.target.error);
  });
}


// Сохраняем файл (id создаётся автоматически)
async function saveFile(fileObj) {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);


  const req = store.put(fileObj);


  return new Promise((resolve, reject) => {
    req.onsuccess = () => {
      qq.cl(`Файл сохранён id=${req.result}`);
      db.close();
      resolve(req.result); // вернёт id записи
    };


    req.onerror = () => {
      db.close();
      reject(req.error);
    };
  });
}


// Загружаем файл по id
async function loadFile(id) {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, 'readonly');
  const store = tx.objectStore(STORE_NAME);


  return new Promise((resolve, reject) => {
    const req = store.get(id);


    req.onsuccess = () => {
      qq.cl(`Файл id=${id} загружен`);
      db.close();
      resolve(req.result);
    };


    req.onerror = () => {
      db.close();
      reject(req.error);
    };
  });
}


// Удаление по id
async function deleteFile(id) {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);


  return new Promise((resolve, reject) => {
    const req = store.delete(id);


    req.onsuccess = () => {
      qq.cl(`Файл id=${id} удалён`);
      db.close();
      resolve(true);
    };


    req.onerror = () => {
      db.close();
      reject(req.error);
    };
  });
}


// Получить все ключи (id)
async function getAllKeys() {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, 'readonly');
  const store = tx.objectStore(STORE_NAME);


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


export { openDB, saveFile, loadFile, deleteFile, getAllKeys };