// ------- begin qqwindow
window.qq = {};
qq.f = {};


qq.o={ bg:function(a){//alert(1);
 return {style:{background:a}} }, r:function(a){return {style:{right :a+'px'}}},
t:function(a){return {style:{top :a+'px'}}},b:function(a){return {style:{bottom :a+'px'}}},w:function(a){return {style:{ width:a+'px'}}},
h:function(a){return {style:{height :a+'px'}}},
l: function(a){return {style:{left:a+'px'}}},
fs:function(a){return {style:{'font-size':a+'px'}}} ,
zi:function(a){return {style:{'z-index':a}}},abs:function(a){return {style:{'position':'absolute'}}} ,div:function(a){return{tag:'div'}} ,but:function(a){return{tag:'button'}} ,inp:function(a){return{tag:'input'}} ,
//==

abs:function(a){return {style:{'position':'absolute'}}}
//==
};
qq.f.isObject = function(o) {
  return o && typeof o === 'object' && o.toString() === '[object Object]';
};


qq.f.extend = function(destination, source) {
  for (let property in source) {
    if (qq.f.isObject(source[property])) {
      if (!destination[property] || !qq.f.isObject(destination[property])) {
        destination[property] = {};
      }
      qq.f.extend(destination[property], source[property]);
    } else {
      destination[property] = source[property];
    }
  }
  return destination;
};


qq.f.getStyle = function(style, elem) {
  return document.defaultView.getComputedStyle(elem, null).getPropertyValue(style);
};


qq.f.createSkin =function(){
var skin={};
var i0=1;
var m=arguments[0];
var l=m.length;
if(!l)return {};
if(qq.f.isObject(m[0]))i0=0;
for(var i=i0;i<m.length;i++)
qq.f.extend(skin,m[i]);
//==
if(skin.qclass){let b=skin.qclass;
let t=b.split(' ');
//alert(t.length);
t.forEach (function (cc){let c=cc.trim();if(!c)return;let v;
let m=ff(c);
//alert(m);
if(m[1])v=qq.o[m[0]](m[1]);else v=qq.o[m[0]](); qq.f.extend(skin,v);});
function ff(aa){let a =aa.trim();
if(a.split('(').length==1){return [a]}else{let f=a.split('(')[0].trim();
let n=a.split('(')[1].split(')')[0].trim();
let b;let r=Number(n);
if(r)b=r;else b=n;
return [f,b]}};
};

//==
return skin};
//======
qq.f.crElem = function() {
  let skin = qq.f.createSkin(arguments);
  let el;
  let p = 0;


  if (qq.f.isObject(arguments[0])) {
    el = document.createElement(skin.tag || 'div');
  } else {
    el = arguments[0];
    p = 1;
  }


  let eventBase = {
    prop: {
      hide: function() { this.style.display = 'none'; },
      show: function() { this.style.display = 'block'; },
      toggle: function() {
        this.style.display = this.style.display !== 'none' ? 'none' : 'block';
      },
      getStyle: function(style) {
        return qq.f.getStyle(style, this);
      }
    }
  };


  qq.f.extend(skin, eventBase);


  if (skin.style) for (let u in skin.style) el.style[u] = skin.style[u];
  if (skin.attr) for (let u in skin.attr) el.setAttribute(u, skin.attr[u]);
  if (skin.class) el.className = skin.class;
  if (skin.ih) el.innerHTML = skin.ih;
  if (skin.it) el.innerText = skin.it;
  if (skin.val) el.value = skin.val;
  if (skin.prop) for (let u in skin.prop) el[u] = skin.prop[u];


  if (skin.event) {
    for (let u in skin.event) {
      if (["longtap", "press", "swipeup", "swipedown", "swipeleft", "swiperight"].includes(u)) {
        qq.f._gesture(el, u, skin.event[u]);
      } else {
        el.addEventListener(u, skin.event[u], false);
      }
    }
  }


  if (!p) {
    let par;
    if ((skin.parent !== 'none') && !skin.insb && !skin.insa) {
      par = skin.parent || document.body;
      par.appendChild(el);
    }
    if (skin.insb) {
      let elb = skin.insb;
      par = elb.parentNode;
      par.insertBefore(el, elb);
    }
    if (skin.insa) {
      par = skin.insa.parentNode;
      let elb = skin.insa.nextSibling;
      if (elb) par.insertBefore(el, elb);
      else par.appendChild(el);
    }
    el.parent = par;
  }


  if (skin.init) skin.init(el);


  el.skin = skin;
  return el;
};


qq.f._gesture = function(el, type, handler) {
  let timer, startX, startY, isMoving = false;
  const threshold = 150;
  el.style.touchAction = 'none';


  el.addEventListener('pointerdown', e => {
    startX = e.clientX;
    startY = e.clientY;
    isMoving = false;


    if (type === 'press') {
      timer = setTimeout(() => handler.call(el, e), 100);
    } else if (type === 'longtap') {
      timer = setTimeout(() => handler.call(el, e), 500);
    }
  });


  el.addEventListener('pointermove', e => {
    let dx = e.clientX - startX;
    let dy = e.clientY - startY;
    if (Math.abs(dx) > 10 || Math.abs(dy) > 10) {
      isMoving = true;
      clearTimeout(timer);
    }
  });


  el.addEventListener('pointerup', e => {
    clearTimeout(timer);
    if (!isMoving && (type === 'press' || type === 'longtap')) return;


    let dx = e.clientX - startX;
    let dy = e.clientY - startY;


    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > threshold && type === 'swiperight') handler.call(el, e);
      else if (dx < -threshold && type === 'swipeleft') handler.call(el, e);
    } else {
      if (dy > threshold && type === 'swipedown') handler.call(el, e);
      else if (dy < -threshold && type === 'swipeup') handler.call(el, e);
    }
  });
};


qq.loadscript = function(url) {
  return new Promise(function(resolve, reject) {
    let el = document.createElement('script');
    el.src = url;
    el.addEventListener('load', () => resolve(url), false);
    el.addEventListener('error', e => reject(e), false);
    document.head.appendChild(el);
  });
};

alert(11);
qq.ce = qq.f.crElem;
qq.cs = qq.f.createSkin;