var VirgilCrypto = require('../../virgil_js.node');
var u = require('./utils');

module.exports = function encryptWithKeyMultiRecipients (initialData, recipients) {
	var virgilCipher = new VirgilCrypto.VirgilCipher();
	var recipientIdsByteArrays = [];

	var dataByteArray = u.toByteArray(initialData);

	recipients.forEach(function(recipient) {
		var recipientIdByteArray = u.toByteArray(recipient.recipientId);
		var publicKeyByteArray = u.toByteArray(recipient.publicKey);

		virgilCipher.addKeyRecipient(recipientIdByteArray, publicKeyByteArray);

		recipientIdsByteArrays.push(recipientIdByteArray);
	});

	var encryptedDataByteArray = virgilCipher.encrypt(dataByteArray, true);

	return u.byteArrayToBuffer(encryptedDataByteArray);
};
