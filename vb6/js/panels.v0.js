//alert(0);
//=====
{
function ce(b){
document.body.style.overflow='hidden';
let a=b||{t:70,l:180,r:200};
let h=window.innerHeight;
let h1=h-2-a.t;
let w=window.innerWidth;
let w1=w-a.l-a.r-2;
let h2=450;
let h3=h1-h2;

//============
let top=qq.f.crElem({tag:'div',style:{position:'absolute',top:'0px','z-index':2,left:'1px',right:'1px',height:a.t+'px',border:'1px solid gray',background:'#c0c0c0'}});
//--
let left=qq.f.crElem({tag:'div',style:{position:'absolute',top:'0px','z-index':2,top:(a.t+1)+'px',left:'0px',width:a.l+'px',height:h1+'px',border:'1px solid gray',background:'#c0c0c0'}});
//--
let right=qq.f.crElem({tag:'div',style:{position:'absolute',top:'0px','z-index':2,top:(a.t+1)+'px',right:'0px',width:a.r+'px',height:h1+'px',border:'1px solid gray',background:'#c0c0c0'}});
//--
let main=qq.f.crElem({tag:'div',style:{overflow:'auto',position:'absolute','z-index':2,top:(a.t+1)+'px',left:(a.l)+'px',width:w1+'px',height:h1+'px',border:'1px solid gray',background:'#c0c0c0'}});
//---
let p1=qq.f.crElem({tag :'div',style:{right:'20px', background:'blue',width:'100%',height:h2+'px',overflow:'auto'},parent:right});
//--
let p2=qq.f.crElem({tag :'div',style:{background:'green',width:'100%',height:h3+'px',overflow:'auto'},parent:right});
//---


let h30=400;
let h4=50
let h5=h1-h30-h4-10
let p3=qq.ce({tag :'div',style:{background:'blue',width:'100%',height:h30+'px',overflow:'hidden'},parent:left});
//==
let p4=qq.f.crElem({tag :'div',style:{background:'green',width:'100%',height:h4+'px',overflow:'auto'},parent:left});
//---
let p5=qq.f.crElem({tag :'div',style:{background:'orange',width:'100%',height:h5+'px',overflow:'auto'},parent:left});
//---
let f=async function(p){//alert(111);
let ks=await qq.reg.get('ind str0').keys();//alert('ks='+ks);
//alert(ks.length);
for(let i=0;i<ks.length;i++){let el=qq.ce({tag :'div',style:{border:'1px solid black', background:'rgba(222,222,222,.5)'},event:{click:function(){let u=this.u;let c=qq.reg.get('current');c.project=u;let f=qq.reg.get('els');f(u);}} ,it:ks[i].nm,parent:p5});el.u=ks[i].nm}};f();
//---
qq.reg.set('panels',{top:top,left:left,right:right,main:main,elements:p2,propertes:p1});
qq.reg.set('panels create',null);
//--
};
//--
qq.reg.set('panels create',ce);
//=====
}
