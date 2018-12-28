//alert(9);
qq.gh={};
qq.gh.github=new Github({username: 'Slachinov', password:localStorage['password'], auth:'basic'});//alert(qq.gh.github);
var repo=qq.gh.github.getRepo('Slachinov','slachinov.github.io');
qq.repo=repo;
var options={author:{name:'slach',email:'pser@mail.ru',commiter:{name:'slach',email:'pser@mail.ru'},encode:true}};

//---------------------

qq.gh.write=function(r,n,t){return new Promise(function(resolve, reject) {
//--
r.write('master',n,t,'y-com',options,function(err,b){if(err)reject(err);alert('write');resolve(b)});
//--
})};
qq.gh.read=function(r,n){return new Promise(function(resolve, reject) {//alert(r);alert(n);
//--
r.read('master',n,function(err,b){//alert(err);alert(b);
if(err)reject(err);resolve(b)});
//--
})};
//---------------------------------
qq.gh.delete=function(r,n){return new Promise(function(resolve, reject) {r.delete('master',n,function(err,b){if(err)reject(err);resolve(b)});
//--
})};
//-------------------
qq.gh.gettree=function(r){return new Promise(function(resolve, reject) {
repo.getTree('master?recursive=true',async function(err,tree){if(err)reject(err);if(tree)resolve(tree);});
//--
})};
//===============
alert('end');

