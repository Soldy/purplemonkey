'use strict';
import { JsClass } from '/src/util/jsClass.js';
const Js = new JsClass();
let editor ;
let current = '';
const keymaps = {
    sublime :{},
    emacs:{},
    vim :{}
}
const selectMaker = function(){
    const select = document.createElement('select');
    for (let i in keymaps){
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        select.appendChild(option);
    }
    select.addEventListener('change', function(){
        change(select.value);
    });
    return document.getElementById('codeKeymap').appendChild(select);
}
const url = (n)=>{
    return '/third-party/codemirror/keymap/'+n+'.js';
}
const change = function(n){
    if( typeof keymaps[n] === 'undefined')
        return false;
    Js.unLoad(url(current));
    let e = Js.load(url(n));
    if(e === false )
        return editor.setOption('keyMap', n);
    e.onload = function(){
        editor.setOption('keyMap', n);
    }
    current = n.toString;
    return true;
}
selectMaker();
export class codeMirrorThemesClass {
   constructor(editorIn) {
       editor = editorIn;
   }
   change(n){
       return change(n);
   }
}
