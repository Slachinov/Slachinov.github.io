(function(){
  let consoleBox=null
  let outputBox=null
  let actionsBar=null
  let miniMode=true
  let miniPanel=null
  function createBox(){
    if(consoleBox)return consoleBox
    consoleBox=qq.ce({
      tag:'div',
      style:{
        position:'fixed',
        bottom:'0',
        left:'0',
        right:'0',
        height:'40%',
        background:'#f0f0f0',
        color:'#111',
        fontSize:'18px',
        zIndex:999999
      }
    })
    outputBox=qq.ce({
      tag:'div',
      style:{
        position:'absolute',
        top:'0',
        left:'0',
        right:'0',
        bottom:'36px',
        overflow:'auto',
        padding:'6px',
        background:'#f9f9f9'
      },
      parent:consoleBox
    })
    actionsBar=qq.ce({
      tag:'div',
      style:{
        position:'absolute',
        bottom:'0',
        left:'0',
        right:'0',
        height:'36px',
        background:'orange',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        cursor:'pointer'
      },
      parent:consoleBox,
      event:{
        click(){
          createMiniPanel()
          consoleBox.hide()
        }
      }
    })
    consoleBox.hide()
    return consoleBox
  }
  function createMiniPanel(){
    if(miniPanel)return
    miniPanel=qq.ce({
      tag:'div',
      style:{
        position:'fixed',
        width:'2cm',
        height:'2cm',
        bottom:'0',
        right:'0',
        background:'orange',
        zIndex:1000000,
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        cursor:'pointer'
      },
      parent:document.body,
      ih:'☰',
      event:{
        click(){
          consoleBox.show()
          miniPanel.remove()
          miniPanel=null
          miniMode=false
        },
        touchstart(e){
          const t=e.touches[0]
          miniPanel.startX=t.clientX
          miniPanel.startY=t.clientY
          miniPanel.origLeft=miniPanel.offsetLeft
          miniPanel.origTop=miniPanel.offsetTop
        },
        touchmove(e){
          e.preventDefault()
          const t=e.touches[0]
          miniPanel.style.left=miniPanel.origLeft+(t.clientX-miniPanel.startX)+'px'
          miniPanel.style.top=miniPanel.origTop+(t.clientY-miniPanel.startY)+'px'
        }
      }
    })
  }
  function write(type,args){
    if(!qq.console.sost)return
    createBox()
    qq.ce({
      tag:'div',
      ih:`[${type}] ${args.join(' ')}`,
      parent:outputBox,
      style:{
        border:'1px solid #ccc',
        padding:'4px',
        margin:'2px 0',
        borderRadius:'4px',
        background:'#fff',
        color:type==='ERR'?'red':'#111'
      }
    })
    outputBox.scrollTop=outputBox.scrollHeight
  }
  qq.console={
    sost:true,
    log(...args){write('LOG',args)},
    error(...args){write('ERR',args)},
    hide(){if(consoleBox)consoleBox.hide()},
    show(){if(consoleBox)consoleBox.show()}
  }
  qq.cl=qq.console.log
  qq.er=qq.console.error
  createBox()
  createMiniPanel()
})()