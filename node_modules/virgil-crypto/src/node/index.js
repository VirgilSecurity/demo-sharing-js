var Virgil = require('../../virgil_js');
var wrapper = require('../lib/wrapper')(require('./utils'));
wrapper.wrapPrototype(Virgil, 'VirgilTinyCipher');

module.exports = {
	KeysTypesEnum: require('../lib/keys-types-enum'),
	IdentityTypesEnum: require('../lib/identity-types'),
	PBKDFHashTypes: require('./PBKDF-hash-types'),
	generateKeyPair: require('./generate-key-pair'),
	encrypt: require('./encrypt'),
	encryptStringToBase64: require('./encrypt-string-to-base64'),
	decrypt: require('./decrypt'),
	decryptStringFromBase64: require('./decrypt-string-from-base64'),
	sign: require('./sign'),
	verify: require('./verify'),
	generateValidationToken: require('./generate-validation-token'),
	obfuscate: require('./obfuscate'),
	changePrivateKeyPassword: require('./change-private-key-password'),
	VirgilTinyCipher: Virgil.VirgilTinyCipher
};
