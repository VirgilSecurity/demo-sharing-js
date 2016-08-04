import _ from 'lodash';
export { Buffer } from 'buffer';
import browser from 'bowser';
import * as CryptoUtils from './utils/crypto-utils';
import CryptoWorkerApi from './crypto-worker-api';
import { throwVirgilError, throwValidationError } from './utils/crypto-errors';
import { sign } from './sign';

/**
 * Sign the encrypted data using private key using workers
 *
 * @param data {string|Buffer}
 * @param privateKey {string}
 * @param [privateKeyPassword = ''] {string}
 * @returns {Promise}
 */
export function signAsync (data, privateKey, privateKeyPassword = '') {
	if (!(_.isString(data) || Buffer.isBuffer(data))) {
		throwValidationError('00001', { arg: 'data', type: 'String or Buffer' });
	}

	if (!_.isString(privateKey)) {
		throwValidationError('00001', { arg: 'privateKey', type: 'String' });
	}

	if (browser.msie || browser.msedge) {
		return new Promise((resolve, reject) => {
			try {
				resolve(sign(data, privateKey, privateKeyPassword));
			} catch (e) {
				reject(e.message);
			}
		});
	} else {
		return CryptoWorkerApi.sign(CryptoUtils.toBase64(data), CryptoUtils.toBase64(privateKey), privateKeyPassword).then(
			// convert the base64 response to Buffer for support new interface
			(result) => CryptoUtils.base64ToBuffer(result),
			() => throwVirgilError('90005', { initialData: data, key: privateKey, password: privateKeyPassword })
		);
	}
}

export default signAsync;
