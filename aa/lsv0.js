 import {m,ls} from '/Lib/pan/main.js';
export function createLocalStorageControls () {
  m.top.innerHTML = '';


  const clearButtonSkin = {
    tag: 'button',
    parent: m.top,
    style: {
      marginRight: '5px',
      fontSize: '0.8em'
    },
    event: {
      click: function() {ls.input.value='';}
    }
  };
  const clearButton = window.qq.ce(clearButtonSkin, { it: 'cl' });


  const inputSkin = {
    tag: 'input',
    parent: m.top,
    attr: { type: 'text' },
    style: {
      marginLeft: '5px',
      marginRight: '5px',
      fontSize: '1em',
      width: '60%'
    }
  };
  const valueInput = window.qq.ce(inputSkin);
  if (!ls) window.ls = {};
  ls.input = valueInput;


  const loadButtonSkin = {
    tag: 'button',
    parent: m.top,
    style: {
      marginLeft: '5px',
      marginRight: '5px',
      fontSize: '0.8em'
    },
    event: {
      click: function() {
        if (ls && ls.input && m && m.edit) {
          const key = ls.input.value.trim();
          const value = localStorage.getItem(key);
          if (value !== null) {
            m.edit.innerText = value;
          }
        } else {
          console.error('Ошибка: ls, ls.input или m.edit не определены.');
        }
      }
    }
  };
  window.qq.ce(loadButtonSkin, { it: 'load' });


  const allButtonSkin = {
    tag: 'button',
    parent: m.top,
    style: {
      marginLeft: '5px',
      fontSize: '0.8em'
    },
    event: {
      click: function() {
        allLsButton();
      }
    }
  };
  window.qq.ce(allButtonSkin, { it: 'all' });


  window.qq.ce({ tag: 'br', parent: m.top });
  window.qq.ce({ tag: 'input', parent: m.top, attr: { type: 'checkbox' }, marginLeft: '5px' });


  window.qq.ce({
    tag: 'button',
    parent: m.top,
    it: 'search',
    marginLeft: '5px',
    event: { click: searchLsButton }
  });


  window.qq.ce({
    tag: 'button',
    parent: m.top,
    it: 'write',
    style: { color: 'red', marginLeft: '5px' },
    event: {
      click: function() {
        if (ls && ls.input && m && m.edit) {
          const key = ls.input.value.trim();
          const value = m.edit.innerText;
          localStorage.setItem(key, value);
        } else {
          console.error('Ошибка: ls, ls.input или m.edit не определены.');
        }
      }
    }
  });


  window.qq.ce({
    tag: 'button',
    parent: m.top,
    it: 'delete',
    style: { color: 'red', marginLeft: '5px' },
    event: {
      click: function() {
        if (m && m.yellow) {
          m.yellow.innerHTML = '';
          m.yellow.style.display = 'flex';
          m.yellow.style.flexDirection = 'column';
          m.yellow.style.alignItems = 'center';
          m.yellow.style.justifyContent = 'center';
          m.yellow.show();


          const buttonStyle = {
            fontSize: '2em',
            padding: '15px 30px',
            margin: '10px 20px'
          };


          window.qq.ce({
            tag: 'button',
            parent: m.yellow,
            it: 'Yes',
            style: buttonStyle,
            event: {
              click: function() {
                if (ls && ls.input && m && m.yellow) {
                  const keyToDelete = ls.input.value.trim();
                  localStorage.removeItem(keyToDelete);
                  m.edit.innerText = `Ключ "${keyToDelete}" удален.`;
                  m.yellow.hide();
                } else {
                  console.error('Ошибка: один из необходимых элементов не определен (в обработчике Yes).');
                }
              }
            }
          });


          window.qq.ce({
            tag: 'button',
            parent: m.yellow,
            it: 'No',
            style: buttonStyle,
            event: {
              click: function() {
                if (m && m.yellow) {
                  m.yellow.hide();
                } else {
                  console.error('Ошибка: m.yellow не определена (в обработчике No).');
                }
              }
            }
          });


        } else {
          console.error('Ошибка: m или m.yellow не определены (при нажатии delete).');
        }
      }
    }
  });


  window.qq.ce({
    tag: 'button',
    parent: m.top,
    it: 'write gh',
    style: { color: 'red', marginLeft: '5px' }
  });


  function allLsButton() {
    if (m.yellow) {
      m.yellow.innerHTML = '';
      m.yellow.show();
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        window.qq.ce({
          tag: 'div',
          parent: m.yellow,
          style: {
            width: '100%',
            border: '1px solid black',
            fontSize: '1.2em',
            padding: '5px',
            backgroundColor: 'lightgray',
            minHeight: '1px',
            cursor: 'pointer'
          },
          it: key,
          event: {
            click: function() {
              if (ls && ls.input && m && m.edit && m.yellow) {
                const clickedKey = this.innerText;
                const value = localStorage.getItem(clickedKey);
                ls.input.value = clickedKey;
                m.edit.innerText = value;
                m.yellow.hide();
              } else {
                console.error('Ошибка: один из необходимых элементов не определен.');
              }
            }
          }
        });
      }
    } else {
      console.error('Ошибка: m.yellow не определена.');
    }
  }


  function searchLsButton() {
    if (m && m.yellow && ls && ls.input) {
      const searchTerm = ls.input.value.trim();
      const searchByValue = m.top.querySelector('input[type="checkbox"]').checked;
      const results = [];
      m.yellow.innerHTML = '';
      m.yellow.show();


      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        if (searchByValue) {
          if (value && value.includes(searchTerm)) {
            results.push(key);
          }
        } else {
          if (key.includes(searchTerm)) {
            results.push(key);
          }
        }
      }


      if (results.length > 0) {
        results.forEach(key => {
          window.qq.ce({
            tag: 'div',
            parent: m.yellow,
            style: {
              width: '100%',
              border: '1px solid black',
              fontSize: '1.2em',
              padding: '5px',
              backgroundColor: 'lightgray',
              minHeight: '1px',
              cursor: 'pointer'
            },
            it: key,
            event: {
              click: function() {
                if (ls && ls.input && m && m.edit && m.yellow) {
                  const clickedKey = this.innerText;
                  const storedValue = localStorage.getItem(clickedKey);
                  ls.input.value = clickedKey;
                  m.edit.innerText = storedValue;
                  m.yellow.hide();
                } else {
                  console.error('Ошибка: один из необходимых элементов не определен (при клике на результат поиска).');
                }
              }
            }
          });
        });
      } else {
        window.qq.ce({
          tag: 'div',
          parent: m.yellow,
          it: 'Ничего не найдено.',
          style: { padding: '10px', fontSize: '1.1em' }
        });
      }
    } else {
      console.error('Ошибка: m, m.yellow или ls.input не определены (в searchLsButton).');
    }
  }
}