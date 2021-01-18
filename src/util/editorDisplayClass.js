'use strict';
let editor = '';
let errorList = [];
let name = '';
let title = _('saving');
const dI = function(name){
    return document.getElementById(name);
}
const changeTitle = ()=>{
     document.title = (
         name.toString()+
         ' - '+
         _('greasemonkey_user_script_editor')
     );
}
const buttonDisable = ()=>{
    dI('modal-close').style.display = 'none';
};
const buttonEnable = ()=>{
    dI('modal-close').style.display = 'block';
};
const errorRender = ()=>{
    const target = dI('modal-errors');
    button
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
        document.title = _('greasemonkey_user_script_editor');
// Change the title of the save icon (and more) to initial values.
        dI('modal-title').textContent =  _('saving');
        dI('modal-title').textContent = title;
        dI('modal-close').textContent =_('close');
        dI('modal-close').addEventListener(
            'click', 
            modal.close
        );
    }
    setTitle(titleIn){
        title = titleIn;
        dI('modal-title').textContent = title;
    }
    setName(nameIn){
        name = nameIn;
        changeTitle();
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
        buttonEnable();
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
        errorRender();

    }
    errorClean(){
        errorList = [];
    }
};
