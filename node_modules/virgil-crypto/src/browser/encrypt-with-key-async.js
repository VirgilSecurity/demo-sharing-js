import browser from 'bowser';
import * as CryptoUtils from './utils/crypto-utils';
import CryptoWorkerApi from './crypto-worker-api';
import { throwVirgilError } from './utils/crypto-errors';
import { encryptWithKey } from './encrypt-with-key';

export function encryptWithKeyAsync (initialData, recipientId, publicKey) {
	if (browser.msie || browser.msedge) {
		return new Promise((resolve, reject) => {
			try {
				resolve(encryptWithKey(initialData, recipientId, publicKey));
			} catch (e) {
				reject(e.message);
			}
		});
	} else {
		return CryptoWorkerApi.encryptWithKey(CryptoUtils.toBase64(initialData), recipientId, publicKey).then(
			// convert the base64 response to Buffer for support new interface
			(result) => CryptoUtils.base64ToBuffer(result),
			() => throwVirgilError('90001', { initialData: initialData, key: publicKey })
		);
	}
}

export default encryptWithKeyAsync;
