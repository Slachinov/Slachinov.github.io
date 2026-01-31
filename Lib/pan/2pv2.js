
/**
 * Создает макет с верхней и средней панелями, расположенными вертикально и абсолютно позиционированными.
 *
 * @param {HTMLElement} parent - Родительский элемент для панелей (по умолчанию document.body)
 * @param {Object} topSkin - скин для верхней панели
 * @param {Object} middleSkin - скин для средней панели
 * @returns {Object} - { topPanel, middlePanel }
 */
export default function createTopMiddleLayout (parent, topSkin, middleSkin) {
  const parentElement = parent || document.body;


  // Верхняя панель
  const topPanelParams = {
    tag: 'div',
    style: {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: 'auto', // высота будет динамическая
    },
    parent: parentElement
  };
  const topPanel = window.qq.ce(topPanelParams, topSkin);


  // Средняя панель
  const middlePanelParams = {
    tag: 'div',
    style: {
      position: 'absolute',
      top: topPanel.offsetHeight + 'px',
      left: '0',
      width: '100%',
      bottom: '0', // занимает всё оставшееся место
      overflowY: 'auto',
    },
    parent: parentElement
  };
  const middlePanel = window.qq.ce(middlePanelParams, middleSkin);


  // Функция для динамического обновления высоты средней панели
  function updateMiddleHeight() {
    middlePanel.style.top = topPanel.offsetHeight + 'px';
  }


  // Наблюдатель за верхней панелью
  const topObserver = new ResizeObserver(() => updateMiddleHeight());
  topObserver.observe(topPanel);


  return [ topPanel, middlePanel ];
};




