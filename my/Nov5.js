{alert(77);
let gh,ed,all, inp,inpcb,fed,fall, fgh,fb,fs={style:{'font-size':'20px'}},sw=110;;

let t=qq.ce({tag:'div', style:{position :'absolute',top:'0px', background :'yellow'},event: {click:async function (){}},});

let b=qq.ce({tag:'div', style:{position :'absolute',bottom:'0px',}});

fed=function (){ed=qq.ce({tag:'div', style:{position :'absolute',top:t.offsetHeight+2+'px',left:'0px',right :'0px',bottom:b.offsetHeight+2+'px', background :'lightgreen',overflow :'auto','font-size':'22px'}, attr:{contentEditable:true},})};

fall=function (){all=qq.ce({tag:'div', style:{position :'absolute',top:t.offsetHeight+2+'px',left:'0px',right :'0px',bottom:b.offsetHeight+2+'px', background :'lightgray',overflow :'auto','font-size':'22px','z-index':1}, attr:{},});
all.clear=function (){all.innerHTML='';}};

fgh= async function (){
qq.ce(fs,{tag:'button',event:{click:function (){ed.innerText =qq.ls(inp.value)} },it:'load',parent :t});

qq.ce(fs,{tag:'button',event:{click:function (){all.show();all.innerHTML='';
for(let i=0; i<localStorage.length; i++) {
let key = localStorage.key(i);
qq.ce({tag:'div',style:{border:'1px solid black',background :'orange'},prop:{k:key},event:{click: function (){all.hide();inp.value=this.k;ed.innerText =qq.ls(this.k);}}, it:key,parent:all})}
} },it:'all',parent :t});

inp=qq.ce(fs,{tag:'input',style:{width:sw+'px'},parent:t});

inpcb=qq.ce({tag:'input',attr:{type:'checkbox'},parent:t});

qq.ce(fs,{tag:'button', style:{}, event:{click: function (){let v=inp.value;let i1=1;
for(let i=0; i<localStorage.length; i++) {let key=localStorage.key(i);
let k0;if(inpcb.checked){k0= qq.ls(key);}else{k0=key};
let k=k0.indexOf(v);if(k>-1){if(i1){i1=0;all.clear();all.show()};qq.ce({tag:'div',style:{border:'1px solid black',background :'cyan'},prop:{k:key},event:{click: function (){all.hide();inp.value=this.k;ed.innerText=qq.ls(inp.value);
}},it:key,parent:all});}};
}},it: 'se.h' , parent :t});

qq.ce(fs,{tag:'button', style:{background: 'red'}, event:{click: function (){ localStorage[inp.value]=ed.innerText;}},it: 'save' , parent :t});

qq.ce(fs,{tag:'button', style:{background: 'red'}, event:{click: function (){all.clear();all.show();let aa={tag:'div',style:{position :'absolute',background :'gray',top:'100px','font-size':'50px'},parent:all,it:'no'};
qq.ce(aa,{style:{right :'100px'},event:{click :function (){all.hide();}}});
qq.ce(aa,{style:{left:'100px'}, event:{click :function (){all.hide();localStorage.removeItem(inp.value);}},it:'yes'});}},it: 'del' , parent :t});


qq.ce(fs,{tag:'button', style:{background: 'red'}, event:{click: async function (){await qq.repo.write('my/'+inp.value,ed.innerText)}},it: 'save gh' , parent :b});};

fb=function (){
qq.ce(fs,{tag:'button', style:{}, event:{click: async function (){eval(ed.innerText)}},it: 'eval' , parent :b});

qq.ce(fs,{tag:'button', style:{}, event:{click: async function (){ed.innerHTML='';}},it: 'clear' , parent :b});};

(async function (){
gh=new qq.f.github({token: qq.ls('token')});qq.repo=gh.getrepo('Slachinov',
'Slachinov.github.io');fgh();fb();fed();fall();all.hide();
//alert(gh);
})();
};
