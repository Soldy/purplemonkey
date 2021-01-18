'use strict';
let createDoc;
const tabs = document.getElementById('tabs');
const editorDocs = [];
const editorTabs = [];
const editorUrls = [];
const nameForUrl = (url)=>{
    return unescape(url.replace(/.*\//, '').replace(/[?#].*/, ''));
}

// TODO: Keyboard accessibility?
tabs.addEventListener('click', event => {
    if (event.target.classList.contains('tab')) {
        let selectedTab = document.querySelector('#tabs .tab.active');
        selectedTab.classList.remove('active');

        let newTab = event.target;
        newTab.classList.add('active');

        let idx = editorTabs.indexOf(newTab);
        editor.swapDoc(editorDocs[idx]);
        editor.focus();
    }
}, true);

export class EditorTabClass {


    add(url, content){
        if (!url)
           return
               console.error(
                   'addRequireTab missing URL!'
                );
        if (!content)
           return
               console.error(
                   'addRequireTab missing content!'
                );
        let requireTab = document.createElement('li');
        requireTab.className = 'tab';
        requireTab.textContent = nameForUrl(url);
        tabs.appendChild(requireTab);
        editorTabs.push(requireTab);
        editorDocs.push(createDoc(content, 'javascript'));
        editorUrls.push(url);
    }
    setCreator(func){
        createDoc = func;
    }
}
