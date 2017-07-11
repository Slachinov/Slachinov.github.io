 var 
e=localStorage[ "Jquery"];
 //alert(e);
 eval(e);

 qq.f.fpsl=function(a){ //alert(a);
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
};
 //alert(23);
qq.asn= function($e,$p){if($e)eval($e);
var $r=$p.r;
 //alert ($r);

$f=function ($c,$l){if($l)$c.l=$l;var $d= $c.getScript();
//alert(b);alert($d);
$c.l='';
eval ("var $a= $c;"+$d);}; //alert($f);
$p.f=$f;$f($p.m);};
 //alert(qq.asn);









 
 // alert(7);
 var v= localStorage ["037"]; //alert(v);
 var q=new  qq.f.fpsl (v);
 //alert(q);
 var p={m: q, r: function(r){//alert("return");
alert(r);}};
 qq.asn(q.e,p);








