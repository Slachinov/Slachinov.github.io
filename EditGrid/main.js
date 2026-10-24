
const ns=qq.ns();
{
ns.set('app',qq.ce({tag:'div',style:{
display:'grid',
gridTemplateColumns:'auto 1fr',
gridTemplateRows:'auto auto minmax(0,1fr) 30px auto',
width:'100%',
height:'100%',
gap:'1px'
}}));
}


ns.set('topPanel',qq.ce({tag:'div',parent:ns.get('app'),style:{
gridColumn:'1/-1',gridRow:'1',background:'gray'
}}));


ns.set('leftPanel',qq.ce({tag:'div',it:'zzzzzzxxxxx',parent:ns.get('app'),style:{
gridColumn:'1',gridRow:'2/-2',background:'lightblue',minWidth:'0px'
}}));ns.get('leftPanel').hide();


ns.set('panels',qq.ce({tag:'div',it:567,parent:ns.get('app'),style:{
gridColumn:'2',gridRow:'2',background:'lightgray',minHeight:'10px'
}}));


ns.set('editorPanel',qq.ce({tag:'div',parent:ns.get('app'),style:{
gridColumn:'2',gridRow:'3',overflow:'auto',minHeight:'0'
}}));


ns.set('buttons',qq.ce({tag:'div',parent:ns.get('app'),style:{
gridColumn:'2',gridRow:'-3',background:'orange'
}}));


ns.set('bottomPanel',qq.ce({tag:'div',it:554,parent:ns.get('app'),style:{
gridColumn:'1/-1',gridRow:'-2',background:'blue'
}}));


const skinTextarea={
tag:'textarea',
prop:{
gettext:function(){return this.value},
settext:function(text){this.value=text},
clear:function(){this.value=''},
edit:function(){this.readOnly=false},
noedit:function(){this.readOnly=true}
},
style:{
width:'100%',
height:'100%',
boxSizing:'border-box',
resize:'none',
border:'0',
margin:'0',
padding:'4px'
}
};


const skinDiv={
tag:'div',
attr:{contenteditable:'true'},
prop:{
gettext:function(){return this.innerText.replace(/\u00A0/g,' ')},
settext:function(text){this.innerText=text},
clear:function(){this.innerHTML=''},
edit:function(){this.contentEditable='true'},
noedit:function(){this.contentEditable='false'}
},
style:{
width:'100%',
height:'100%',
boxSizing:'border-box',
overflow:'auto',
outline:'none',
padding:'4px',
background:'lightgreen',
overflowWrap:'anywhere',
whiteSpace:'pre-wrap',
minHeight:'0'
}
};


ns.set('editor',qq.ce(skinDiv,{parent:ns.get('editorPanel')}));


qq.ce({tag:'button',it:'eval',style:{fontSize:'22px'},parent:ns.get('buttons'),event:{
click:function(){
try{
eval(ns.get('editor').gettext());
}catch(e){}
}
}});


{
const fs='24px';
const buttons=ns.get('buttons');


qq.ce({tag:'button',it:'clear',parent:buttons,style:{fontSize:fs},event:{click:function(){
ns.get('editor').clear();
}}});


qq.ce({tag:'button',it:'\u29C9',parent:buttons,style:{fontSize:fs},event:{click:async function(){
await navigator.clipboard.writeText(ns.get('editor').gettext());
}}});


qq.ce({tag:'button',it:'\uD83D\uDCE5',parent:buttons,style:{fontSize:fs},event:{click:async function(){
ns.get('editor').settext(await navigator.clipboard.readText());
}}});


qq.ce({tag:'button',it:'noedit',parent:buttons,style:{fontSize:fs}});
}
qq.ce({tag:'button',it:'leftpanel',parent:ns.get('topPanel'),style:{fontSize:'22px'},event:{click:function(){
ns.get('leftPanel').toggle();
}}});
export default ns

