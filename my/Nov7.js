{//alert(77);
let t,b,ed,all,f={},fsv='22px',fsed='26px',sw='240px';;
let fs={style:{'font-size':fsv}};
ed=qq.ce({tag:'div'});

t=qq.ce({tag:'div', style:{position :'absolute',top:'0px', background :'yellow'},prop:{clear:function (){this.innerHTML='';}}});

b=qq.ce({tag:'div', style:{position :'absolute',bottom:'0px' }});

f.ed=function (){ ed=qq.ce(ed,{style:{position :'absolute',top:t.offsetHeight+2+'px',left:'0px',right :'0px',bottom:b.offsetHeight+2+'px', background :'lightgreen',overflow :'auto','font-size':'22px'}, attr:{contentEditable:true},})};

f.all=function (){all=qq.ce({tag:'div', style:{position :'absolute',top:t.offsetHeight+2+'px',left:'0px',right :'0px',bottom:b.offsetHeight+2+'px', background :'lightgray',overflow :'auto','font-size':'22px','z-index':1}, attr:{},});
all.clear=function (){all.innerHTML='';};all.hide();};

f.ls= async function (){
t.clear();
let inp;t.style.background='yellow';
qq.ce(fs,{tag:'button',event:{click:function (){inp.value='';} },it:'cl',parent :t});


inp=qq.ce(fs,{tag:'input',style:{width:sw},parent:t});


qq.ce(fs,{tag:'button',event:{click:function (){ed.innerText =qq.ls(inp.value)} },it:'load',parent :t});

qq.ce(fs,{tag:'button',event:{click:function (){all.show();all.innerHTML='';
for(let i=0; i<localStorage.length; i++) {
let key = localStorage.key(i);
qq.ce({tag:'div',style:{border:'1px solid black',background :'orange'},prop:{k:key},event:{click: function (){all.hide();inp.value=this.k;ed.innerText =qq.ls(this.k);}}, it:key,parent:all})}
} },it:'all',parent :t});

let inpcb=qq.ce({tag:'input',attr:{type:'checkbox'},parent:t});

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


qq.ce(fs,{tag:'button', style:{background: 'red'}, event:{click: async function (){await qq.repo.write('my/'+inp.value,ed.innerText)}},it: 'save gh' , parent :t});};
//-----###
f.gh= function (){
t.clear();
let inp=qq.ce({tag:'input',parent:t});
t.style.background='orange';
qq.ce(fs,{tag:'button',event:{click:async function (){let a=await qq.repo.gettree();all.clear();all.show();
a.forEach(function (e){qq.ce({tag:'div', style:{border: '1px solid black'}, event:{click: async function (){all.hide();inp.value=this.p;let a=await qq.repo.read(this.p);ed.innerText=a;}},prop:{p:e.path},parent:all, it:e.path});});
}},it:'all',parent :t});


qq.ce(fs,{tag:'button', style:{}, event:{click: async function (){all.clear();all.show();qq.ce({tag:'a',parent:all,it:inp.value,attr:{href:'https://slachinov.github.io/'+inp.value}})}},it: 'hrf' , parent :t});


qq.ce(fs,{tag:'button', style:{background :'red'}, event:{click: async function (){await qq.repo.write(inp.value,ed.innerText);}},it: 'write' , parent :t});


};
//--=---=##
f.b=function (){
qq.ce(fs,{tag:'button', style:{}, event:{click: async function (){eval(ed.innerText)}},it: 'eval' , parent :b});

qq.ce(fs,{tag:'button', style:{}, event:{click: async function (){ed.innerHTML='';}},it: 'clear' , parent :b});


qq.ce(fs,{tag:'button', style:{}, event:{click: async function (){f.ls();f.ed();}},it: 'localS' , parent :b});

qq.ce(fs,{tag:'button', style:{}, event:{click: async function (){f.gh();f.ed();}},it: 'github' , parent :b});

};

(async function (){
 let gh=new qq.f.github({token: qq.ls('token')});qq.repo=gh.getrepo('Slachinov','Slachinov.github.io');f.all();f.ls();f.b();f.ed();
//alert(qq.repo);
})();
};