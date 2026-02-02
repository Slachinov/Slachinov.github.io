// в библиотеке qq
qq.ns = function() {
  const ns = new Map();


  return {
    get(key) {
      return ns.has(key) ? ns.get(key).value : undefined;
    },
    set(key, value) {
      if (!ns.has(key)) ns.set(key, { value, subscribers: new Set() });
      else ns.get(key).value = value;


      ns.get(key).subscribers.forEach(fn => {
        try { fn(value); } catch(e) { qq.cl('Ошибка в подписчике:', e); }
      });
    },
    subscribe(key, callback) {
      if (!ns.has(key)) ns.set(key, { value: undefined, subscribers: new Set() });
      ns.get(key).subscribers.add(callback);
      return () => ns.get(key).subscribers.delete(callback);
    }
  };
};