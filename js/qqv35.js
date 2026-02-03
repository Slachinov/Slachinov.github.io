window.qq = {};
qq.f = {};


qq.isObject = function (o) {
  return (
    o !== null &&
    typeof o === 'object' &&
    typeof o.toString === 'function' &&
    o.toString() === '[object Object]'
  );
};
qq.f.isObject = function(o) {
  return o && typeof o === 'object' && o.toString() === '[object Object]';
};
//===
// Основная функция
qq.extend = function(destination, source) {
  for (let key of Object.keys(source)) {          // только собственные
    const value = source[key];


    if (qq.isObject(value)) {                     // рекурсивно сливаем толь
      if (!destination[key] || !qq.isObject(destination[key])) {
        destination[key] = {};
      }
      qq.extend(destination[key], value);
    } else {
      destination[key] = value;                  // массивы, примитивы,
    }
  }
  return destination;
};


//===
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
//===
qq.getStyle = function(style, elem) {
  if (!elem) return null;
  return window.getComputedStyle(elem, null).getPropertyValue(style);
};
//===
qq.f.getStyle = function(style, elem) {
  return document.defaultView.getComputedStyle(elem, null).getPropertyValue(style);
};
//===
qq.createSkin = function() {
  let skin = {};
  for (let i = 0; i < arguments.length; i++) {
    if (qq.isObject(arguments[i])) qq.extend(skin, arguments[i]);
  }
  return skin;
};
//===
qq.f.createSkin = function() {
let m;
if(arguments[0]=='[object Arguments]')m=arguments[0]; else m=arguments;
  let skin = {};
  let i0 = qq.f.isObject(m[0]) ? 0 : 1;
  for (let i = i0; i < m.length; i++) {
    qq.f.extend(skin, m[i]);
  }
  return skin;
};
/*
qq.f.crElem = function() {
  const args = Array.from(arguments);
  let el;
  let skin;


  if (args[0] instanceof Element) {
    el = args[0];
    skin = qq.createSkin(...args.slice(1));
  } else {
    skin = qq.createSkin(...args);
    el = document.createElement(skin.tag || 'div');
  }
};
*/

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
/*
let eventBase = {
  prop: {
    clear: function() {
      this.innerHTML = "";
    },
    hide: function() {
      if (!this._displayCache) {
        this._displayCache = qq.f.getStyle('display', this);
      }
      this.style.display = 'none';
    },
    show: function() {
      this.style.display = this._displayCache || 'block';
      delete this._displayCache;
    },
    toggle: function() {
      if (this.style.display !== 'none') {
        this.hide();
      } else {
        this.show();
      }
    },
    getStyle: function(style) {
      return qq.f.getStyle(style, this);
    }
  }
};
*/

  let eventBase = {
    prop: {
      clear: function(){
this.innerHTML=""; },
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
      } else if (["tap", "doubletap", "panstart", "panmove", "panend"].includes(u)) {
        if (!el._qqGestureEvents) el._qqGestureEvents = {};
        el._qqGestureEvents[u] = skin.event[u];
        qq.gesture(el, el._qqGestureEvents);
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


// Жесты: swipe, press, longtap
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


// Новый универсальный обработчик для жестов
qq.gesture = function(el, config) {
  let touchStartTime, lastTapTime = 0;
  let tapTimeout;
  let startX = 0, startY = 0, moved = false, panStarted = false;
  let longTapTimer;


  el.addEventListener('touchstart', e => {
    if (e.touches.length > 1) return;


    const t = e.touches[0];
    startX = t.clientX;
    startY = t.clientY;
    moved = false;
    panStarted = false;
    touchStartTime = Date.now();


    if (config.longtap) {
      longTapTimer = setTimeout(() => {
        longTapTimer = null;
        config.longtap.call(el, e);
      }, 600);
    }
  });


  el.addEventListener('touchmove', e => {
    if (e.touches.length > 1) return;


    const t = e.touches[0];
    const dx = t.clientX - startX;
    const dy = t.clientY - startY;
    const dist = Math.sqrt(dx*dx + dy*dy);


    if (dist > 5) {
      moved = true;
      if (longTapTimer) {
        clearTimeout(longTapTimer);
        longTapTimer = null;
      }


      if (!panStarted && config.panstart) {
        panStarted = true;
        config.panstart.call(el, e, {dx, dy});
      }
      if (panStarted && config.panmove) {
        config.panmove.call(el, e, {dx, dy});
      }
    }
  });


  el.addEventListener('touchend', e => {
    const now = Date.now();
    const duration = now - touchStartTime;


    if (longTapTimer) {
      clearTimeout(longTapTimer);
      longTapTimer = null;
    }


    if (!moved) {
      if (duration < 300) {
        if (config.tap) config.tap.call(el, e);
        if (config.doubletap && now - lastTapTime < 400) {
          config.doubletap.call(el, e);
        }
        lastTapTime = now;
      }
    } else {
      if (panStarted && config.panend) {
        const t = e.changedTouches[0];
        const dx = t.clientX - startX;
        const dy = t.clientY - startY;
        config.panend.call(el, e, {dx, dy});
      }
    }
  });
};


qq.ls = function(a) { return localStorage[a]; };
qq.loadscript = function(url) {
  return new Promise(function(resolve, reject) {
    let el = document.createElement('script');
    el.src = url;
    el.addEventListener('load', () => resolve(url), false);
    el.addEventListener('error', e => reject(e), false);
    document.head.appendChild(el);
  });
};


qq.ce = qq.f.crElem;
qq.cs = qq.f.createSkin;