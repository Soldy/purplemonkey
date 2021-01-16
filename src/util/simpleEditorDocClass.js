
export class SimpleEditorDocClass {
    constructor(content, type) {
        this._savedValue = content;
        this._currentValue = content;
    }

    getValue() {
        return this._currentValue;
    }

    isClean() {
        return this._currentValue == this._savedValue;
    }

    markClean() {
        this._savedValue = this._currentValue;
    }

    getMode() {
        return {};
    }
}

