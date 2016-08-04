var VirgilCrypto = require('../../virgil_js.node');
var u = require('./utils');

module.exports = function obfuscate (value, salt, algorithm, iterations) {
	iterations = iterations || 2048;
	algorithm = algorithm || VirgilCrypto.VirgilPBKDF.Hash_SHA384;

	var pbkdf = new VirgilCrypto.VirgilPBKDF(u.toByteArray(salt), iterations);
	pbkdf.setHash(algorithm);
	return u.byteArrayToBuffer(pbkdf.derive(u.toByteArray(value))).toString('base64');
};
