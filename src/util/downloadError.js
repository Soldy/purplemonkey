'use strict';

export class DownloadError extends Error {
  constructor(failedDownloads) {
    super('Download(s) failed; see `.failedDownloads`.');
    this.name = this.constructor.name;
    this.failedDownloads = failedDownloads;
  }
}


