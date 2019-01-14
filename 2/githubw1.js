//treetratata
async function beg(){
qq.gh={};
qq.gh.github=new Github({username :'Slachinov', password:localStorage['password']});//alert(qq.gh.github);
var repo=qq.gh.github.getRepo('Slachinov','slachinov.github.io');
//--------------------
let val=await localqq.get('tree');
let elem=qq.f.crElem({tag:'div',style:{position:'absolute','z-index':23,top:'300px',left:'0px',right:'0px',bottom:'0px',background:'blue'},event:{click:function(){}}});
let ww=elem.offsetWidth;//alert(ww);
let lel=qq.f.crElem({tag:'div',style:{overflow:'auto',position:'absolute','z-index':2,top:'0px',left:'0px',bottom:'0px',width:ww/2+'px',background:'lightgray',border:'1px solid black'},event:{click:function(){}},parent:elem});
let ler=qq.f.crElem({tag:'div',style:{overflow:'auto', position:'absolute', 'z-index':2, top:'0px',left:ww/2+'px',bottom:'0px',width:ww/2+'px',background:'lightgreen',border:'1px solid black'},event:{click:function(){}},parent:elem});
qq.f.crElem({tag:'div',style:{position:'absolute','z-index':25,top:'300px',height:'40px',right:'0px',width:'40px',background: 'red'},event:{click:function(){elem.hide();this.hide();}}});
//alert(val);

for(var i=0;i<val.length;i++){
qq.f.crElem({tag:'div',style:{border:'1px solid black',left:'0px',right:'0px',height:'20px',background:'orange'},prop:{path:val[i].path},event:{click:async function(){repo.read('master',this.path,function(err,data){alert(444);alert(err);alert(data);ler.innerText=data;});}},ih:val[i].path,parent:lel});
}
};beg();
