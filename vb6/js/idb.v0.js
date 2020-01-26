//alert('ind');
{let idb={};
//----------
let db;
let req= indexedDB.open ('qqbase');
 req.onsuccess=function(){ db=req.result;qq.reg.get('begin')();
//alert('db');
};
 req.onerror=function(e){alert("error")};
//----

idb.get=function(a){
return new Promise(function(resolve, reject) {var tr=db.transaction(['str0'],'readonly');
var st=tr.objectStore('str0');
var ind=st.index("nm").get(a);
ind.onsuccess=function(e){var rst=e.target.result;//alert(rst);

resolve(rst)};
ind.onerror=function(e){alert("get error");reject(e)}})
};
//----
idb.set=function(a,v){
return new Promise(function(resolve, reject) {
var tr=db.transaction(['str0'],'readonly');
var st=tr.objectStore('str0');
var ind=st.index("nm").get(a);
ind.onsuccess=function(e){var rst=e.target.result;
if(!rst)upd({nm:a,val:v}); else upd({nm:a,val:v,key:rst.key}) };
 ind.onerror=function(){alert('error rr');};
 function upd(a){//alert("upd");
var  tr=db.transaction(['str0'],"readwrite");var st=tr.objectStore('str0');
 var rr=st.put(a);
 rr.onsuccess=function(e){
 resolve(rr.result);
};
 rr.onerror=function(e){alert("set error"+e);reject(e)};}

})};
//-----

idb.del=function(k){
return new Promise(function(resolve, reject) {
var tr=db.transaction(['str0'],'readwrite');
var st=tr.objectStore('str0');//alert(st);
var req=st.delete(k);//alert(req);
req.onsuccess=function(e){
resolve()};
req.onerror=function(e){alert("delete error");reject(e)}})
};
//----
idb.keys=function(){//alert(33);
return new Promise(function(resolve, reject) {var tr=db.transaction(['str0'],'readonly');

var st=tr.objectStore('str0');
var req = st.getAll();//alert(55);
req.onsuccess=function(e){var rr=req.result;

resolve(rr)};
req.onerror=function(e){alert("keys error");reject(e)}})
};
//----
qq.reg.set('ind',idb);
};
//-----


