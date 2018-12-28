qq.gh={};
qq.gh.github=new Github({username: 'Slachinov', password:'gh22sl04md', auth:'basic'});alert(qq.gh.github);
var repo=qq.gh.github.getRepo('Slachinov','slachinov.github.io');
alert(repo);
function tree(){repo.getTree('master?recursive=true',function(err,tree){window.ttt=tree;alert(err);alert(tree);alert(tree[2]);});};tree();
qq.gh.write=function(r,n,t){r.write('master',n,t,'y-com',options,function(err){})}};

