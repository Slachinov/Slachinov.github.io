
import {m,butonsEditPanel,bottomPanel} from 'https://slachinov.github.io/Lib/pan/main.js';


let edit = m.edit;


// === глобальные настройки для кнопок ===
let mr = '2px';
let fs = 16;


// === кнопка EVAL ===
qq.ce({
  tag: 'button',
  it: 'EVAL',
  style: { margin: mr, 'font-size': `${fs}px` },
  parent: butonsEditPanel,
  event: { click: function() { eval(edit.innerText); } }
});


// === кнопка CLEAR ===
qq.ce({
  tag: 'button',
  it: 'CLEAR',
  style: { margin: mr, 'font-size': `${fs}px` },
  parent: butonsEditPanel,
  event: { click: function() { edit.innerText = ''; } }
});
//====/


function toggleEditHtml(edit) {
  if (!edit._mode) edit._mode = 'text';


  if (edit._mode === 'text') {
    // TEXT → HTML
    edit._textCache = edit.innerText;
    edit.innerHTML = edit.innerText;
    edit.contentEditable = false;
    edit.style.background = '#e6d3b1'; // светло-коричневый
    edit._mode = 'html';
  } else {
    // HTML → TEXT
    edit.innerText = edit.innerHTML;
    edit.contentEditable = true;
    edit.style.background = 'lightgreen';
    edit._mode = 'text';
  }
}
// === кнопка PROBEL ===
qq.ce({
  tag: 'button',
  it: 'text/HTML',
  style: { margin: mr, 'font-size': `${fs}px` },
  parent: butonsEditPanel,
  event: { click: function() { 
    toggleEditHtml(edit)
  } }
});


//==paste
qq.ce({
    tag: 'button',
    parent: butonsEditPanel,
    it: '\uD83D\uDCE5', // 📥 через Unicode
    style: { 
        fontSize: '22px', 
        padding: '4px 8px', 
        marginLeft: '6px', 
        background: '#e6ffe6', 
        borderRadius: '6px', 
        cursor: 'pointer' 
    },
    event: {
        click: async () => {
            try {
                const text = await navigator.clipboard.readText();
                edit.innerText = text;
            } catch (err) {
                qq.cl('Не удалось получить буфер: ' + err.message);
            }
        }
    }
});