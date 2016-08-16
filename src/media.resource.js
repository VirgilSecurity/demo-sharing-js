import Promise from 'bluebird';

import {decryptAsync} from './crypto/virgil-crypto';

/** Class representing a media resource. */
export class MediaResource {

    /**
     * Create a media resource.
     * @param {object} source - Object representing media's metadata
     *                          such as download url.
     * */
    constructor(source) {
        this.type = source.type;
        this.url = source.url;
    }

    /**
     * Fetch and decrypt the media.
     *
     * @param {function} progressCallback - A function to call to report
     *                                      the execution progress.
     * */
    fetchAndDecrypt(progressCallback) {
        const req = new XMLHttpRequest();
        return new Promise((resolve, reject) => {
            req.onload = () => {
                progressCallback('Decrypting...');
                this.decryptResponse(req.response)
                    .then((decryptedData) => resolve(decryptedData))
                    .catch((err) => reject(err));
            };
            req.onerror = () => reject(new Error('Failed to load data.'));
            req.onabort = () => reject('aborted');
            req.onprogress = (event) => {
                if (event.lengthComputable) {
                    let percent = (event.loaded / event.total) * 100;
                    progressCallback(`Loading ${percent.toFixed(0)}%`);
                } else {
                    progressCallback('Loading...');
                }
            };

            req.open('GET', this.url);
            req.responseType = 'arraybuffer';
            req.send();

        });
    }

    decryptResponse(data) {
        return decryptAsync(data, CONFIG.recipientId, CONFIG.privateKey, CONFIG.privateKeyPassword)
            .then((decryptedData) => new Blob([decryptedData.buffer], { type: this.type }));
    }
}
