var VirgilCrypto = require('../../virgil_js.node');
var u = require('./utils');

module.exports = function encryptWithKey (initialData, recipientId, publicKey) {
	var virgilCipher = new VirgilCrypto.VirgilCipher();

	var dataByteArray = u.toByteArray(initialData);
	var recipientIdByteArray = u.toByteArray(recipientId);
	var publicKeyByteArray = u.toByteArray(publicKey);

	virgilCipher.addKeyRecipient(recipientIdByteArray, publicKeyByteArray);

	var encryptedDataByteArray = virgilCipher.encrypt(dataByteArray, true);

	return u.byteArrayToBuffer(encryptedDataByteArray);
};
