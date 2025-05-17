/**
 * Создает макет с верхней, нижней и средней панелями, расположенными вертикально и абсолютно позиционированными.
 *
 * @param {object} params - Объект с параметрами для панелей и контейнера. Может включать:
 * - parent: Родительский элемент для панелей (по умолчанию document.body).
 * - topStyle: Объект со стилями для верхней панели.
 * - bottomStyle: Объект со стилями для нижней панели.
 * - middleStyle: Объект со стилями для средней панели.
 * @returns {object} - Объект с ссылками на созданные панели: { topPanel, bottomPanel, middlePanel }.
 */
export function createTopBottomMiddleLayout(parent,topSkin,middleSkin,bottomSkin) {
  const parentElement = parent || document.body;


  const topPanelParams = {
    tag: 'div',
    style: {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: 'auto', /* Начальная высота, будет регулироваться */
      
    },
    parent: parentElement
  };
  const topPanel = window.qq.ce(topPanelParams,topSkin);


  const bottomPanelParams = {
    tag: 'div',
    style: {
      position: 'absolute',
      bottom: '0',
      left: '0',
      width: '100%',
      height: 'auto', /* Начальная высота, будет регулироваться */
      
    },
    parent: parentElement
  };
  const bottomPanel = window.qq.ce(bottomPanelParams, bottomSkin);


  const middlePanelParams = {
    tag: 'div',
    style: {
      position: 'absolute',
      top: topPanel.offsetHeight + 'px', /* Начальное положение */
      left: '0',
      width: '100%',
      bottom: bottomPanel.offsetHeight + 'px', /* Начальное положение */
      overflowY: 'auto', /* Для прокрутки содержимого */
      
    },
    parent: parentElement
  };
  const middlePanel = window.qq.ce(middlePanelParams,middleSkin);


  /* Функция для динамического обновления высоты средней панели */
  function updateMiddleSectionHeight() {
    middlePanel.style.top = topPanel.offsetHeight + 'px';
    middlePanel.style.bottom = bottomPanel.offsetHeight + 'px';
  }


  /* Наблюдатели для изменения размеров верхней и нижней панелей */
  const topObserver = new ResizeObserver(() => updateMiddleSectionHeight());
  topObserver.observe(topPanel);


  const bottomObserver = new ResizeObserver(() => updateMiddleSectionHeight());
  bottomObserver.observe(bottomPanel);


  return { topPanel, bottomPanel, middlePanel };
}


/* Экспортируем функцию для создания макета */
export { createTopBottomMiddleLayout };

