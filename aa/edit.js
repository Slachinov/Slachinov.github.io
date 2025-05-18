



import {m} from '/Lib/pan/main.js';


import {createBottomTopLayout}  from '/Lib/pan/2pv0.js';


alert('*-'+ createBottomTopLayout);


let greenPanel=m.green; 
let m0= createBottomTopLayout (greenPanel ,{style:{background:'brown'}},{style:{background:'lightgreen'}});


let brownPanel =m0[0];
let editPanel =m0[1];
//
/* Предполагается, что brownPanel и editPanel уже существуют и являются DOM-элементами */




const clearButtonParams = {
  tag: 'button',
  it: 'Clear',
  style: {
    marginRight: '10px',
    fontSize: '1em'
  },
  parent: brownPanel,
  event: {
    click: function() {
      editPanel.innerHTML = ''; /* Очищаем содержимое editPanel */
    }
  }
};
const clearButton = window.qq.ce(clearButtonParams);




const evalButtonParams = {
  tag: 'button',
  it: 'Eval',
  style: {
    fontSize: '1em'
  },
  parent: brownPanel,
  event: {
    click: function() {
      try {
        eval(editPanel.innerText); /* Выполняем содержимое editPanel как JavaScript код */
      } catch (error) {
        console.error('Ошибка при выполнении:', error);
        /* Здесь можно добавить отображение ошибки пользователю */
      }
    }
  }
};
const evalButton = window.qq.ce(evalButtonParams);




/* Теперь clearButton и evalButton добавлены в brownPanel и имеют обработчики событий */

