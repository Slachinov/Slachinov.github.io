class qqGithub extends HTMLElement {
constructor() {
super();
let that=this;
var gh; 
gh=new qq.f.github({username :localStorage['username'], password:localStorage['password']});
let inp,edit,el,bts;
el=qq.f.crElem({tag:"div",style:{width:document.documentElement.clientWidth-50+'px',height:document.documentElement.clientHeight-50+'px',overflow:'hidden',background:'orange'}, parent:that});
bts=qq.f.crElem({tag:"div",style:{left:'0px',right:'0px',top:'0px',background:'yellow'}, parent:el,it:"Github "});
let h0=el.offsetHeight;let h1=bts.offsetHeight;
edit=qq.f.crElem({tag:"div",attr:{contentEditable:true},style:{'font-size':'18px',left:'0px',right:'0px',height:(h0-h1)+'px',background:'lightgreen',overflow:'auto'}, parent:el});
let par={parent:bts};
let tmb={tag:'button',parent:bts};
let red={style:{background:'red'}};
let auth=qq.f.crElem(tmb,{it:'auth',event:{click:async function(){let main=qq.f.crElem({tag:"div",style:{position:'absolute','z-index':95,top:'0px',left:'0px',width:'60%',height:'60%',overflow:'hidden',background:'lightgray'}, it:'that'});}}});
inp=qq.f.crElem({tag:'input'},par);
//------------GET------------------
let get=qq.f.crElem(tmb,{it:'get',event:{click:async function(){
qq.f.crElem(edit,{attr:{contentEditable:false},ih:''});edit.innerHTML='';
let repo= gh.getrepo('Slachinov','slachinov.github.io');
let tree=await repo.gettree();let rep=tree;edit.tree=tree;
//--
for(let i=0;i<rep.length;i++){
qq.f.crElem({tag:'div',style:{background:'lightgray', border:'1px solid black'},prop:{path:rep[i].path},event:{click:async function(){let repo=gh.getrepo('Slachinov','slachinov.github.io');qq.f.crElem(edit,{attr:{contentEditable:true}});let n=this.path;let fail=await repo.read(n);inp.value=n;edit.innerText=fail;}},it:rep[i].path,parent:edit});
}; 
//--
}}});

//======================
let get2=qq.f.crElem(tmb,{it:'!__',event:{click:async function(){if(!edit.tree)return;let rep=edit.tree;qq.f.crElem(edit,{attr:{contentEditable:false},ih:''});edit.innerHTML='';
//---
for(let i=0;i<rep.length;i++){
qq.f.crElem({tag:'div',style:{background:'lightgray', border:'1px solid black'},prop:{path:rep[i].path},event:{click:async function(){let repo=gh.github.getRepo('Slachinov','slachinov.github.io');qq.f.crElem(edit,{attr:{contentEditable:false}});let n=this.path;repo.read('master',n,function(err,b){if(err)alert(err);if(b)edit.innerText=b;})}},it:rep[i].path,parent:edit});
}; 
//--
 }}});
//===========WRITE=========
let set=qq.f.crElem(tmb,red,{it:'write',event:{click:async function(){
//--
let repo=gh.getrepo('Slachinov','slachinov.github.io');let n=inp.value;alert(n);
let f=await repo.write(n,edit.innerText);alert(f);
//--
}}});
//======================================
let cre=qq.f.crElem(tmb,red,{it:'create',event:{click:function(){}}});
//=========DELETE================
let del=qq.f.crElem(tmb,red,{it:'del',event:{click:async function(){let repo=gh.getrepo('Slachinov','slachinov.github.io');let n=inp.value;alert(n);
let f=await repo.remove(n);alert(f);}}});
//==========MOVE========================
let move=qq.f.crElem(tmb,{it:'move',event:{click:async function(){}}});
qq.f.crElem(par,{tag:'br'});
qq.f.crElem(par,{tag:'span',it:' editor '});
let cl=qq.f.crElem(tmb,{it:'clear',event:{click:function(){edit.innerHTML='';}}});
let ev=qq.f.crElem(tmb,{it:'eval',event:{click:function(){eval(edit.innerText);}}});
//--

}};