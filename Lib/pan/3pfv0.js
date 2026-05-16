export function createTopBottomMiddleFlexLayout(
    parent,
    topSkin,
    middleSkin,
    bottomSkin
) {


    const parentElement = parent || document.body;


    // контейнер
    const container = window.qq.ce({
        tag: 'div',
        style: {
            position: 'absolute',
            inset: '0',


            display: 'flex',
            flexDirection: 'column',


            overflow: 'hidden'
        },
        parent: parentElement
    });


    // верхняя панель
    const topPanel = window.qq.ce({
        tag: 'div',
        attr: {
            flex: '0 0 auto'
        },
        style: {
            width: '100%'
        },
        parent: container
    }, topSkin);


    // средняя панель
    const middlePanel = window.qq.ce({
        tag: 'div',
        attr: {
            flex: '1'
        },
        style: {
            width: '100%',
            overflowY: 'auto',
            position: 'relative'
        },
        parent: container
    }, middleSkin);


    // нижняя панель
    const bottomPanel = window.qq.ce({
        tag: 'div',
        attr: {
            flex: '0 0 auto'
        },
        style: {
            width: '100%'
        },
        parent: container
    }, bottomSkin);


    return [
        topPanel,
        bottomPanel,
        middlePanel,
        container
    ];
}