import browser from 'bowser';
import * as CryptoUtils from './utils/crypto-utils';
import CryptoWorkerApi from './crypto-worker-api';
import { throwVirgilError } from './utils/crypto-errors';
import { encryptWithKeyMultiRecipients } from './encrypt-with-key-multi-recipients';

export function encryptWithKeyMultiRecipientsAsync (initialData, recipients) {
	if (browser.msie || browser.msedge) {
		return new Promise((resolve, reject) => {
			try {
				resolve(encryptWithKeyMultiRecipients(initialData, recipients));
			} catch (e) {
				reject(e.message);
			}
		});
	} else {
		return CryptoWorkerApi.encryptWithKeyMultiRecipients(CryptoUtils.toBase64(initialData), recipients).then(
			// convert the base64 response to Buffer for support new interface
			(result) => CryptoUtils.base64ToBuffer(result),
			() => throwVirgilError('90008', { initialData: initialData, recipients: recipients })
		);
	}
}

export default encryptWithKeyMultiRecipientsAsync;
