var _ = require('lodash');
var VirgilCrypto = require('../../virgil_js.node');
var u = require('./utils');

/**
 * Sign the encrypted data using private key
 *
 * @param data {string|Buffer}
 * @param privateKey {string}
 * @param [privateKeyPassword = ''] {string}
 * @returns {Buffer}
 */
module.exports = function sign (data, privateKey, privateKeyPassword) {
	privateKeyPassword = privateKeyPassword || '';

	if (!(_.isString(data) || Buffer.isBuffer(data))) {
		throw new TypeError('The argument `data` must be a String or Buffer');
	}

	if (!_.isString(privateKey)) {
		throw new TypeError('The argument `privateKey` must be a String');
	}

	var virgilSigner = new VirgilCrypto.VirgilSigner();

	var dataByteArray = u.toByteArray(data);
	var privateKeyByteArray = u.toByteArray(privateKey);
	var privateKeyPasswordByteArray = u.toByteArray(privateKeyPassword);

	var sign = virgilSigner.sign(dataByteArray, privateKeyByteArray, privateKeyPasswordByteArray);

	return u.byteArrayToBuffer(sign);
};
