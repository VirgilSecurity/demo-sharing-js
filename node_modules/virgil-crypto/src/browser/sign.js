import _ from 'lodash';
export { Buffer } from 'buffer';
import VirgilCrypto from './utils/crypto-module';
import * as CryptoUtils from './utils/crypto-utils';
import { throwVirgilError, throwValidationError } from './utils/crypto-errors';

/**
 * Sign the encrypted data using private key
 *
 * @param data {string|Buffer}
 * @param privateKey {string}
 * @param [privateKeyPassword = ''] {string}
 * @returns {Buffer}
 */
export function sign (data, privateKey, privateKeyPassword = '') {
	if (!(_.isString(data) || Buffer.isBuffer(data))) {
		throwValidationError('00001', { arg: 'data', type: 'String or Buffer' });
	}

	if (!_.isString(privateKey)) {
		throwValidationError('00001', { arg: 'privateKey', type: 'String' });
	}

	let virgilSigner = new VirgilCrypto.VirgilSigner();
	let signBuffer;

	try {
		let dataByteArray = CryptoUtils.toByteArray(data);
		let privateKeyByteArray = CryptoUtils.toByteArray(privateKey);
		let privateKeyPasswordByteArray = CryptoUtils.toByteArray(privateKeyPassword);

		let sign = virgilSigner.sign(dataByteArray, privateKeyByteArray, privateKeyPasswordByteArray);
		signBuffer = CryptoUtils.byteArrayToBuffer(sign);

		// cleanup memory to avoid memory leaks
		dataByteArray.delete();
		privateKeyByteArray.delete();
		privateKeyPasswordByteArray.delete();
	} catch (e) {
		throwVirgilError('90005', { initialData: data, key: privateKey, password: privateKeyPassword });
	} finally {
		virgilSigner.delete();
	}

	return signBuffer;
}

export default sign;
