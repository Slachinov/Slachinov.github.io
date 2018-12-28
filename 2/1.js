alert(9);
qq.gh={};
qq.gh.github=new Github({username: 'Slachinov', password:'gh22sl04md', auth:'basic'});//alert(qq.gh.github);
var repo=qq.gh.github.getRepo('Slachinov','slachinov.github.io');
//alert('repo='+repo);
var options={author:{name:'slach',email:'pser@mail.ru',commiter:{name:'slach',email:'pser@mail.ru'},encode:true}};
//alert('opt='+options);
alert(repo.write);
qq.gh.write=function(r,n,t){repo.write('master',n,t,'y-com',options,function(err){alert(err)})};

