import _ from 'lodash';
export { Buffer } from 'buffer';
import { decryptWithPassword } from './decrypt-with-password';
import { decryptWithKey } from './decrypt-with-key';
import { throwValidationError } from './utils/crypto-errors';

/**
 * Decrypt data
 *
 * @param initialEncryptedData {Buffer}
 * @param recipientId {string}
 * @param [privateKey] {string}
 * @param [privateKeyPassword = ''] {string}
 * @returns {Buffer}
 */
export function decrypt (initialEncryptedData, recipientId, privateKey, privateKeyPassword = '') {
	if (!Buffer.isBuffer(initialEncryptedData)) {
		throwValidationError('00001', { arg: 'initialEncryptedData', type: 'Buffer' });
	}

	if (!_.isString(recipientId)) {
		throwValidationError('00001', { arg: 'recipientId', type: 'String' });
	}

	let decryptedData;

	if (arguments.length === 2) {
		let password = recipientId;

		decryptedData = decryptWithPassword(initialEncryptedData, password);
	} else {
		decryptedData = decryptWithKey(initialEncryptedData, recipientId, privateKey, privateKeyPassword);
	}

	return decryptedData;
}

export default decrypt;
