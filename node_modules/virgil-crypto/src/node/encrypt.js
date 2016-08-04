var _ = require('lodash');
var encryptWithKeyMultiRecipients = require('./encrypt-with-key-multi-recipients');
var encryptWithKey = require('./encrypt-with-key');
var encryptWithPassword = require('./encrypt-with-password');

/**
 * Encrypt data
 *
 * @param initialData {string|Buffer}
 * @param recipientId {string|Array} - [{ recipientId: <string>, publicKey: <string> }]
 * @param [publicKey] {string}
 *
 * @returns {Buffer}
 */
module.exports = function encrypt (initialData, recipientId, publicKey) {
	if (!(_.isString(initialData) || Buffer.isBuffer(initialData))) {
		throw new TypeError('The argument `password` must be a String or Buffer');
	}

	if (!(_.isString(recipientId) || _.isArray(recipientId))) {
		throw new TypeError('The argument `password` must be a String or Array');
	}

	var encryptedData;

	if (_.isArray(recipientId)) {
		var recipients = recipientId;

		encryptedData = encryptWithKeyMultiRecipients(initialData, recipients);
	} else if (_.isString(recipientId) && _.isString(publicKey)) {
		encryptedData = encryptWithKey(initialData, recipientId, publicKey);
	} else {
		var password = recipientId;
		var isEmbeddedContentInfo = publicKey;

		encryptedData = encryptWithPassword(initialData, password, isEmbeddedContentInfo);
	}

	return encryptedData;
};
