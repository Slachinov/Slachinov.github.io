eval(localStorage['githubauth0']);
(async function(){
await qq.gh.write(qq.repo,'2/1.js',localStorage['github2']);
var a=await qq.gh.read(qq.repo,'2/1.js');
alert(5);alert(a);
})();