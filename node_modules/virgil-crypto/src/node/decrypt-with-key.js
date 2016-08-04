var VirgilCrypto = require('../../virgil_js.node');
var u = require('./utils');

module.exports = function decryptWithKey (initialEncryptedData, recipientId, privateKey, privateKeyPassword) {
	privateKeyPassword = privateKeyPassword || '';

	var virgilCipher = new VirgilCrypto.VirgilCipher();

	var recipientIdByteArray = u.toByteArray(recipientId);
	var dataByteArray = u.toByteArray(initialEncryptedData);
	var privateKeyByteArray = u.toByteArray(privateKey);
	var privateKeyPasswordByteArray = u.toByteArray(privateKeyPassword);

	var decryptedDataByteArray = virgilCipher.decryptWithKey(dataByteArray, recipientIdByteArray, privateKeyByteArray, privateKeyPasswordByteArray);

	return u.byteArrayToBuffer(decryptedDataByteArray);
};
