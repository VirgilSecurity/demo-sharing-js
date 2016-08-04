import _ from 'lodash';
import VirgilCrypto from './utils/crypto-module';
import * as CryptoUtils from './utils/crypto-utils';
import KeysTypesEnum from '../lib/keys-types-enum';
import { throwVirgilError, throwValidationError } from './utils/crypto-errors';

/**
 * Generate the key pair - public and private keys
 *
 * @param [password = ''] {string}
 * @param [keysType = 'Default'] {string}
 * @returns {{publicKey: *, privateKey: *}}
 */
export function generateKeyPair (password, keysType) {
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
		throwValidationError('00001', { arg: 'password', type: 'String' });
	}

	if (_.isUndefined(keysType)) {
		throwValidationError('00002', { arg: 'keysType', type: ` second argument and must be equal to one of ${_.values(KeysTypesEnum).join(', ')} - use the KeysTypesEnum for it.` });
	}

	let virgilKeys;
	let publicKey;
	let privateKey;

	try {
		let passwordByteArray = CryptoUtils.toByteArray(password);
		virgilKeys = VirgilCrypto.VirgilKeyPair.generate(VirgilCrypto.VirgilKeyPair.Type[keysType], passwordByteArray);

		publicKey = virgilKeys.publicKey().toUTF8();
		privateKey = virgilKeys.privateKey().toUTF8();

		// cleanup memory to avoid memory leaks
		passwordByteArray.delete();
		virgilKeys.delete();
	} catch (e) {
		throwVirgilError('90007', { password: password });
	}

	return { publicKey, privateKey };
}

export default generateKeyPair;
