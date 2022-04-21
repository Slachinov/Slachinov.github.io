//-------begin qq
window.qq={};
qq.f={};
qq.o={};
qq.f.isObject=function(o){if(!o)return false;
if((typeof(o=='object'))&&(o.toString()=='[object Object]')&&(o.constructor()=='[object Object]'))return true;
else return false};

qq.f.extend=function(destination, source) {
for (var property in source)
{if(qq.f.isObject(source[property])){if((!destination[property])&(!qq.f.isObject(destination[property])))destination[property]={};qq.f.extend(destination[property], source[property])}else {destination[property] = source[property]};}
return destination;
};

qq.f.getStyle=function(style,elem){return document.defaultView.getComputedStyle(elem,null).getPropertyValue(style)};

qq.f.createSkin=function(){
var skin={};
var i0=1;
var m=arguments[0];
var l=m.length;
if(!l)return {};
if(qq.f.isObject(m[0]))i0=0;
for(var i=i0;i<m.length;i++)
qq.f.extend(skin,m[i]);
return skin};

qq.f.crElem=function(){
let eventBase={prop:{hide:function(){this.style.display='none'},show:function(){this.style.display='block';},toggle:function(){if(this.style.display!='none')this.hide();else this.show()},getStyle:function(style){return document.defaultView.getComputedStyle(this,null).getPropertyValue(style)}}};
//------
var skin=qq.f.createSkin(arguments);
var el;var p=0;
if(qq.f.isObject(arguments[0]))
el=document.createElement(skin.tag);
else {el=arguments[0];p=1};
qq.f.extend(skin,eventBase);

if(skin.qclass){let b=skin.qclass;
let t=b.split(' ');alert(t.length); t.forEach (function (cc){let c=cc.trim();if(!c)return;let v;
let m=ff(c);alert(m);
if(m[1])v=qq.o[m[0]](m[1]);else v=qq.o[m[0]](); qq.f.extend(skin,v);});
function ff(aa){let a =aa.trim();
if(a.split('(').length==1){return [a]}else{let f=a.split('(')[0].trim();
let n=a.split('(')[1].split(')')[0].trim();
let b;let r=Number(n);
if(r)b=r;else b=n;
return [f,b]}};

};

if(skin.style)for(var u in skin.style){if(typeof(skin.style[u])=='function') {el.style[u]=skin.style[u]();}else el.style[u]=skin.style[u]};

if(skin.attr)for(var u in skin.attr){el.setAttribute(u,skin.attr[u])};

if(skin.event)for(var u in skin.event)
{//alert(3);alert(u);alert(skin.event[u]);
if((u=='press')||(u=='pan')){//alert(skin.event[u]);
el[u]=skin.event[u];
( new Hammer (el)).on(u,function (e){ var t=e.type;var el=e.target;while(!el[t])el=el.parentNode;el[t](e)});}else
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
if(skin.class)el.className=skin.class;
el.skin=skin;
return el;
};


//--------
qq.ce=qq.f.crElem;
qq.freg=function(){let r={};this.get=function(n){return r[n]};this.set=function(n,p){r[n]=p;};this.setp=function(){};};
qq.reg=new qq.freg();

qq.ls=function (a){return localStorage[a]};
qq.ev=function (a){let t="var f="+qq.ls(a);eval(t);return f};

qq.isobj=qq.f.isObject;

qq.loadscript=function(url) {return new Promise(function(resolve, reject) {
var el=document.createElement('script');
el.src=url;
el.addEventListener('load',function(){resolve(url)},false);
el.addEventListener('error',function(e){alert('err');alert(e);reject(e)},false);
document.head.appendChild(el);})};



