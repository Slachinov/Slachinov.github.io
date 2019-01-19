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

/*this.getrepo=function(a){return new Promise(function(resolve, reject) {
let repo=gh.getRepo(a);//qq.f.obj(repo,1);
repo.listBranches(function(e,d){if(e)reject(e);if(d)resolve(d)});
repo.getTree('master?recursive=true',async function(err,tree){if(err){alert('err='+err);reject(err);};resolve(tree);
});
repo.show(function(e,d){//alert(e);qq.f.obj(e,1);alert(d);
if(e)reject(e);if(d)resolve(d)})})};*/
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
this.reporemove =function(path){return new Promise(function(resolve, reject) {
repo.remove('master',path,function(e,d){if(e)reject(e);if(d)resolve(d)})})};
//------
this.repodelete = this.reporemove;
//---
/*this.repomove =function(path, newPath){return new Promise(function(resolve, reject) {
repo.move('master',path, newPath,function(e,d){if(e)reject(e);if(d)resolve(d)})})};*/
//------
this.repomove =function(path, newPath){return new Promise(function(resolve, reject) {
(async function(){
let cont=await self.reporead(path);
await self.repowrite(newPath,cont);
await self.repodelete(path);resolve('move god');
})()
})};
//=======================
};
//---
this.getrepo=function(a,b){return new  getRepo(a,b)};
//---
};
//=======================
alert('end qq.github.v3.js');
/*
//this.write = function(branch, path, content, message, options, cb) {
//this.move = function(branch, path, newPath, cb) {
//this.remove = function(branch, path, cb) {
//this.delete = this.remove;
//this.read = function(branch, path, cb) {
 this.postTree = function(tree, cb) {
this.postBlob = function(content, cb) {
 this.updateTree = function(baseTree, path, blob, cb) {
 this.getSha = function(branch, path, cb) {
 this.getBlob = function(sha, cb) {
this.listBranches = function(cb) 
this.deleteRepo = function(cb) {
this.createRepo = function(options, cb) {
 function updateTree(branch, cb) {

*/