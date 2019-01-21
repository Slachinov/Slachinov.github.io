//alert('localqqmy');
window.localqq={};
//--
localqq.f=function(){//alert(9);
return new Promise(function(resolve, reject) {//alert(99);
var db;
var reg=indexedDB.open('localqq');
reg.onerror=function(){alert('error');};
reg.onsuccess=function(event){
db=event.target.result;localqq.db=db;
resolve(1);
};
//---
reg.onupgradeneeded=function(event){alert('upg');var db = event.target.result;
db.createObjectStore("localqqstore",{keyPath:"key"});
};
//--
})
};
//--------------
(async function (){
let c=await localqq.f();
localqq.get=function(k){return new Promise(function(resolve, reject) {
var tran = localqq.db.transaction(['localqqstore'], "readonly");
var objst = tran.objectStore("localqqstore");
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
//---
localqq.getAll=function(k){return new Promise(function(resolve, reject) {
var tran = localqq.db.transaction(['localqqstore'], "readonly");
var objst = tran.objectStore("localqqstore");
var regp=objst.getAll(k);
regp.onsuccess = function(e) {
resolve(regp.result);
};
})}
})();
