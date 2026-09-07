
const ns=qq.ns();
const desktop = qq.ce({
tag: 'div',
style: {
position: 'absolute',
left: '0',
top: '0',
width: '100%',
height: '100%',
zIndex: '10',
display: 'flex',
flexDirection: 'column'
}
});


const header = qq.ce({
tag: 'div',
parent: desktop,
style: {
background: '#d88',
padding: '2px'
}
});


const main = qq.ce({
tag: 'div',
parent: desktop,
style: {
background: '#8d8',
flex: '1',
overflow:'hidden'

}
});


const footer = qq.ce({
tag: 'div',
parent: desktop,
style: {
background: '#88d',
padding: '5px'
}
});


qq.ce({
tag: 'button',
parent: header,
it: 'На весь экран',
event: {
click: function () {
if (!document.fullscreenElement)
document.documentElement.requestFullscreen();
else
document.exitFullscreen();
}
}
});
ns.set('topDesktop',header);
ns.set('mainDesktop',main);
ns.set('bottomDesktop',footer);
export default ns;

