window.qq = {};
qq.f = {};


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


qq.f.createSkin = function() {
  let skin = {};
  let m = arguments[0];
  let i0 = qq.f.isObject(m[0]) ? 0 : 1;
  for (let i = i0; i < m.length; i++) {
    qq.f.extend(skin, m[i]);
  }
  return skin;
};


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
      hide: function() {
        this.style.display = 'none';
      },
      show: function() {
        this.style.display = 'block';
      },
      toggle: function() {
        this.style.display = this.style.display !== 'none' ? 'none' : 'block';
      },
      getStyle: function(style) {
        return qq.f.getStyle(style, this);
      }
    }
  };


  qq.f.extend(skin, eventBase);


if( skin.name )el.ns[ skin.name ]=el;
if(skin.parent&&typeof skin.parent === 'string') el.parent=el.ns[skin.parent];


if (skin.insb &&typeof skin.insb==='string'&& el.ns[skin.insb]) 
 skin.insb= el.ns[skin.insb];
else if (skin.insa && typeof skin.insa==='string'&& el.ns[skin.insa]) 
  skin.insa=el.ns[skin.insa];

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


qq.gesture = function(el, config) {
  let pointerCache = [];
  let startX = 0, startY = 0, moved = false, panStarted = false;
  let longTapTimer;
  let touchStartTime, lastTapTime = 0;


  el.addEventListener('pointerdown', e => {
    pointerCache.push(e);
    el.setPointerCapture(e.pointerId);


    if (pointerCache.length === 1) {
      startX = e.clientX;
      startY = e.clientY;
      moved = false;
      panStarted = false;
      touchStartTime = Date.now();
      if (config.longtap) {
        longTapTimer = setTimeout(() => {
          longTapTimer = null;
          config.longtap.call(el, e);
        }, 600);
      }
    }


    // Убрано: pinch и rotate - не обрабатываем
  });


  el.addEventListener('pointermove', e => {
    for (let i = 0; i < pointerCache.length; i++) {
      if (pointerCache[i].pointerId === e.pointerId) {
        pointerCache[i] = e;
        break;
      }
    }


    if (pointerCache.length === 1) {
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      const dist = Math.hypot(dx, dy);
      if (dist > 5) {
        moved = true;
        if (longTapTimer) {
          clearTimeout(longTapTimer);
          longTapTimer = null;
        }
        if (!panStarted && config.panstart) {
          panStarted = true;
          config.panstart.call(el, e, { dx, dy });
        }
        if (panStarted && config.panmove) {
          config.panmove.call(el, e, { dx, dy });
        }
      }
    }


    // Убрано: pinch и rotate - не обрабатываем
  });


  el.addEventListener('pointerup', e => {
    pointerCache = pointerCache.filter(p => p.pointerId !== e.pointerId);
    const now = Date.now();
    const duration = now - touchStartTime;


    if (longTapTimer) {
      clearTimeout(longTapTimer);
      longTapTimer = null;
    }


    if (!moved && pointerCache.length === 0) {
      if (duration < 300) {
        if (config.tap) config.tap.call(el, e);
        if (config.doubletap && now - lastTapTime < 400) {
          config.doubletap.call(el, e);
        }
        lastTapTime = now;
      }
    }


    if (panStarted && config.panend) {
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      config.panend.call(el, e, { dx, dy });
    }
  });


  el.addEventListener('pointercancel', e => {
    pointerCache = pointerCache.filter(p => p.pointerId !== e.pointerId);
    if (longTapTimer) {
      clearTimeout(longTapTimer);
      longTapTimer = null;
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


qq.ca = function(m) {
  let ns = {};
  m.forEach(function(el) {
    el.ns = ns;
    qq.ce(el);
  });
};
//alert(777+qq);