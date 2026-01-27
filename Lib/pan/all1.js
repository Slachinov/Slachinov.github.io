const basePanel = {
  tag: 'div',
  style: {
    position: 'absolute',
    top: '0px',
    left: '0px',
    width: '100%',
    height: '100%',
    background: 'gray',
    zIndex: 10
  }
};


export default function createFullscreenPanel(par) {
  
  return qq.ce(basePanel);
}