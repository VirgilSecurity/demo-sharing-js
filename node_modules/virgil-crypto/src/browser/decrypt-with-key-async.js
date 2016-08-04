import browser from 'bowser';
import * as CryptoUtils from './utils/crypto-utils';
import CryptoWorkerApi from './crypto-worker-api';
import { throwVirgilError } from './utils/crypto-errors';
import { decryptWithKey } from './decrypt-with-key';

export function decryptWithKeyAsync (initialEncryptedData, recipientId, privateKey, privateKeyPassword) {
	if (browser.msie || browser.msedge) {
		return new Promise((resolve, reject) => {
			try {
				resolve(decryptWithKey(initialEncryptedData, recipientId, privateKey, privateKeyPassword));
			} catch (e) {
				reject(e.message);
			}
		});
	} else {
		return CryptoWorkerApi.decryptWithKey(CryptoUtils.toBase64(initialEncryptedData), recipientId, CryptoUtils.toBase64(privateKey), privateKeyPassword).then(
			// convert the base64 response to Buffer for support new interface
			(result) => CryptoUtils.base64ToBuffer(result),
			() => throwVirgilError('90002', { initialData: initialEncryptedData, key: privateKey })
		);
	}
}

export default decryptWithKeyAsync;
