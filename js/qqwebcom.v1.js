class qqLocalstorage extends HTMLElement {
constructor() {
super();
let that=this;
let inp,edit,el,bts;
el=qq.f.crElem({tag:"div",style:{width:'50%',height:'200px',overflow:'hidden',background:'orange'}, parent:that});
bts=qq.f.crElem({tag:"div",style:{left:'0px',right:'0px',top:'0px',background:'yellow'}, parent:el,it:"localStorage."});
let h0=el.offsetHeight;let h1=bts.offsetHeight;
edit=qq.f.crElem({tag:"div",attr:{contentEditable:true},style:{'font-size':'18px',left:'0px',right:'0px',height:(h0-h1)+'px',background:'lightgreen',overflow:'auto'}, parent:el});
let par={parent:bts};
let tmb={tag:'button',parent:bts};
let red={style:{background:'red'}};
inp=qq.f.crElem({tag:'input'},par);
let get=qq.f.crElem(tmb,{it:'get',event:{click:function(){edit.innerText=localStorage[inp.value];}}});
let set=qq.f.crElem(tmb,red,{it:'set',event:{click:function(){localStorage[inp.value]=edit.innerText}}});
let del=qq.f.crElem(tmb,red,{it:'del',event:{click:function(){localStorage.removeItem([inp.value]);edit.innerHTML='';inp.value='';}}});
let cl=qq.f.crElem(tmb,{it:'clear',event:{click:function(){edit.innerHTML='';}}});
let all=qq.f.crElem(tmb,{it:'all',event:{click:function(){edit.setAttribute('contentEditable',false);inp.value='';edit.innerText='';for(let u in localStorage){qq.f.crElem({tag:"div",style:{border:'1px solid black',background:'orange'},prop:{u:u},event:{click:function(){edit.setAttribute('contentEditable',true);inp.value=this.u;edit.innerText=localStorage[this.u]}},it:u,parent:edit});};}}});
}};
