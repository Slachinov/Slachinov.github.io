/**
 * Создает и возвращает панель, занимающую всю область видимости браузера, с заданными стилями и добавляет в указанный родительский элемент (по умолчанию в document.body).
 *
 * @param {object} params - Объект с CSS-свойствами и (необязательно) parent для панели.
 * Например: { 'background-color': 'lightgray', 'z-index': '0', parent: document.getElementById('someId') }.
 * @returns {HTMLElement} - Созданный HTML-элемент div.
 */
export function createFullscreenPanel(params) {
  const skin = {
    style: {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
     
    }
  };
  return qq.ce(params,skin);
}

