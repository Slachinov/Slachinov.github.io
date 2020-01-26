{function obj(txt,par){
let bs=qq.f.crElem({tag :'div',style:{ background:'green','font-size':'15px'},event:{click:async function(e){}},parent:par});
//---
let el2;
let el1=qq.f.crElem({tag :'div',style:{ background:'orange',left:'1px',right:'1px','font-size':'15px'},event:{click:async function(e){el2.toggle();}},it:txt,parent:bs});
el2=qq.f.crElem({tag :'div',style:{ background:'blue',left:'1px',right:'1px','font-size':'15px'},event:{click:async function(e){}},parent:bs});return el2
};
qq.reg.set('div toggle 1',obj);

};
