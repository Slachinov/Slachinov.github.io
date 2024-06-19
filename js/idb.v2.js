qq.idb={};
qq.idb.dbs={};
{
//----fff
let fff=function(nm){//
return new Promise(function(resolve, reject) {
let reg=indexedDB.open(nm);
reg.onblocked=function(){alert('blocked');};
reg.onerror=function(){alert('error');};
reg.onsuccess=function(event){
let db=event.target.result;
qq.idb.dbs[db.name]=db;
if(db.name =='locqq')qq.idb.db=db;
db.onversionchange=function (){alert('versch');};
resolve(db);
};//
reg.onupgradeneeded=function(event){alert('upg');let db = event.target.result;
db.createObjectStore('state',{keyPath:"key"});
db.createObjectStore('my',{autoIncrement:true,keyPath:'bd'});
resolve(db);
};//
})};
//-----,
let ffupg=function(nm,o){//
return new Promise(function(resolve, reject) {
let reg=indexedDB.open(nm,o.v);
reg.onblocked=function(){alert('blocked');};
reg.onerror=function(){alert('error');};//
reg.onsuccess=function(event){//alert('suc ubgr');
let db=event.target.result;
qq.idb.dbs[db.name]=db;
if(db.name =='locqq')qq.idb.db=db;
resolve(db);
};//
//---
reg.onupgradeneeded=function(event){//alert('upgrade');
let db = event.target.result;
//alert(o.st);
if(o.op=='delst')
db.deleteObjectStore(o.st);
else if(o.op=='crst')
db.createObjectStore(o.st);
resolve(db);
};//
})};
//=====
qq.idb.f=async function (nm,o){//alert(o.op);
let db;

if(o.op=='init')
{ db=await fff(nm,o);}
else {db=qq.idb.dbs[nm];//alert(db);
if(db)o.v=db.version +1;db.close();
db=await ffupg(nm,o)};
await qq.idb.set(qq.idb.db,'st44',db.name,{name:db.name, v:db.version});
};//
qq.idb.f('locqq',{op:'init'});
//--
qq.idb.get=function(db,st,k){return new Promise(function(resolve, reject) {
var tran = db.transaction([st], "readonly");
var objst = tran.objectStore(st);
var regp=objst.get(k);
regp.onsuccess = function(e) {
if(regp.result)
resolve(regp.result.data);
else resolve(regp.result);
};
})};
//---
qq.idb.set=function(db,st,k,o){return new Promise(function(resolve, reject) {
var tran = db.transaction([st], "readwrite");
//alert('tran');
var objst = tran.objectStore(st);
var regp=objst.put({key:k,data:o});
regp.onsuccess = function(e) {//alert('@@');
resolve(regp.result);
};
regp.onerror=function (){alert('error');};
})};


//---
qq.idb.delete=function(db,st,o){return new Promise(function(resolve, reject) {
var tran = qq.idb.db.transaction([st], "readwrite");
var objst = tran.objectStore(qq.idb.sn);
var regp=objst.delete(o);
regp.onsuccess = function(e) {
resolve(regp.result);
};
})};
//---
qq.idb.count=function(db,st){return new Promise(function(resolve, reject) {
var tran = qq.idb.db.transaction([st], "readonly");
var objst = tran.objectStore(qq.idb.sn);
var regp=objst.count();
regp.onsuccess = function(e) {
resolve(regp.result);
};
})};
//---
qq.idb.getAll=function(db,st,k){return new Promise(function(resolve, reject) {
var tran = db.transaction([st], "readonly");
var objst = tran.objectStore(st);
var regp=objst.getAll(k);
regp.onsuccess = function(e) {//alert('**');
let mm=regp.result;let m=[];
mm.forEach(function (a){m.push([a.key,a.data])});
resolve(m);
};
})}
//--


};
