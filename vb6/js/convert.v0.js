{//alert(100);

var cre=async function (ht){//alert(1);
let div=document.createElement('div');
let a={};
div.innerHTML=ht;//alert(div.outerHTML);
let els=div.getElementsByTagName('qs');//alert(els.length);
for(let i=0;i<els.length;i++)
{//alert(els[i]);
let nm=els[i].getElementsByTagName('qn')[0].innerText;//alert(nm);
if(nm!='other')a[nm]={};
let qf=els[i].getElementsByTagName('qf')[0];//alert(qf);
let ggs=qf.getElementsByTagName('gg');
for(let i1=0;i1<ggs.length;i1++)
{
let p=ggs[i1].getElementsByTagName('gp')[0].innerText;//alert(p);
let ell=ggs[i1].getElementsByTagName('gv')[0];
let v=ell.innerText;//alert(v);//alert(nm);
//if(nm=='other'){a[p]=v;};
//if(nm=='style'){a[nm][p]=v;};
let b=a;
if(nm=='other'){}else {b=a[nm]};
if((nm=='event')||ell.getAttribute('t')){
var u=`b['`+p+`']=`+v;eval(u);} else{b[p]=v;};//alert(a);
}};return a
};
//---
qq.reg.set('htmltoskin',cre);
//alert(cre);
};
//--------------------------------------------------------
{
async function  tabletohtml(){let bb={};
let elem=qq.reg.get('panels').propertes;
let html=qq.ce({tag:'qq',parent:'none'});
let cn=elem.childNodes;//alert(cn);alert(cn.length);
for(let i=0;i<cn.length;i++)
{let txt=cn[i].childNodes[0].innerText;
let gs=qq.ce({tag:'qs',parent:html});
let gn=qq.ce({tag:'qn',it:txt,parent:gs});
let gf=qq.ce({tag:'qf',parent:gs});
let els=cn[i].childNodes[1].childNodes;
for(let i1=0;i1<els.length;i1++)
{let ell=els[i1].childNodes;
let p=ell[0].innerText;
let v=ell[1].innerText;if((txt=='other')&&(p=='name'))bb[p]=v;
if((txt=='other')&&(p=='project'))bb[p]=v;
let gg=qq.ce({tag:'gg',parent:gf});
let gp=qq.ce({tag:'gp',it:p,parent:gg});
let gv=qq.ce({tag:'gv',it:v,parent:gg});
if((txt=='event')||ell[1].getAttribute('t')){gv.setAttribute('t',1)};
}
};
//alert(html.outerHTML);
let prj1=await qq.reg.get('ind str0').get(bb.project);//alert(prj1);alert(prj1.val.els);
let nmm=bb.name;
//alert(nmm);//let prj={};prj.els={};
let prj;if(prj1){prj=prj1.val;}else{alert(9999);prj={};prj.els={};};


prj.els[nmm]={};prj.els[nmm]['html']=html.outerHTML;
//prj.els[bb.name]['html']=html.outerHTML;
await qq.reg.get('ind str0').set(bb.project,prj);//alert('set');
return html.outerHTML
};
qq.reg.set('tabletohtml',tabletohtml)
//---
};
//---------------------------------------------------------
{let beg=async function (ht,pelem){
pelem.innerHTML='';
let div=document.createElement('div');
let aa={};
div.innerHTML=ht;//alert(div.outerHTML);
let els=div.getElementsByTagName('qs');//alert(els.length);
for(let i=0;i<els.length;i++)
{//alert(els[i]);
let nm=els[i].getElementsByTagName('qn')[0].innerText;//alert(nm);
aa[nm]=obj(nm,pelem);
let qf=els[i].getElementsByTagName('qf')[0];//alert(qf);
let ggs=qf.getElementsByTagName('gg');
for(let i1=0;i1<ggs.length;i1++)
{
let p=ggs[i1].getElementsByTagName('gp')[0].innerText;
let v=ggs[i1].getElementsByTagName('gv')[0].innerText;
cr(p,v,aa[nm])
};};
function obj(txt,par){
let bs=qq.f.crElem({tag :'div',style:{ background:'green','font-size':'15px'},event:{click:async function(e){}},parent:par});
//---
let el2;
let el1=qq.f.crElem({tag :'div',style:{border:'1px solid black', background:'orange',left:'1px',right:'1px','font-size':'15px'},event:{click:async function(e){el2.toggle();}},it:txt,parent:bs});
el2=qq.f.crElem({tag :'div',style:{ background:'blue',left:'1px',right:'1px','font-size':'15px'},event:{click:async function(e){}},parent:bs});return el2
};
//-----------------
function cr(txt,txt1,par){
let bs=qq.f.crElem({tag :'div',style:{ background:'red','font-size':'15px'},event:{click:async function(e){}},parent:par||elem});bs.v=1;
//---
let el1=qq.f.crElem({tag :'div',style:{border:'1px solid black', background:'gray',left:'1px',right:'1px','font-size':'15px'},event:{click:async function(e){el2.toggle();}},it:txt,parent:bs});
//---
let el2=qq.f.crElem({tag :'div',attr:{contentEditable:true},style:{border:'1px solid black', background:'lightgray',left:'1px',right:'1px','font-size':'15px'},event:{dblclick:async function(e){let pan= qq.reg.get('panels').edit;pan.innerText=txt1;pan.elem=this.elem}},it:txt1,parent:bs});el2.elem=el2;};
//----
};
qq.reg.set('htmltotable',beg);
};

//--------------------------------------------------------------------------------