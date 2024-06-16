qq.idb={};
qq.idb.bn='locqq1';
qq.idb.sn='locqqstore';
//--
qq.idb.f=function(){//alert(9);
return new Promise(function(resolve, reject) {//alert(99);
var db;
var reg=indexedDB.open(qq.idb.bn);
reg.onerror=function(){alert('error');};
reg.onsuccess=function(event){
db=event.target.result;qq.idb.db=db;
resolve(1);
};
//---
reg.onupgradeneeded=function(event){alert('upg');var db = event.target.result;
db.createObjectStore(qq.idb.sn,{keyPath:"key"});
db.createObjectStore('st1',{keyPath:"key"});
};
//--
})
};
//--------------
(async function (){
let c=await qq.idb.f();
qq.idb.get=function(k){return new Promise(function(resolve, reject) {
var tran = qq.idb.db.transaction([qq.idb.sn], "readonly");
var objst = tran.objectStore(qq.idb.sn);
var regp=objst.get(k);
regp.onsuccess = function(e) {
if(regp.result)
resolve(regp.result.data);
else resolve(regp.result);
};
})};
//---
qq.idb.set=function(k,o){return new Promise(function(resolve, reject) {
var tran = qq.idb.db.transaction([qq.idb.sn], "readwrite");
var objst = tran.objectStore(qq.idb.sn);
var regp=objst.put({key:k,data:o});
regp.onsuccess = function(e) {
resolve(regp.result);
};
})};

//---
qq.idb.delete=function(o){return new Promise(function(resolve, reject) {
var tran = qq.idb.db.transaction([qq.idb.sn], "readwrite");
var objst = tran.objectStore(qq.idb.sn);
var regp=objst.delete(o);
regp.onsuccess = function(e) {
resolve(regp.result);
};
})};
//---
qq.idb.count=function(){return new Promise(function(resolve, reject) {
var tran = qq.idb.db.transaction([qq.idb.sn], "readonly");
var objst = tran.objectStore(qq.idb.sn);
var regp=objst.count();
regp.onsuccess = function(e) {
resolve(regp.result);
};
})};
//---
qq.idb.getAll=function(k){return new Promise(function(resolve, reject) {
var tran = qq.idb.db.transaction([qq.idb.sn], "readonly");
var objst = tran.objectStore(qq.idb.sn);
var regp=objst.getAll(k);
regp.onsuccess = function(e) {
let mm=regp.result;let m=[];
mm.forEach(function (a){m.push([a.key,a.data])});
resolve(m);
};
})}
})();
