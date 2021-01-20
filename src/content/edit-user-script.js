'use strict';


import { SimpleEditorDocClass } from '/src/util/simpleEditorDocClass.js';
import { SimpleEditorClass } from '/src/util/simpleEditorClass.js';
import { EditorDisplayClass } from '/src/util/editorDisplayClass.js';

let gUserScript = null;

/**
 * A very simple editor based on a textarea.
 * This is needed by screen reader users, as CodeMirror is unfortunately not
 * accessible.
 * This class simluates the parts of the CodeMirror API we need.
 */

let modalTimer = null;
let editor;
let createDoc;
const modal = new EditorDisplayClass(editor);

const userScriptUuid = location.hash.substr(1);
const editorDocs = [];
const editorTabs = [];
const editorUrls = [];
const tabs = document.getElementById('tabs');


///////////////////////////////////////////////////////////////////////////////

function addRequireTab(url, content) {
    if (!url) return console.error('addRequireTab missing URL!');
    if (!content) return console.error('addRequireTab missing content!');
    let requireTab = document.createElement('li');
    requireTab.className = 'tab';
    requireTab.textContent = nameForUrl(url);
    tabs.appendChild(requireTab);
    editorTabs.push(requireTab);
    editorDocs.push(createDoc(content, 'javascript'));
    editorUrls.push(url);
}

function nameForUrl(url) {
    return unescape(url.replace(/.*\//, '').replace(/[?#].*/, ''));
}

///////////////////////////////////////////////////////////////////////////////

(async function() {
    let options = await browser.runtime.sendMessage({'name': 'OptionsLoad'});
    const editorElem = document.getElementById('editor');
    if (options.useCodeMirror) {
        const macKeymap = CodeMirror.normalizeKeyMap({
            'Cmd-/': 'toggleComment',
        });
        const pcKeymap = CodeMirror.normalizeKeyMap({
            'Ctrl-/': 'toggleComment',
        });

        const isMacKeymap = CodeMirror.keyMap.default == CodeMirror.keyMap.macDefault;

        editor = CodeMirror(
            editorElem,
            // TODO: Make appropriate options user-configurable.
            {
                'tabSize'    : 2,
                'lineNumbers': true,
                'extraKeys'  : isMacKeymap ? macKeymap : pcKeymap,
                'theme'      : 'material-darker',
                'keyMap'     : 'vim',
            });

        CodeMirror.commands.save = onSave;
        createDoc = (...args) => CodeMirror.Doc(...args);
    } else {
        editor =new SimpleEditorClass(editorElem);
        editor.addCommand('save', onSave);
        createDoc = (...args) => new SimpleEditorDocClass(...args);
    }

    editor.on('change', () => {
        let selectedTab = document.querySelector('#tabs .tab.active');
        let idx = editorTabs.indexOf(selectedTab);
        let selectedDoc = editorDocs[idx];
        if (selectedDoc.isClean()) {
            selectedTab.classList.remove('dirty');
        } else {
            selectedTab.classList.add('dirty');
        }
    });

    editor.on('swapDoc', doc => {
        if (doc.getMode().name == 'javascript') {
            doc.setOption('gutters', ['CodeMirror-lint-markers']);
            doc.setOption('lint', true);
            doc.performLint();
        }
    });

    gUserScript = await browser.runtime.sendMessage({
        'name': 'UserScriptGet',
        'uuid': userScriptUuid,
    });
    let scriptTab = document.createElement('li');
    scriptTab.className = 'tab active';
    scriptTab.textContent = gUserScript.name;
    tabs.appendChild(scriptTab);
    editorTabs.push(scriptTab);
    editorDocs.push(createDoc(gUserScript.content, 'javascript'));
    editorUrls.push(null);

    Object.keys(gUserScript.requiresContent).forEach(u => {
        addRequireTab(u, gUserScript.requiresContent[u]);
    });

    editor.swapDoc(editorDocs[0]);
    editor.focus();
    modal.setEditor(editor);
    modal.setName(gUserScript.name);
})();

///////////////////////////////////////////////////////////////////////////////

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


document.getElementById('save').addEventListener('click', () => {
    editor.execCommand('save');
});


window.addEventListener('beforeunload', event => {
    let isDirty = editorDocs.some(doc => {
        return !doc.isClean();
    });
    if (isDirty) {
        event.preventDefault();
    }
});

///////////////////////////////////////////////////////////////////////////////

function onSave() {
    if (document.querySelectorAll('#tabs .tab.dirty').length == 0) {
        return;
    }

    // Always use a downloader to save, in case of new remotes.
    let downloader = new UserScriptDownloader();
    downloader.setScriptUrl(gUserScript.downloadUrl);
    downloader.setScriptContent(editorDocs[0].getValue());

    let requires = {};
    for (let i = 1; i < editorDocs.length; i++) {
        requires[ editorUrls[i] ] = editorDocs[i].getValue();
    }
    downloader.setKnownRequires(requires);
    downloader.setKnownResources(gUserScript.resources);
    downloader.setKnownUuid(userScriptUuid);

    setTimeout(modal.open, 75);
    downloader
        .start()
        .then(() => {
            return browser.runtime.sendMessage({
                'name': 'UserScriptGet',
                'uuid': userScriptUuid,
            });
        })
        .then(userScript => {
            let details = userScript || gUserScript;
            return downloader.install('edit', !details.enabled);
        }).then(onSaveComplete)
        .catch(modal.fill);
}


function onSaveComplete(savedDetails) {
    modal.close();

    modal.setName(savedDetails.name);
    tabs.children[0].textContent = savedDetails.name;

    for (let i = editorDocs.length; i--; ) {
        let url = editorUrls[i];
        if (i > 0 && !savedDetails.requiresContent[url]) {
            editorTabs[i].parentNode.removeChild(editorTabs[i]);
            editorDocs.splice(i, 1);
            editorTabs.splice(i, 1);
            editorUrls.splice(i, 1);
        } else {
            editorDocs[i].markClean();
            editorTabs[i].classList.remove('dirty');
        }
    }

    Object.keys(savedDetails.requiresContent).forEach(u => {
        if (editorUrls.indexOf(u) === -1) {
            addRequireTab(u, savedDetails.requiresContent[u]);
        }
    });
}
