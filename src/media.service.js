import Promise from 'bluebird';
import {VirgilCrypto} from 'virgil-crypto';

export class MediaService {
    constructor(source) {
        let info = JSON.parse(window.atob(source));
        this.type = info.type;
        this.url = info.url;
    }

    fetch() {
        const req = new XMLHttpRequest();
        return new Promise((resolve, reject) => {
            req.onload = () => resolve(this.decryptResponse(req.response));//.then(resolve);
            req.onerror = () => reject(new Error('Failed to load data.'));
            req.onabort = () => reject('aborted');

            req.open('GET', this.url);
            req.responseType = 'arraybuffer';
            req.send();

        });
    }

    decryptResponse(data) {
        let privateKey = CONFIG.privateKey.join('\n');
        let buffer = new VirgilCrypto.Buffer(data);
        let decryptedData = VirgilCrypto.decrypt(buffer, CONFIG.recipientId, privateKey, CONFIG.privateKeyPassword);
        return new Blob([decryptedData.buffer], { type: this.type });
    }
}
