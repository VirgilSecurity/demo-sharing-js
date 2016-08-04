import _ from 'lodash';
export { Buffer } from 'buffer';
import VirgilCrypto from './utils/crypto-module';
import * as CryptoUtils from './utils/crypto-utils';
import { throwVirgilError, throwValidationError } from './utils/crypto-errors';

/**
 * Verify signed data using public key
 *
 * @param data {string|Buffer}
 * @param publicKey {string}
 * @param sign {string|Buffer}
 * @returns {boolean}
 */
export function verify (data, publicKey, sign) {
	if (!(_.isString(data) || Buffer.isBuffer(data))) {
		throwValidationError('00001', { arg: 'data', type: 'String or Buffer' });
	}

	if (!_.isString(publicKey)) {
		throwValidationError('00001', { arg: 'publicKey', type: 'String' });
	}

	if (!(_.isString(sign) || Buffer.isBuffer(sign))) {
		throwValidationError('00001', { arg: 'sign', type: 'base64 String or Buffer' });
	}

	let virgilSigner = new VirgilCrypto.VirgilSigner();
	let isVerified;

	try {
		let dataByteArray = CryptoUtils.toByteArray(data);
		let publicKeyByteArray = CryptoUtils.toByteArray(publicKey);
		let signByteArray = Buffer.isBuffer(sign) ? CryptoUtils.toByteArray(sign) : CryptoUtils.toByteArray(new Buffer(sign, 'base64'));

		isVerified = virgilSigner.verify(dataByteArray, signByteArray, publicKeyByteArray);

		// cleanup memory to avoid memory leaks
		dataByteArray.delete();
		publicKeyByteArray.delete();
		signByteArray.delete();
	} catch (e) {
		throwVirgilError('90006', { initialData: data, key: publicKey, sign: sign });
	} finally {
		virgilSigner.delete();
	}

	return isVerified;
}

export default verify;
