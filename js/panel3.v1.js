export function felem(){let a=arguments;
let t=a[0].top||'300px';
let t1=a[0].top1||'0px';
let elem=qq.f.crElem({tag:'div',style:{position:'absolute','z-index':23,top:t,left:'0px',right:'0px',bottom:'0px',background:'blue'},event:{click:function(){}}});document.elem=elem;
let ww=a[0].left||elem.offsetWidth/2+'px';
//---
let lett=qq.f.crElem({tag:'div',style:{overflow:'auto',position:'absolute','z-index':2,top:'0px',left:'0px',height:t1,right:'0px',background:'lightgray', border:'1px solid black'},event:{click:function(){}},parent:elem});
//---
let lel=qq.f.crElem({tag:'div',style:{overflow:'auto',position:'absolute','z-index':2,top:t1,left:'0px',bottom:'0px',width:ww,background:'lightgray',border:'1px solid black'},event:{click:function(){}},parent:elem});
let ler=qq.f.crElem({tag:'div',attr:{contentEditable:true},style:{overflow:'auto', position:'absolute', 'z-index':2, top:t1,left:ww,bottom:'0px',right:'0px',background:'lightgreen',border:'1px solid black'},event:{click:function(){}},parent:elem});
qq.f.crElem({tag:'div',style:{position:'absolute','z-index':25,top:'300px',height:'40px',right:'0px',width:'40px',background: 'red'},event:{click:function(){elem.hide();this.hide();}}});
elem.l=lel;elem.r=ler;elem.t=lett;return elem};
