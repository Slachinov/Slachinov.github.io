// myFilesDB.js
const DB_NAME = 'MyFilesDB';
const STORE_NAME = 'files';
const DB_VERSION = 1;


// Открываем базу
function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);


    req.onupgradeneeded = function(event) {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };


    req.onsuccess = function(event) {
      resolve(event.target.result);
    };


    req.onerror = function(event) {
      reject(event.target.error);
    };
  });
}


// Сохраняем файл в базу
async function saveFile(name, content) {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);
  store.put(content, name);
  await tx.complete;
  db.close();
  qq.cl(`Файл "${name}" сохранён`);
}


// Загружаем файл из базы
async function loadFile(name) {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, 'readonly');
  const store = tx.objectStore(STORE_NAME);
  return new Promise((resolve, reject) => {
    const req = store.get(name);
    req.onsuccess = () => {
      resolve(req.result);
      qq.cl(`Файл "${name}" загружен`);
      db.close();
    };
    req.onerror = () => {
      reject(req.error);
      qq.cl(`Ошибка загрузки файла "${name}"`);
    };
  });
}


// Новая функция: получить все ключи
async function getAllKeys() {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, 'readonly');
  const store = tx.objectStore(STORE_NAME);


  return new Promise((resolve, reject) => {
    const req = store.getAllKeys();
    req.onsuccess = () => {
      resolve(req.result);
      db.close();
    };
    req.onerror = () => {
      reject(req.error);
      db.close();
    };
  });
}


// Экспортируем функции для использования в других модулях
export { openDB, saveFile, loadFile, getAllKeys };