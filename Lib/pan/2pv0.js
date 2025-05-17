/**
 * Создает макет с нижней панелью внизу и верхней панелью, занимающей оставшееся пространство.
 * Высота нижней панели зависит от содержимого.
 *
 * @param {HTMLElement} parent - Родительский элемент для панелей (по умолчанию document.body).
 * @param {object} bottomSkin - Объект со стилями для нижней панели.
 * @param {object} topSkin - Объект со стилями для верхней панели.
 * @returns {array} - Массив с ссылками на созданные панели: [bottomPanel, topPanel].
 */
export function createBottomTopLayout(parent, bottomSkin, topSkin) {
  const parentElement = parent || document.body;


  const bottomPanelParams = {
    tag: 'div',
    style: {
      position: 'absolute',
      bottom: '0',
      left: '0',
      width: '100%',
      height: 'auto', /* Высота зависит от содержимого */
    },
    parent: parentElement
  };
  const bottomPanel = window.qq.ce(bottomPanelParams, bottomSkin);


  const topPanelParams = {
    tag: 'div',
    style: {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      bottom: bottomPanel.offsetHeight + 'px', /* Занимает оставшееся пространство */
      overflowY: 'auto', /* Для возможной прокрутки редактора */
    },
    parent: parentElement
  };
  const topPanel = window.qq.ce(topPanelParams, topSkin);
  topPanel.contentEditable = true; /* Делаем верхнюю панель редактируемой */


  /* Функция для динамического обновления высоты верхней панели при изменении высоты нижней */
  function updateTopSectionHeight() {
    topPanel.style.bottom = bottomPanel.offsetHeight + 'px';
  }


  /* Наблюдатель для изменения размеров нижней панели */
  const bottomObserver = new ResizeObserver(() => updateTopSectionHeight());
  bottomObserver.observe(bottomPanel);


  return [bottomPanel, topPanel];
}

