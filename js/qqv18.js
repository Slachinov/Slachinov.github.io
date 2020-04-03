//-------begin qq
window.qq={};
var app={};
app.els={};
qq.vers=1;
qq.about={};
qq.about.author="Sergey Lachinov";
qq.about.github="";
qq.f={};
qq.o={};
qq.app={};
qq.els={};
qq.thread={};

qq.f.isObject=function(o){if(!o)return false; 
if((typeof(o=='object'))&&(o.toString()=='[object Object]')&&(o.constructor()=='[object Object]'))return true;
else return false};

qq.f.extend=function(destination, source) {
    for (var property in source)
{if(qq.f.isObject(source[property])){if((!destination[property])&(!qq.f.isObject(destination[property])))destination[property]={};qq.f.extend(destination[property], source[property])}else {destination[property] = source[property]};}
    return destination;
  };

qq.f.getStyle=function(style,elem){return  document.defaultView.getComputedStyle(elem,null).getPropertyValue(style)};
//------------
qq.skin={};
qq.skin.inputtext={prop:{get:function(){return this.value;},set:function(a){this.value=a},clear:function(){this.value='';}}};
qq.skin.panel={prop:{clear:function(){this.innerHTML=''},get:function(html){if(html)return this.innerHTML;return this.innerText},set:function(v,html){if(html)this.innerHTML=v;else this.innerText=v;}}};
qq.skin.textarea={};
qq.skin.f=function(e){if((e.tagName=='INPUT')&&(!e.getAttribute('type')||(e.getAttribute('type')=='text'))){for(var u in qq.skin.inputtext.prop)
e[u]=qq.skin.inputtext.prop[u]}else if(e.tagName=='SPAN'||'DIV'){for(var u in qq.skin.panel.prop)
e[u]=qq.skin.panel.prop[u]};return e}
//--------

qq.f.createSkin=function(){
var skin={};
var i0=1;
var m=arguments[0];
var l=m.length;
if(!l)return {}; 
if(qq.f.isObject(m[0]))i0=0;
for(var i=i0;i<m.length;i++)
qq.f.extend(skin,m[i]);
return skin

};



qq.f.crElem=function(){//alert (9);
var skin=qq.f.createSkin(arguments);
var el;var p=0;
if(qq.f.isObject(arguments[0]))
el=document.createElement(skin.tag);
else {el=arguments[0];p=1};
qq.f.extend(skin,eventBase);


if(skin.style)for(var u in skin.style){if(typeof(skin.style[u])=='function') {el.style[u]=skin.style[u]();}else el.style[u]=skin.style[u]};

if(skin.attr)for(var u in skin.attr){el.setAttribute(u,skin.attr[u])};

if(skin.event)for(var u in skin.event)
{//alert(3);alert(u);alert(skin.event[u]);
if((u=='press')||(u=='pan')){//alert(skin.event[u]);
el[u]=skin.event[u];
( new Hammer (el)).on(u,function (e){ var t=e.type;var el=e.target;while(!el[t])el=el.parentNode;el[t](e)});}else 
el.addEventListener(u,skin.event[u],false);};

if(skin.prop)for(var u in skin.prop)
{el[u]=skin.prop[u]};

if(skin.ih)el.innerHTML=skin.ih;
if(skin.it)el.innerText =skin.it;
if(skin.val)el.value=skin.val;
if(!p){
var par;

if((skin.parent!='none')&&!skin.insb&&!skin.insa){
par=skin.parent||document.body;
par.appendChild(el);};

if(skin.insb){
var elb=skin.insb;
par=elb.parentNode;
par.insertBefore (el,elb);
};

if(skin.insa){par=skin.insa.parentNode; 
var elb=skin.insa.nextSibling;
if(elb)par.insertBefore (el,elb);else
par.appendChild (el);
}
el.parent=par;
};
if(skin.init){skin.init(el);};
el=qq.skin.f(el);
el.skin=skin;
return el;
};
var eventBase={prop:{hide:function(){this.style.display='none'},show:function(){this.style.display='block';},toggle:function(){if(this.style.display!='none')this.hide();else this.show()},getStyle:function(style){return document.defaultView.getComputedStyle(this,null).getPropertyValue(style)}}};
//----

qq.ce=qq.f.crElem;
qq.freg=function(){let r={};this.get=function(n){return r[n]};this.set=function(n,p){r[n]=p;};this.setp=function(){};};
qq.reg=new qq.freg();
qq.sh={};
qq.sh.panel =function (){ var b=qq.f.createSkin(arguments);return qq.f.crElem ({tag:'div',style:{top:'200px',left:'2px',width:'80%',height:'20%',position:'absolute', background:'lightgray' }},b);};

qq.loadscript=function(url) {return new Promise(function(resolve, reject) {
var el=document.createElement('script');
el.src=url;
el.addEventListener('load',function(){resolve(url)},false);
el.addEventListener('error',function(e){alert('err');alert(e);reject(e)},false);
document.head.appendChild(el);})};
qq.f.initgithub=async function(){return new Promise(function(resolve, reject) {
async function f(){
let url;if(!window.Github) url=await qq.loadscript('https://Slachinov.github.io/js/github.js');if(!qq.f.github)url=await qq.loadscript('https://Slachinov.github.io/js/qq.github.v1.js');let gh=new qq.f.github({username :localStorage['username'], password:localStorage['password']});resolve(gh)};f();
})};
