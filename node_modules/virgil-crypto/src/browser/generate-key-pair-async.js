import browser from 'bowser';
import * as CryptoUtils from './utils/crypto-utils';
import KeysTypesEnum from '../lib/keys-types-enum';
import CryptoWorkerApi from './crypto-worker-api';
import { throwVirgilError, throwValidationError } from './utils/crypto-errors';
import { generateKeyPair } from './generate-key-pair';

/**
 * Generate the key pair - public and private keys using workers
 *
 * @param [password = ''] {string}
 * @param [keysType = 'Default'] {string}
 * @returns {Promise}
 */
export function generateKeyPairAsync (password, keysType) {
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
		throwValidationError('00002', { arg: 'keysType', type: `equal to one of ${_.values(KeysTypesEnum).join(', ')} - use the KeysTypesEnum for it.` });
	}

	if (browser.msie || browser.msedge) {
		return new Promise((resolve, reject) => {
			try {
				resolve(generateKeyPair(password, keysType));
			} catch (e) {
				reject(e.message);
			}
		});
	} else {
		return CryptoWorkerApi.generateKeyPair(password, keysType).catch(() => throwVirgilError('90007', { password: password }));
	}
}

export default generateKeyPairAsync;
