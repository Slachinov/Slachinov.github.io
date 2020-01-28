(function(){
 function f(db,str){let idb={};
idb.get=function(a){
return new Promise(function(resolve, reject) {var tr=db.transaction([str],'readonly');
var st=tr.objectStore(str);
var ind=st.index("nm").get(a);
ind.onsuccess=function(e){var rst=e.target.result;
resolve(rst)};
ind.onerror=function(e){alert("get error");reject(e)}})
};
//----
idb.set=function(a,v){
return new Promise(function(resolve, reject) {
var tr=db.transaction([str],'readonly');
var st=tr.objectStore(str);
var ind=st.index("nm").get(a);
ind.onsuccess=function(e){var rst=e.target.result;
if(!rst)upd({nm:a,val:v}); else upd({nm:a,val:v,key:rst.key}) };
 ind.onerror=function(){alert('error rr');};
 function upd(a){//alert("upd");
var  tr=db.transaction([str],"readwrite");var st=tr.objectStore(str);
 var rr=st.put(a);
 rr.onsuccess=function(e){
 resolve(rr.result);
};
 rr.onerror=function(e){alert("set error"+e);reject(e)};}
})};
//-----
idb.del=function(k){
return new Promise(function(resolve, reject) {
var tr=db.transaction([str],'readwrite');
var st=tr.objectStore(str);//alert(st);
var req=st.delete(k);//alert(req);
req.onsuccess=function(e){
resolve()};
req.onerror=function(e){alert("delete error");reject(e)}})
};
//----
idb.keys=function(){//alert(33);
return new Promise(function(resolve, reject) {var tr=db.transaction([str],'readonly');
var st=tr.objectStore(str);
var req = st.getAll();//alert(55);
req.onsuccess=function(e){var rr=req.result;
resolve(rr)};
req.onerror=function(e){alert("keys error");reject(e)}})
};

qq.reg.set('ind '+str,idb);//alert(5);
};
qq.reg.set('find',f);})()

