import browser from 'bowser';
import * as CryptoUtils from './utils/crypto-utils';
import CryptoWorkerApi from './crypto-worker-api';
import { throwVirgilError } from './utils/crypto-errors';
import { decryptWithPassword } from './decrypt-with-password';

export function decryptWithPasswordAsync (initialEncryptedData, password = '') {
	if (browser.msie || browser.msedge) {
		return new Promise((resolve, reject) => {
			try {
				resolve(decryptWithPassword(initialEncryptedData, password));
			} catch (e) {
				reject(e.message);
			}
		});
	} else {
		return CryptoWorkerApi.decryptWithPassword(CryptoUtils.toBase64(initialEncryptedData), password).then(
			// convert the base64 response to Buffer for support new interface
			(result) => CryptoUtils.base64ToBuffer(result),
			() => throwVirgilError('90004', { initialData: initialEncryptedData, password: password })
		);
	}
}

export default decryptWithPasswordAsync;
