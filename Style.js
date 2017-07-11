undefined;;;console.log('style');
 var csk= function(){
var skin={};
var m=arguments;
var l=m.length;//alert(l);
if(!l)return {}; 
for(var i=0;i<m.length;i++)
qq.f.extend(skin,m[i]);
return skin};
 var ed= function (v){return {attr:{contentEditable: v}}};
 var cl= function(f){return {event:{click:f}}};
var bg=function (a){return {style:{background: a}}};
var w=function (a){return {style: {width:(a+'px')}}};
var h=function (a){return {style: {height:(a+'px')}}};
var l=function (a){return {style: {left:(a+'px')}}};
var t=function (a){return {style: {top:(a+'px')}}};
var r=function (a){return {style: {right:(a+'px')}}};
var b=function (a){return {style: {bottom:(a+'px')}}};
 var fs=function(a){return {style:{"font-size":(a+"px")}}};
var div=function (a){return {tag:'div'};};
var span=function (a){return {tag:'span'};};
var par=function (a){return {parent:a};};
var tag=function (a){return {tag:a};};
var fx=function (a){return {style:{position:'fixed' }}};
var zi=function(a){return {style:{'z-index':a}}};
var ih=function (a){return {ih:a};};
var abs=function (a){return {style:{position:'absolute'}}};
var fix=function (a){return {style:{position:'fixed'}}};
var au=function (a){return {style:{overflow:"auto"}}};
 var brd=function (a){return {style:{border:"solid 1px black"}}};
 var col = function(a) {return {style:{color:a}}};
var ce=qq.f.crElem;
var crs=qq.f.createSkin;
var pan=qq.sh.panel;
var but=function (){var b=crs(arguments);return ce(tag('button'),b)};
 var ls=localStorage;
 var lsg=function(a){return localStorage[a]};
 var lss= function(a,v){localStorage[a]=v};
 var all= function(){return {style: {top:"0px",left: "0px", right:"0px", bottom:"0px"}}};













;;
