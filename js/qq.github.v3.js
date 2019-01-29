//alert(0);
qq.f.github =function (auth){
let au=auth||{};
let gh=new Github(au);
let user=gh.getUser();
//======GIST====================
this.github=gh;
this.gists=function(){return new Promise(function(resolve, reject) {
user.gists(function(e,d){if(e)reject(e);if(d)resolve(d)})})};
//---
this.usergists =function(un){return new Promise(function(resolve, reject) {
user.userGists(un,function(e,d){if(e)reject(e);if(d)resolve(d)})})};
//---
this.getgist=function(id){return new Promise(function(resolve, reject) {
let gist=gh.getGist(id);//alert('gist-'+gist);
gist.read(function(e,d){;if(e)reject(e);if(d)resolve(d)})})};
//---
this.creategist=function(){return new Promise(function(resolve, reject) {var gist=gh.getGist('');
let ars=arguments;
var val={
"description": "local base as localStorage",
"public": true,
"files": {}
};val["files"][name]={};val["files"][name]['content']=txt;
val["files"][name]['language']="javascript";
gist.create(val,function(e,d){
if(e)reject(e);if(d)resolve(d);})})};
//----------
this.deletegist=function(id){return new Promise(function(resolve, reject) {var gist=gh.getGist(id);//alert(id);alert(gist.read);
gist.delete(function(e,d){
if(e)reject(e);if(d)resolve(d);})})};
//----------
this.updategist=function(id,o){return new Promise(function(resolve, reject) {var gist=gh.getGist(id);//alert(id);alert(gist);
gist.update(o,function(e,d){
if(e)reject(e);if(d)resolve(d);})})};
//================USER=======================
this.repos =function(un){return new Promise(function(resolve, reject) {
user.repos(un,function(e,d){if(e)reject(e);if(d)resolve(d)})})};
//---
this.userrepos =function(un){return new Promise(function(resolve, reject) {
user.userRepos(un,function(e,d){if(e)reject(e);if(d)resolve(d)})})};
//=========REPOS===============


//=========REPO================

let getRepo= function(a,b){//alert(a);alert(b);
let repo=gh.getRepo(a,b);
let self=this;
//---
this.gettree =function(){return new Promise(function(resolve, reject) {
//alert(repo);
repo.getTree('master?recursive=true',function(e,d){if(e)reject(e);if(d)resolve(d)})})};
//---
this.read =function(path){return new Promise(function(resolve, reject) {

repo.read('master',path,function(e,d){if(e)reject(e);if(d)resolve(d)})})};
//------
this.write =function(path,content){return new Promise(function(resolve, reject) {
var options={author:{name:'slach',email:'pser@mail.ru',commiter:{name:'slach',email:'pser@mail.ru'},encode:true}};
let message='qq file';
repo.write('master',path,content, message, options,function(e,d){if(e)reject(e);if(d)resolve(d)})})};
//------
this.remove =function(path){return new Promise(function(resolve, reject) {
repo.remove('master',path,function(e,d){if(e)reject(e);if(d)resolve(d)})})};
//------
this.delete = this.remove;
//---
/*this.repomove =function(path, newPath){return new Promise(function(resolve, reject) {
repo.move('master',path, newPath,function(e,d){if(e)reject(e);if(d)resolve(d)})})};*/
//------
this.move =function(path, newPath){return new Promise(function(resolve, reject) {
(async function(){
let cont=await self.read(path);
await self.write(newPath,cont);
await self.delete(path);resolve('move god');
})()
})};
//=======================
};
//---
this.getrepo=function(a,b){return new  getRepo(a,b)};
//---
};
//=======================


