import _ from 'lodash';
import browser from 'bowser';
import * as CryptoUtils from './utils/crypto-utils';
import CryptoWorkerApi from './crypto-worker-api';
import { throwVirgilError, throwValidationError } from './utils/crypto-errors';
import verify from './verify';

/**
 * Verify signed data using public key using workers
 *
 * @param data {string|Buffer}
 * @param publicKey {string}
 * @param sign {Buffer}
 * @returns {Promise}
 */
export function verifyAsync (data, publicKey, sign) {
	if (!(_.isString(data) || Buffer.isBuffer(data))) {
		throwValidationError('00001', { arg: 'data', type: 'String or Buffer' });
	}

	if (!_.isString(publicKey)) {
		throwValidationError('00001', { arg: 'publicKey', type: 'String' });
	}

	if (!(_.isString(sign) || Buffer.isBuffer(sign))) {
		throwValidationError('00001', { arg: 'sign', type: 'base64 String or Buffer' });
	}

	if (browser.msie || browser.msedge) {
		return new Promise((resolve, reject) => {
			try {
				resolve(verify(data, publicKey, sign));
			} catch (e) {
				reject(e.message);
			}
		});
	} else {
		sign = Buffer.isBuffer(sign) ? CryptoUtils.toBase64(sign) : sign;

		return CryptoWorkerApi.verify(CryptoUtils.toBase64(data), publicKey, sign).catch(() => {
			throwVirgilError('90006', { initialData: data, key: publicKey, sign: sign });
		});
	}
}

export default verifyAsync;
