import _ from 'lodash';
import { encryptWithPasswordAsync } from './encrypt-with-password-async';
import { encryptWithKeyAsync } from './encrypt-with-key-async';
import { encryptWithKeyMultiRecipientsAsync } from './encrypt-with-key-multi-recipients-async';
import { throwValidationError } from './utils/crypto-errors';

/**
 * Encrypt data async
 *
 * @param initialData {string|Buffer}
 * @param recipientId {string|Array}
 * @param [publicKey] {string}
 *
 * @returns {Promise}
 */
export function encryptAsync (initialData, recipientId, publicKey) {
	if (!(_.isString(initialData) || Buffer.isBuffer(initialData))) {
		throwValidationError('00001', { arg: 'initialData', type: 'String or Buffer' });
	}

	if (!(_.isString(recipientId) || _.isArray(recipientId))) {
		throwValidationError('00001', { arg: 'recipientId', type: 'String or Array' });
	}

	let encryptedDataPromise;

	if (_.isArray(recipientId)) {
		let recipients = recipientId;

		encryptedDataPromise = encryptWithKeyMultiRecipientsAsync(initialData, recipients);
	} else if (_.isString(recipientId) && _.isString(publicKey)) {
		encryptedDataPromise = encryptWithKeyAsync(initialData, recipientId, publicKey);
	} else {
		let password = recipientId;
		let isEmbeddedContentInfo = publicKey;

		encryptedDataPromise = encryptWithPasswordAsync(initialData, password, isEmbeddedContentInfo);
	}

	return encryptedDataPromise;
}

export default encryptAsync;
