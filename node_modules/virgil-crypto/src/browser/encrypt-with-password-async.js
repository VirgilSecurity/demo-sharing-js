import browser from 'bowser';
import * as CryptoUtils from './utils/crypto-utils';
import CryptoWorkerApi from './crypto-worker-api';
import { throwVirgilError, throwValidationError } from './utils/crypto-errors';
import { encryptWithPassword } from './encrypt-with-password';

export function encryptWithPasswordAsync (initialData, password = '', isEmbeddedContentInfo = true) {
	if (browser.msie || browser.msedge) {
		return new Promise((resolve, reject) => {
			try {
				resolve(encryptWithPassword(initialData, password, isEmbeddedContentInfo));
			} catch (e) {
				reject(e.message);
			}
		});
	} else {
		return CryptoWorkerApi.encryptWithPassword(CryptoUtils.toBase64(initialData), password, isEmbeddedContentInfo).then(
			// convert the base64 response to Buffer for support new interface
			(result) => CryptoUtils.base64ToBuffer(result),
			() => throwVirgilError('90003', { initialData: initialData, password: password })
		);
	}
}

export default encryptWithPasswordAsync;
