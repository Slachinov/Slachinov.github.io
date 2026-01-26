

import {m,butonsEditPanel,bottomPanel} from 'https://slachinov.github.io/Lib/pan/main.js';
let mr='3px';
let fs=18;
let edit =m.edit;


function createLocalStoragePanel () {
  // создаём контейнер в topPanel
  let container = qq.ce({
    tag: 'div',
    parent: m.topPanel,
    style: { margin: '1px 0',
background:'#ffe4e1'}
  });




  // создаём инпут для ключа
  let keyInput = qq.ce({
    tag: 'input',
    parent: container,
    attr: { type: 'text', placeholder: 'Введите ключ localStorage' },
    style: { marginRight: '5px' }
  });




  // создаём кнопку Load
  qq.ce({
    tag: 'button',
    it: 'Load',
    style: { margin: '5px' },
    parent: container,
    event: {
      click: function() {
        let key = keyInput.value.trim();
        if (!key) return;
        let value = localStorage.getItem(key);
        edit.innerText = value !== null ? value : '';
        if (value === null) qq.cl(`Нет значения в localStorage по ключу: "${key}"`);
      }
    }
  });
//==
// === кнопка Save в topPanel ===
qq.ce({
  tag: 'button',
  it: 'Save',
  style: { 
    margin: mr, 
    'font-size': `${fs}px`, 
    background: 'red', 
    color: 'white' 
  },
  parent: container,
  event: {
    click: function() {
      let key = keyInput.value.trim();
      if (!key) return;
      localStorage.setItem(key, edit.innerText);
      qq.cl(`Сохранено: "${key}"`);
    }
  }
});




// === кнопка All в topPanel ===
qq.ce({
  tag: 'button',
  it: 'All',
  style: { margin: mr, 'font-size': `${fs}px` },
  parent: container,
  event: {
    click: function() {
      m.all.innerHTML = ''; // очищаем панель
      m.all.show();         // показываем панель




      for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let value = localStorage.getItem(key);




        qq.ce({
          tag: 'div',
          parent: m.all,
          it: key,  // только ключ
          style: {
            cursor: 'pointer',
            padding: '2px 4px',
            border: '1px solid gray',
            margin: '2px 0',
            borderRadius: '3px'
          },
          event: {
            click: function() {
              keyInput.value = key;    // ключ в инпут
              edit.innerText = value;  // значение в edit
              m.all.hide();            // скрываем панель после выбора
            }
          }
        });
      }
    }
  }
});
//==
  return container;
};
export default createLocalStoragePanel;



