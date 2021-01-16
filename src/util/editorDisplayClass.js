'use strict';
let editor = '';
let errorList = [];
let name = '';
let title = _('saving');
const buttonDisable = ()=>{
    document.getElementById('modal-close').disabled = true;
    document.getElementById('modal-close').style.display = 'none';
};
const buttonEnable = ()=>{
    document.getElementById('modal-close').disabled = false;
    document.getElementById('modal-close').style.display = 'block';
};
const errorRender = ()=>{
    const target = document.getElementById('modal-errors');
    target.innerHTML='';
    if(1 > errorList.length)
        return false;
    const title = document.createElement('p');
    title.textContent = _('script_save_error');
    const list = document.createElement('ul');
    for(const error of errorList){
        const message = document.createElement('ul');
        message.textContent = error.toString();
        list.appendChild(message);
    }
    const bottom = document.createElement('p');
    bottom.extContent = _('fix_and_save');
    target.appendChild(title);
    target.appendChild(list);
    target.appendChild(bottom);
    return true;
};
export class EditorDisplayClass {
    constructor(editorIn) {
        editor = editorIn;
        document.getElementById('modal-title').textContent = title;
        document.getElementById('modal-close').textContent =_('close');

    }
    setTitle(titleIn){
        title = titleIn;
        document.getElementById('modal-title').innerHTML = title;
    }
    setName(nameIn){
        name = nameIn;
    }
    setEditor(editorIn){
        editor = editorIn;
    }
    open(){
        document.body.classList.add('save');
        errorList = [];
        editor.getInputField().blur();
        buttonDisable();
    }
    close(){
        document.body.classList.remove('save');
        buttonDisable();
        errorList = [];
        editor.getInputField().focus();
    }
    fill(e){
        if (e instanceof DownloadError) {
            errorList = e.failedDownloads.map(
                d => _('ERROR_at_URL', d.error, d.url)
            );
        } else if (e.message) {
            errorList = [e.message];
        } else {
        // Log the unknown error.
            console.error('Unknown save error saving script', e);
            errorList = [_('download_error_unknown')];
        }
        buttonEnable();
        errorRender();

    }
    errorClean(){
        errorList = [];
    }
}
