var _ = require('lodash');
var VirgilCrypto = require('../../virgil_js.node');
var KeysTypesEnum = require('../lib/keys-types-enum');
var u = require('./utils');

/**
 * Generate the key pair - public and private keys
 *
 * @param [password = ''] {string}
 * @param [keysType = 'Default'] {string}
 * @returns {{publicKey: *, privateKey: *}}
 */
module.exports = function generateKeyPair (password, keysType) {
	switch (arguments.length) {
		case 1:
			if (KeysTypesEnum[password]) {
				keysType = KeysTypesEnum[password];
				password = '';
			} else {
				keysType = KeysTypesEnum.Default;
			}
			break;

		case 2:
			keysType = KeysTypesEnum[keysType];
			break;

		case 0:
		default:
			password = '';
			keysType = KeysTypesEnum.Default;
			break;
	}

	if (!_.isString(password)) {
		throw new TypeError('The argument `password` must be a String');
	}

	if (_.isUndefined(keysType)) {
		throw new TypeError('The argument `keysType` must be an equal to one of ' + _.values(KeysTypesEnum).join(', ') + ' - use the KeysTypesEnum for it.');
	}

	var virgilKeys;

	// TODO: will be fine to have some kind of enum like in asmjs VirgilCrypto.VirgilKeyPair.Type[keysType]
	// convert into nodejs specific key type property name
	keysType = 'Type_' + keysType;

	if (password) {
		virgilKeys = new VirgilCrypto.VirgilKeyPair.generate(VirgilCrypto.VirgilKeyPair[keysType], u.stringToByteArray(password));
	} else {
		virgilKeys = new VirgilCrypto.VirgilKeyPair.generate(VirgilCrypto.VirgilKeyPair[keysType]);
	}

	return {
		privateKey: u.byteArrayToString(virgilKeys.privateKey()),
		publicKey: u.byteArrayToString(virgilKeys.publicKey())
	};
};
