{let p3;
let pan=qq.ce({tag:'div',style:{position:'absolute',top:'0px',left:'0px',right:'0px',bottom:'0px', background:'lightgray'}});
let p2=qq.ce({tag:'div',parent:pan});
document.body.ipan=pan;
qq.ce({tag:'button',it:'click',event:{click:function(){qq.idb.f('my',{op:'init'});qq.idb.f('locqq0',{op:'init'});qq.idb.f('locqq1',{op:'init'});}}, parent:pan});






qq.ce({tag:'button',parent:pan,
it:'list',style:{'font-size':'25px'},event:{click:async function(){
p2.innerHTML='';
let m=await  qq.idb.getAll(qq.idb.db, 'st44');//alert(m.length);
for(let i=0;i<m.length;i++){let a=m[i];//alert(a);
qq.ce({tag:'div' ,parent:p2, it:'name:'+a[0]+';v:'+a[1].v,style:{background:'green',border:'1px solid black'}});
let db=qq.idb.dbs[a[0]];
if(db){
let sts=db.objectStoreNames;
//alert('l='+sts.length);
for(let i0=0;i0<sts.length;i0++)qq.ce({it:sts[i0],parent:p2,tag:'div',style:{background:'yellow',border:'1px solid black'}});};

}}}});


qq.ce({tag:'button',parent:pan,
it:'click3',event:{click:async function(){let m=await  qq.idb.getAll(qq.idb.db, 'bases');//alert(m.length);
for(let i=0;i<m.length;i++){let a=m[i][0];for (let u in a)
qq.ce({tag:'div' ,parent:p2, it:u+':'+a[u],style:{background:'lightblue',border:'1px solid blue'}});

}}}});
//---
qq.ce({tag:'br',parent:pan});
qq.ce({tag:'span',it:'bd',parent:pan});
let bd=qq.ce({tag:'input',parent:pan,style:{width:'60px'}});
qq.ce({tag:'span',it:'store',parent:pan});

let st=qq.ce({tag:'input',parent:pan,style:{width:'60px'}});
qq.ce({tag:'span',it:'keyP',parent:pan});
let kp =qq.ce({tag:'input',parent:pan,style:{width:'60px'}});


qq.ce({tag:'span',it:'ai',parent:pan});
let ai =qq.ce({tag:'input',attr:{type:'checkbox'},parent:pan,style:{}});

qq.ce({tag:'br',parent:pan});
qq.ce({tag:'button',it:'delete store',event:{click:async function(){qq.idb.f(bd.value,{st:st.value,op:'delst'})}},style:{color:'red','font-size':'20px'}, parent:pan});
//--
qq.ce({tag:'button',it:'create store',event:{click:async function(){
qq.idb.f(bd.value,{st:st.value,op:'crst',keyp:kp.value, ai:ai.checked})}},style:{color:'blue','font-size':'20px'}, parent:pan});
//====


 p3=qq.ce({tag:'div',parent:pan});





};
