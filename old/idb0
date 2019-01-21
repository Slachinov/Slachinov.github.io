 //alert(776);
 new function(){
qq.idb={};
 
 qq.idb.get= function(db,nst,a,f){//alert(a);
var tr=db.transaction([nst],'readonly');
//alert(tr);
var st=tr.objectStore(nst);
//alert(st);
var ind=st.index("nm").get(a);
//alert(ind);
ind.onsuccess=function(e){var rst=e.target.result;
f(rst)};
ind.onerror=function(){alert("error")}};

 qq.idb.set=function(db,nst,nm,val,f){//alert(val);
var tr=db.transaction([nst],'readonly');
//alert(tr);

var st=tr.objectStore(nst);
//alert(st);
var ind=st.index("nm").get(nm);
//alert(ind);
ind.onsuccess=function(e){var rst=e.target.result;
//for(var u in rst)alert(u+"="+rst[u]);
if(!rst)upd({nm:nm,val:val}); else upd({nm:nm,val:val,ind:rst.ind}) };
 ind.onerror=function(){alert('error rr');};
 function upd(a){//alert("upd");
var  tr=db.transaction([nst],"readwrite");var st=tr.objectStore(nst);
 
 //st.clear();
 
 //alert("key-"+a.ind+a.nm);

 var rr=st.put(a);
 rr.onsuccess=function(e){
 f(rr.result);
};
 rr.onerror=function(e){alert("error"+e)};}};
 

 qq.idb.keys=function(db,nst,f){//alert(db);

var tr=db.transaction([nst],'readonly');


var st=tr.objectStore(nst);//alert(st);
var req = st.getAll();
//alert(req);
 req.onsuccess= function(){var rr=req.result;
//alert(rr);

 f(rr)
}};

 
 qq.idb.open= function(n,cb) {
var req= indexedDB.open (n);
 req.onsuccess=function(){ var db=req.result;
 cb(db)};
 req.onerror=function(e){alert("error")};
};

//----

 qq.idb.upg= function(db,a){alert("upg");
 if(db)db.close(); 
var v=db.version;v++;
var req=indexedDB.open("myDb1",v);
req.onupgradeneeded=function(event){
db=event.target.result;
for(var I=0;I<a.m.length;I++){var m=a.m[I];
if(m.com=='cr'){var k=m.keyPath||''; var ai=m.ai||false;
var st=db.createObjectStore (m.nameSt,{keyPath:k,autoIncrement:ai});
console.log('objectStore '+m.nameSt+' was created with keyPath='+m.keyPath);
console.log(m.ind);
if(m.ind&&m.ind.length)for(var y=0;y<m.ind.length;y++){var el=m.ind[y]; var nm=el.nameIn||''; var ind=el.ind||''; var un=el.u||false; var me=el.me||false;
st.createIndex( nm,ind,{unique:un,multiEntry:me});};
}
else if(m.com=='del'){console.log("deleteSt");
db.deleteObjectStore(m.nameSt);
};};a.callback();};
req.onerror=function(e){alert('error upgradeDb')};
};
 
 qq.ind={};
 qq.ind.get=function(n,f){qq.idb.get(app.ind.db, app.ind.nst,n,f)};

 qq.ind.set=function(n,v,f){qq.idb.set(app.ind.db, app.ind.nst,n,v,f)};

 qq.ind.keys=function(f){qq.idb.keys(app.ind.db,app.ind.nst,f);};
};













