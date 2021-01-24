'use strict';


let menus = [];
const getMenus = function(){

}
const dC = (n)={
    return document.createElement(n);
}

const menuTextArea(id, text){
    const span = dC('span');
    const area = dC('textarea');
    span.textContent = text;
    area.setAttribute('id', id);
}
const menuLink = (url, text){
    const link = dC('a');
    link.setAttribute('href', url);
    link.textContent = text;
    return link;
}
const menuSimple(id, text){
    const span = dC('span');
    span.textContent = text;
    span.setAttribute('id', id);
}
const menuSwitch(id, text){
    const span = dC('span');
    span.textContent = text;
    span.setAttribute('id', id);
}


const menusMaker = function(){
    const menu = 
    for (let item of menus)
        menu.appendChild(
            menuOne()
        );
    return 
        document.body.appendChild(
           menu
        );
}
const menuOne = (menuDef)=>{
    const menuItem = dC('menuItem');
    // text translate
    if(typeof menuDef.text !== 'undefined')
        menuDef.text = _(menuDef.text);
    //icon 
    const i = dC('i');
    if(typeof menuDef.icon !== 'undefined')
        i.setAttribute(
            'class',
            i.className+
            ' '+
            menuDef.icon
        );
    menuItem.appendChild(i);
    //textarea
    if(menuDef.type === 'textarea')
       menuItem.appendChild(
           menuTextArea(
               menuDef.id,
               menuDef.text
           )
       );
    //link
    if(menuDef.type === 'link')
       menuItem.appendChild(
           menuLink(
               menuDef.url,
               menuDef.title
           )
       );
    if(menuDef.type === 'function')
       menuItem.appendChild(
           menuFunction(
               menuDef.id,
               menuDef.text
           )
       );
    if(menuDef.type === 'function')
       menuItem.appendChild(
           menuSwitch(
               menuDef.id,
               menuDef.text
           )
       );
    return menuItem;
}
export class BrowserMenuClass {

}

