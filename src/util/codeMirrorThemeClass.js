'use strict';
import { CssClass } from '/src/util/cssClass.js';
const Css = new CssClass();
let editor ;
let current = '';
const themes = [
     "3024-day",
     "3024-night",
     "abcdef",
     "ambiance",
     "ambiance-mobile",
     "ayu-dark",
     "ayu-mirage",
     "base16-dark",
     "base16-light",
     "bespin",
     "blackboard",
     "cobalt",
     "colorforth",
     "darcula",
     "dracula",
     "duotone-dark",
     "duotone-light",
     "eclipse",
     "elegant",
     "erlang-dark",
     "gruvbox-dark",
     "hopscotch",
     "icecoder",
     "idea",
     "isotope",
     "lesser-dark",
     "liquibyte",
     "lucario",
     "material",
     "material-darker",
     "material-ocean",
     "material-palenight",
     "mbo",
     "mdn-like",
     "midnight",
     "monokai",
     "moxer",
     "neat",
     "neo",
     "night",
     "nord",
     "oceanic-next",
     "panda-syntax",
     "paraiso-dark",
     "paraiso-light",
     "pastel-on-dark",
     "railscasts",
     "rubyblue",
     "seti",
     "shadowfox",
     "solarized",
     "ssms",
     "the-matrix",
     "tomorrow-night-bright",
     "tomorrow-night-eighties",
     "ttcn",
     "twilight",
     "vibrant-ink",
     "xq-dark",
     "xq-light",
     "yeti",
     "yonce",
     "zenburn"
];
const selectMake = function(){
    const select = document.createElement('select');
    for (let i of themes){
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        select.appendChild(option);
    }
    select.addEventListener('change', function(){
        change(select.value);
    });
    return document.getElementById('codeTheme').appendChild(select);
}
const url = (n)=>{
    return '/third-party/codemirror/theme/'+n+'.css';
}
const change = function(n){
    if( 0 > themes.indexOf(n))
        return false;
    Css.unLoad(url(current));
    let e = Css.load(url(n));
    if(e === false )
        return editor.setOption('theme', n);
    e.onload = function(){
        editor.setOption('theme', n);
    }
    current = n.toString;
    return true;
}
selectMake();

export class rrorThemesClass 
   constructor(editorIn) {
       editor = editorIn;
   }
   change(n){
       return change(n);
   }
}
