{
let par=qq.reg.get('panels').top;

let a={tag:'button',style:{background:'green'},parent:par};
let r={style:{background:'red'}};
qq.ce(a,{event:{click:async function(){let aa={};
let pn=qq.reg.get('panels').top;//alert(pn);
//pn.innerHTML='';

let f=qq.reg.get('htmltoskin');//alert(f);
let c=qq.reg.get('current');let ppp=c.project;
let v=await qq.reg.get('ind').get(ppp);//alert(v);

for(let u in v.val.els){let ht=v.val.els[u]['html'];
let sk=await f(ht);if(!sk.par){sk.parent=pn;}else {sk.parent=aa[sk.par];};
let el=qq.ce(sk);aa[sk.name]=el;let elems=qq.reg.get('es');elems[sk.name]=el;
}
}},it:'Run project'});
qq.ce(a,{event:{click:function(){let mod=qq.reg.get('modal');alert(mod);
mod.f1();}},it:'new Project'});
qq.ce(a,{event:{click:function(){qq.reg.get('modal').v='fload';qq.reg.get('modal').show(); qq.reg.get('fmodal1')(this.innerText);qq.reg.get('fmodal2')()}},it:'load Project'});
qq.ce(a,{event:{click:async function(){let f= qq.reg.get('tabletohtml');let ht=await f();}},it:'save Project'},r);
qq.ce(a,{event:{},it:'delete Project'},r);
};