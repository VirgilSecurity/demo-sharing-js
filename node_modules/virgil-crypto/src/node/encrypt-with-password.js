var _ = require('lodash');
var VirgilCrypto = require('../../virgil_js.node');
var u = require('./utils');

module.exports = function encryptWithPassword (initialData, password, isEmbeddedContentInfo) {
	password = password || '';
	isEmbeddedContentInfo = _.isBoolean(isEmbeddedContentInfo) ? isEmbeddedContentInfo : true;

	var virgilCipher = new VirgilCrypto.VirgilCipher();

	var dataByteArray = u.toByteArray(initialData);

	if (password) {
		virgilCipher.addPasswordRecipient(u.toByteArray(password));
	}

	var encryptedDataByteArray = virgilCipher.encrypt(dataByteArray, isEmbeddedContentInfo);

	return u.byteArrayToBuffer(encryptedDataByteArray);
};
