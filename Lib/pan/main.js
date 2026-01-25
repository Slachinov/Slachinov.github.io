

import {createFullscreenPanel} from 'https://slachinov.github.io/Lib/pan/1all1.js';
import {createTopBottomMiddleLayout} from 'https://slachinov.github.io/Lib/pan/3pv2.js';
import {createBottomTopLayout} from 'https://slachinov.github.io/Lib/pan/2pv0.js';




let main = createFullscreenPanel({style:{background:'lightgray'}});


let all = createFullscreenPanel({style:{background:'gray','z-index':5}});


let o = createTopBottomMiddleLayout(
  main,
  {style:{background:'orange'}},
  {style:{background:'gray'}},
  {style:{background:'blue'}}
); 




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
export {m,butonsEditPanel}