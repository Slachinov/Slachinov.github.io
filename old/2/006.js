 
 qq.sc={};
var 
e=localStorage[ "Jquery"];
 //alert(e);
 eval(e);

 qq.f.fpsl=function(a,r,n){ //alert(a);
 this.regist=r;
 this.default=n;
this.i=0;this.text=a; var aa;var vr=a.split(";;;"); if(vr.length>1){this.e=vr[0]; aa=vr[1];} else{aa=a;}; this.m= aa.split(";;");
//alert(this.m.length);

this.ls={};var that=this;
 this.m.forEach(function(bb,ind){ bb=bb.trim();
var c= bb.match(/^([a-z,0-9]*):/i); if(c&&c[1]) that.ls[c[1]]= ind;});
this.next= function(){var bb=this.i;

 //alert("@@@"+this.i);
//alert(this.m[bb]);

this.i++;if(this.i==this.m.length+1)return ''; return this.m[bb]};
 this.getScript= function (){if(!this.l)return this.next();  var n=this.ls[this.l];this.i=n+1;
return this.m[n] };
 this.rn= function(l){this.l=l;
 var t=this;
var sc=this.getScript();
//alert("######"+sc);

 this.regist[this.default](t,sc);
};
};
 //alert(23);
qq.asn= function($e){
 
if($e)eval($e);


 return function ($c,$sc,$p0){//alert(";;;;-"+$sc);

if($p0) { return eval($c);};

eval ("var $a= $c;"+$sc);}; };
 //alert(qq.asn);


 qq.crsc=function(r,n,e){
 r[n]=qq.asn(e);
};







 
 // alert(7);
 var v= localStorage ["00372psl"]; //alert(v);
 var q=new  qq.f.fpsl (v,qq.sc,"a");
 
 qq.crsc(qq.sc,"a",q.e);
//alert("##-"+qq.sc.a);alert(q);

 qq.sc.a(q,q.next());
/*
var v0= localStorage ["0038psl"]; //alert(v);
 var q0=new  qq.f.fpsl (v0);
 //alert(q);
 var p0={m: q0,sc:"b", r: function(r){//alert("return");
alert(r);}};
 //qq.sc.b=qq.asn(q0.e,p0);
 //alert(999+qq.sc.a);
 //qq.sc.b(q0);

qq.crsc(qq.sc,"b",q0.e);
//alert("##-"+qq.sc.a);alert(q);

 qq.sc.b(q0);*/





