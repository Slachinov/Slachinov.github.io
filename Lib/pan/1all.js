alert(8);


/**
 * Создает панель, занимающую всю область видимости браузера, с заданными стилями.
 *
 * @param {object} params - Объект с CSS-свойствами и другими настройками панели.
 * Например: { backgroundColor: 'lightgray', zIndex: '0', overflow: 'hidden', visibility: 'hidden' }.
 * @returns {HTMLDivElement} - Созданный HTML-элемент div.
 */
export function createFullscreenPanel(params) {
  const panel = document.createElement('div');
  panel.style.position = 'absolute';
  panel.style.top = '0';
  panel.style.left = '0';
  panel.style.width = '100%';
  panel.style.height = '100%';


  
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      panel.style[key] = params[key];
    }
  }


  return panel;
}



