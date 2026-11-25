qq.ns = function() {
const ns = new Map();

function notify(key, value) {
ns.get(key).subscribers.forEach(fn => {
try { fn(value); }
catch(e) { qq.cl('Ошибка в подписчике:', e); }
});
}

return {
get(key) {
return ns.has(key) ? ns.get(key).value : undefined;
},

add(key, value) {
if (ns.has(key)) return false;
ns.set(key, { value, subscribers: new Set() });
return true;
},

upg(key, value) {
if (!ns.has(key)) return false;
ns.get(key).value = value;
notify(key, value);
return true;
},

set(key, value) {
if (!ns.has(key)) ns.set(key, { value, subscribers: new Set() });
else ns.get(key).value = value;
notify(key, value);
return true;
},

subscribe(key, callback) {
if (!ns.has(key)) ns.set(key, { value: undefined, subscribers: new Set() });
ns.get(key).subscribers.add(callback);
return () => ns.get(key).subscribers.delete(callback);
}
};
};