
export function createIdbApi(dbName, storeName) {
function openDB() {
return new Promise((resolve, reject) => {
const req = indexedDB.open(dbName);
req.onsuccess = () => resolve(req.result);
req.onerror = () => reject(req.error);
});
}

async function put(data, key) {
const db = await openDB();
return new Promise((resolve, reject) => {
const tx = db.transaction(storeName, 'readwrite');
const store = tx.objectStore(storeName);
const req = store.keyPath !== null
? store.put(data)
: store.put(data, key);

tx.oncomplete = () => {
db.close();
resolve(req.result);
};
tx.onerror = tx.onabort = () => {
db.close();
reject(tx.error);
};
});
}

async function get(key) {
const db = await openDB();
return new Promise((resolve, reject) => {
const tx = db.transaction(storeName, 'readonly');
const req = tx.objectStore(storeName).get(key);

req.onsuccess = () => resolve(req.result);
tx.oncomplete = () => db.close();
tx.onerror = tx.onabort = () => {
db.close();
reject(tx.error);
};
});
}

async function remove(key) {
const db = await openDB();
return new Promise((resolve, reject) => {
const tx = db.transaction(storeName, 'readwrite');
tx.objectStore(storeName).delete(key);

tx.oncomplete = () => {
db.close();
resolve(true);
};
tx.onerror = tx.onabort = () => {
db.close();
reject(tx.error);
};
});
}

async function getAllKeys() {
const db = await openDB();
return new Promise((resolve, reject) => {
const tx = db.transaction(storeName, 'readonly');
const req = tx.objectStore(storeName).getAllKeys();

req.onsuccess = () => resolve(req.result);
tx.oncomplete = () => db.close();
tx.onerror = tx.onabort = () => {
db.close();
reject(tx.error);
};
});
}

return { put, get, delete:remove, getAllKeys };
}
