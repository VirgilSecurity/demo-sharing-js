var _ = require('lodash');
var decryptWithKey = require('./decrypt-with-key');
var decryptWithPassword = require('./decrypt-with-password');

module.exports = function decrypt (initialEncryptedData, recipientId, privateKey, privateKeyPassword) {
	privateKeyPassword = privateKeyPassword || '';

	if (!Buffer.isBuffer(initialEncryptedData)) {
		throw new TypeError('The argument `initialEncryptedData` must be a Buffer');
	}

	if (!_.isString(recipientId)) {
		throw new TypeError('The argument `recipientId` must be a String');
	}

	var decryptedData;

	if (arguments.length === 2) {
		var password = recipientId;

		decryptedData = decryptWithPassword(initialEncryptedData, password);
	} else {
		decryptedData = decryptWithKey(initialEncryptedData, recipientId, privateKey, privateKeyPassword);
	}

	return decryptedData;
};
