import _ from 'lodash';
export { Buffer } from 'buffer';
import { decryptWithPasswordAsync } from './decrypt-with-password-async';
import { decryptWithKeyAsync } from './decrypt-with-key-async';
import { throwValidationError } from './utils/crypto-errors';

/**
 * Decrypt data async
 *
 * @param initialEncryptedData {Buffer}
 * @param recipientId {string}
 * @param [privateKey] {string}
 * @param [privateKeyPassword = ''] {string}
 * @returns {Promise}
 */
export function decryptAsync (initialEncryptedData, recipientId, privateKey, privateKeyPassword = '') {
	if (!Buffer.isBuffer(initialEncryptedData)) {
		throwValidationError('00001', { arg: 'initialEncryptedData', type: 'Buffer' });
	}

	if (!_.isString(recipientId)) {
		throwValidationError('00001', { arg: 'recipientId', type: 'String' });
	}

	let decryptedDataPromise;

	if (arguments.length === 2) {
		let password = recipientId;

		decryptedDataPromise = decryptWithPasswordAsync(initialEncryptedData, password);
	} else {
		decryptedDataPromise = decryptWithKeyAsync(initialEncryptedData, recipientId, privateKey, privateKeyPassword);
	}

	return decryptedDataPromise;
}

export default decryptAsync;
