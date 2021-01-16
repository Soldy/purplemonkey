class SimpleEditorClass{
    constructor(element) {
        this._doc = null;
        this._onChangeExternal = null;
        this._onSwapDoc = null;
        this._textarea = document.createElement('textarea');
        this._textarea.style['white-space'] = 'pre-wrap';
        this._textarea.addEventListener('input', this._onChange.bind(this));
        this._textarea.addEventListener('keydown', this._onKeyDown.bind(this));
        this._commands = {};
        element.appendChild(this._textarea);
    }
     
    getInputField() {
        return this._textarea;
    }
     
    focus() {
        this._textarea.focus();
    }
     
    swapDoc(doc) {
        this._doc = doc;
        this._textarea.value = doc.getValue();
        if (this._onSwapDoc) {
            this._onSwapDoc(doc);
        }
    }
     
    on(name, handler) {
        if (name == 'change') {
            this._onChangeExternal = handler;
        } else if (name == 'swapDoc') {
            this._onSwapDoc = handler;
        }
    }
    addCommand(command, func){
        this._commands[command]=func;
    }
    execCommand(command) {
        if(typeof this._commands[command] === 'undefined')
            return false;
        return this._commands[command]();
    }
     
    _onChange() {
        if (this._doc) {
            this._doc._currentValue = this._textarea.value;
        }
        if (this._onChangeExternal) {
            this._onChangeExternal();
        }
    }
     
    _onKeyDown(event) {
        if (event.ctrlKey && event.key == 's') {
            event.preventDefault();
            this.execCommand('save');
        }
    }
}



window.SimpleEditorClass = SimpleEditorClass ;
