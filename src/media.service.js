import Promise from 'bluebird';
import { Buffer } from 'buffer';

import {decryptAsync} from './crypto/virgil-crypto';

export class MediaService {
    constructor(source) {
        let info;
        try {
            info = JSON.parse(window.atob(source));
        } catch(e) {
            throw new Error('Source parameter is invalid.');
        }
        this.type = info.type;
        this.url = info.url;
    }

    fetch(progressCallback) {
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
