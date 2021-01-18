'use strict';

export class ImmediateDownload {
  constructor(source) {
    this.progress = 1;
    if (source instanceof Promise) {
      this.result = source;
    } else {
      this.result = Promise.resolve(source);
    }
    this.status = 200;
    this.statusText = 'OK';
  }
}

