var _ = require('lodash');
var VirgilCrypto = require('../../virgil_js.node');
var u = require('./utils');

/**
 * Verify signed data using public key
 *
 * @param data {string|Buffer}
 * @param publicKey {string}
 * @param sign {string|Buffer}
 * @returns {boolean}
 */
module.exports = function verify (data, publicKey, sign) {
	if (!(_.isString(data) || Buffer.isBuffer(data))) {
		throw new TypeError('The argument `data` must be a String or Buffer');
	}

	if (!_.isString(publicKey)) {
		throw new TypeError('The argument `publicKey` must be a String');
	}

	if (!(_.isString(sign) || Buffer.isBuffer(sign))) {
		throw new TypeError('The argument `sign` must be a base64 String or Buffer');
	}

	var virgilSigner = new VirgilCrypto.VirgilSigner();

	var dataByteArray = u.toByteArray(data);
	var publicKeyByteArray = u.toByteArray(publicKey);
	var signByteArray = Buffer.isBuffer(sign) ? u.toByteArray(sign) : u.toByteArray(new Buffer(sign, 'base64'));

	return virgilSigner.verify(dataByteArray, signByteArray, publicKeyByteArray);
};
