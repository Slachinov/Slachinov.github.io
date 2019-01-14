
qq.gh={};
qq.gh.github=new Github({username: 'Slachinov', password:localStorage['password'], auth:'basic'});//alert(qq.gh.github);
var repo=qq.gh.github.getRepo('Slachinov','slachinov.github.io');
//alert('repo='+repo);
var options={author:{name:'slach',email:'pser@mail.ru',commiter:{name:'slach',email:'pser@mail.ru'},encode:true}};
//alert('opt='+options);
//alert(repo.write);
qq.gh.write=function(r,n,t){repo.write('master',n,t,'y-com',options,function(err,b){alert(err);alert(b)})};
qq.gh.write(repo,'2/githubw1.js',localStorage['githubw1']);