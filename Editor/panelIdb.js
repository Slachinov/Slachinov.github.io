import { m, butonsEditPanel, bottomPanel } 
from 'https://slachinov.github.io/Lib/pan/main.js';




import { saveFile, loadFile, getAllKeys } 
from 'https://slachinov.github.io/Lib/pan/idb.js';




let edit = m.edit;




let mr='3px';
let fs=20;
function createIndexedDBPanel () {




  let container = qq.ce({
    tag: 'div',
    parent: m.topPanel,
    style: { margin: '1px 0', background: '#e0f7ff' }
  });




  // input key
  let keyInput = qq.ce({
    tag: 'input',
    parent: container,
    attr: { type: 'text', placeholder: 'Введите ключ IndexedDB' },
    style: { marginRight: '5px' }
  });




  // ===== Load =====
  qq.ce({
    tag: 'button',
    it: 'Load',
    parent: container,
    style: { margin: '5px' },
    event: {
      click: async function () {
        let key = keyInput.value.trim();
        if (!key) return;




        try {
          let value = await loadFile(key);
          edit.innerText = value ?? '';
          if (value == null) qq.cl(`Нет значения в IndexedDB: "${key}"`);
        } catch (e) {
          qq.er(e);
        }
      }
    }
  });




  // ===== Save =====
  qq.ce({
    tag: 'button',
    it: 'Save',
    parent: container,
    style: {
      margin: mr,
      'font-size': `${fs}px`,
      background: 'red',
      color: 'white'
    },
    event: {
      click: async function () {
        let key = keyInput.value.trim();
        if (!key) return;




        try {
          await saveFile(key, edit.innerText);
          qq.cl(`Сохранено в IndexedDB: "${key}"`);
        } catch (e) {
          qq.er(e);
        }
      }
    }
  });
// ===== All =====
  qq.ce({
    tag: 'button',
    it: 'All',
    parent: container,
    style: { margin: mr, 'font-size': `${fs}px` },
    event: {
      click: async function () {
        m.all.innerHTML = '';
        m.all.show();




        try {
          let keys = await getAllKeys();




          for (let key of keys) {
            qq.ce({
              tag: 'div',
              parent: m.all,
              it: key,
              style: {
                cursor: 'pointer',
                padding: '2px 4px',
                border: '1px solid gray',
                margin: '2px 0',
                borderRadius: '3px'
              },
              event: {
                click: async function () {
                  keyInput.value = key;
                  edit.innerText = await loadFile(key);
                  m.all.hide();
                }
              }
            });
          }




        } catch (e) {
          qq.er(e);
        }
      }
    }
  });




  return container;
};




createIndexedDBPanel ()