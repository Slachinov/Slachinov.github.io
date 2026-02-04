/**
 * Создает и возвращает панель, занимающую всю область видимости браузера, с заданными стилями и добавляет в указанный родительский элемент (по умолчанию в document.body).
 *
 * @param {object} params - Объект с CSS-свойствами и (необязательно) parent для панели.
 * Например: { 'background-color': 'lightgray', 'z-index': '0', parent: document.getElementById('someId') }.
 * @returns {HTMLElement} - Созданный HTML-элемент div.
 */
export default function createDivPanel(params={}) {
  const skin = {
    style: {
      position: 'absolute',
      top: '20%',
      left: '10%',
      width: '80%',
      height: '50%',
     background:'lightgray',
     overflow:'auto','z-index':10
    }
  };
  return qq.ce(params,skin);
}

