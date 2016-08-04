var VirgilCrypto = require('../../virgil_js.node');
var u = require('./utils');

module.exports = function decryptWithPassword (initialEncryptedData, password) {
	password = password || '';

	var virgilCipher = new VirgilCrypto.VirgilCipher();

	var dataByteArray = u.toByteArray(initialEncryptedData);
	var passwordByteArray = u.toByteArray(password);

	var decryptedDataByteArray = virgilCipher.decryptWithPassword(dataByteArray, passwordByteArray);

	return u.byteArrayToBuffer(decryptedDataByteArray);
};
