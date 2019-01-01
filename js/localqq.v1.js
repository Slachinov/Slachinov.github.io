var localqq={};
(function(){var db;
var reg=indexedDB.open('localqq');
reg.onerror=function(){alert('error');};
reg.onsuccess=function(event){alert('succ');
db=event.target.result;
localqq.db=db;
var dd=db.version;dd++;
var listst=db.objectStoreNames;
for(var i=0;i<listst.length;i++)if(listst[i]=='localqqstore')return;
db.close();
reg=indexedDB.open('localqq',dd);
reg.onupgradeneeded=function(event){var db = event.target.result;
db.createObjectStore("localqqstore",{keyPath:"key"});}};
})();
//------
localqq.get=function(k){return new Promise(function(resolve, reject) {
var tran = localqq.db.transaction(['localqqstore'], "readonly");
var objst = tran.objectStore("localqqstore");//alert(objst);
var regp=objst.get(k);
regp.onsuccess = function(e) {
resolve(regp.result.data);
};
})};
//---
localqq.set=function(k,o){return new Promise(function(resolve, reject) {
var tran = localqq.db.transaction(['localqqstore'], "readwrite");
var objst = tran.objectStore("localqqstore");
var regp=objst.put({key:k,data:o});
regp.onsuccess = function(e) {
resolve(regp.result);
};
})};
//---
localqq.delete=function(o){return new Promise(function(resolve, reject) {
var tran = localqq.db.transaction(['localqqstore'], "readwrite");
var objst = tran.objectStore("localqqstore");
var regp=objst.delete(o);
regp.onsuccess = function(e) {
resolve(regp);
};
})};
//---
localqq.count=function(){return new Promise(function(resolve, reject) {
var tran = localqq.db.transaction(['localqqstore'], "readonly");
var objst = tran.objectStore("localqqstore");
var regp=objst.count();
regp.onsuccess = function(e) {
resolve(regp.result);
};
})};
