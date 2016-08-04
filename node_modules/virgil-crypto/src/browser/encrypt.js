import _ from 'lodash';
export { Buffer } from 'buffer';
import { encryptWithPassword } from './encrypt-with-password';
import { encryptWithKey } from './encrypt-with-key';
import { encryptWithKeyMultiRecipients } from './encrypt-with-key-multi-recipients';
import { throwValidationError } from './utils/crypto-errors';

/**
 * Encrypt data
 *
 * @param initialData {string|Buffer}
 * @param recipientId {string|Array} - [{ recipientId: <string>, publicKey: <string> }]
 * @param [publicKey] {string}
 *
 * @returns {Buffer}
 */
export function encrypt (initialData, recipientId, publicKey) {
	if (!(_.isString(initialData) || Buffer.isBuffer(initialData))) {
		throwValidationError('00001', { arg: 'initialData', type: 'String or Buffer' });
	}

	if (!(_.isString(recipientId) || _.isArray(recipientId))) {
		throwValidationError('00001', { arg: 'recipientId', type: 'String or Array' });
	}

	let encryptedData;

	if (_.isArray(recipientId)) {
		let recipients = recipientId;

		encryptedData = encryptWithKeyMultiRecipients(initialData, recipients);
	} else if (_.isString(recipientId) && _.isString(publicKey)) {
		encryptedData = encryptWithKey(initialData, recipientId, publicKey);
	} else {
		let password = recipientId;
		let isEmbeddedContentInfo = publicKey;

		encryptedData = encryptWithPassword(initialData, password, isEmbeddedContentInfo);
	}

	return encryptedData;
}

export default encrypt;
