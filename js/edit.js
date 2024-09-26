import {m} from '/js/panel3.v7.js';
import {main} from '/js/main.js';
//alert('mmm='+main+m);
//====
let edit=qq.ce({ qclass:'fs(20) abs div zi(5) l(0) r(0) t(0) bg(lightblue)',style:{overflow:'auto'}, parent:m});

let bts=qq.ce({qclass:'div abs  l(0) b(0) r(0) bg(white)', parent:m });

let clear=qq.ce({ qclass:'but fs(25) bg(lightgray)',it:'clear',parent:bts, event:{click:function(e){
edit.innerText=''}}});

let ev=qq.ce({ qclass:'but fs(25) bg(lightgray)',it:'eval',parent:bts, event:{click:function(e){eval(edit.innerText);}}});


qq.ce({ qclass:'but fs(25) bg(lightgray)',it:'edit',parent:bts, event:{click:function(e){let a = this.innerText;if(a=='edit'){this.innerText='noedit';qq.ce(edit,{qclass:'bg(lightgreen)', attr:{contentEditable:true}});}else{ this.innerText='edit';qq.ce(edit,{qclass:'bg(lightblue)', attr:{contentEditable:false}})}}}});

edit.style.bottom=bts.offsetHeight+'px';
main.edit=edit;
//====
let all=qq.ce({ qclass:'div l(0) r(0) bg(orange) fs(25) zi(6) abs',event:{click:function(){this.hide()}}});

const observer = new ResizeObserver(function(entries) {
all.style.bottom= m.getStyle('bottom');
all.style.top=m.offsetTop +'px';
});
observer.observe(m);