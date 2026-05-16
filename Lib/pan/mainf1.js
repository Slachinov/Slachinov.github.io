

import {createFullscreenPanel} from 'https://slachinov.github.io/Lib/pan/1all1.js';
import {createTopBottomMiddleFlexLayout} from 'https://slachinov.github.io/Lib/pan/3pfv0.js';
import {createBottomTopLayout} from 'https://slachinov.github.io/Lib/pan/2pv0.js';




let main = createFullscreenPanel({style:{background:'lightgray'}});


let all = createFullscreenPanel({style:{background:'gray','z-index':5}});


let o = createTopBottomMiddleFlexLayout (
  main,
  {style:{background:'orange', border:'1px solid black',margin:'1px' }},
  {style:{background:'gray',border:'1px solid black',margin:'1px' }},
  {style:{background:'blue',border:'1px solid black',margin:'1px'}}
); 

/*


let o1 = createBottomTopLayout(o[2], {}, {style:{background:'lightgreen'}});
let edit = o1[1];
let butonsEditPanel =o1[0];
let topPanel=o[0];
let bottomPanel=o[1];
all.hide();
let m={};
m.edit=edit;
m.topPanel=topPanel;
m.all=all;
export {m,butonsEditPanel,bottomPanel}


*/







