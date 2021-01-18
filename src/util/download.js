'use strict';

export class Download {
  constructor(progressCb, url, binary=false) {
    this.error = null;
    this.mimeType = null;
    this.pending = true;
    this.progress = 0;
    this.status = null;
    this.statusText = null;
    this.url = url;

    this._progressCb = progressCb;

    this.result = new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();

      xhr.addEventListener('abort', this._onError.bind(this, reject));
      xhr.addEventListener('error', this._onError.bind(this, reject));
      xhr.addEventListener(
          'load', this._onLoad.bind(this, xhr, resolve, reject));
      xhr.addEventListener('progress', this._onProgress.bind(this));

      xhr.open('GET', url);
      if (binary) xhr.responseType = 'blob';

      xhr.send();
    });
  }

  _onError(reject, event) {
    this.pending = false;
    this.progress = 1;
    this._progressCb(this, event);
    reject();
  }

  _onLoad(xhr, resolve, reject, event) {
    if (xhr.status < 200 || xhr.status >= 300) {
      this.error = `${xhr.status} - ${xhr.statusText}`;
      reject(this.error);
      return;
    }

    this.mimeType = xhr.getResponseHeader('Content-Type');
    this.pending = false;
    this.progress = 1;
    this._progressCb(this, event);
    this.status = xhr.status;
    this.statusText = xhr.statusText;
    resolve(xhr.response);
  }

  _onProgress(event) {
    this.progress = event.lengthComputable
        ? event.loaded / event.total
        : 0;
    this._progressCb(this, event);
  }
}

