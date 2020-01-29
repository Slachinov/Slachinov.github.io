{let b=async function(nm){//alert(nm);
let proj=await qq.reg.get('ind str0').get(nm);

let f=qq.reg.get('div toggle 1');//alert(f);
let d=qq.reg.get('panels').elements;//alert(d);
d.innerHTML='';
for(let u1 in proj.val)
{let el=f(u1,d);
let ff;//alert(u1);

if(u1=='func'){ff=async function(){let o=proj.val[u1];
let m=qq.reg.get('panels').edit;m.innerText=o[this.u];m.elem=this;}}else if(u1=='els'){ff=async function(){let ht=proj.val[u1][this.u]['html'];let f=qq.reg.get('htmltotable');let d=qq.reg.get('panels').propertes;f(ht,d);}};//alert(f);
for(let u in proj.val[u1])
{let el0=qq.ce({tag:'div',style:{border:'1px solid black',background:'lightgray'},event:{click:ff},it:u,parent:el});el0.u=u;}
}
//--
};
//====
qq.reg.set('els',b);
}