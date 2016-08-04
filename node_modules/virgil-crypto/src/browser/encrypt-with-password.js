import _ from 'lodash';
import VirgilCrypto from './utils/crypto-module';
import * as CryptoUtils from './utils/crypto-utils';
import { throwVirgilError } from './utils/crypto-errors';

export function encryptWithPassword (initialData, password = '', isEmbeddedContentInfo = true) {
	let virgilCipher = new VirgilCrypto.VirgilCipher();
	let encryptedDataBuffer;

	try {
		let dataByteArray = CryptoUtils.toByteArray(initialData);
		let passwordByteArray;

		if (password) {
			passwordByteArray = CryptoUtils.toByteArray(password);
			virgilCipher.addPasswordRecipient(passwordByteArray);
		}

		let encryptedDataByteArray = virgilCipher.encrypt(dataByteArray, isEmbeddedContentInfo);
		encryptedDataBuffer = CryptoUtils.byteArrayToBuffer(encryptedDataByteArray);

		// cleanup memory to avoid memory leaks
		dataByteArray.delete();
		if (passwordByteArray) {
			passwordByteArray.delete();
		}
	} catch (e) {
		throwVirgilError('90003', { initialData: initialData, password: password });
	} finally {
		virgilCipher.delete();
	}

	return encryptedDataBuffer;
}

export default encryptWithPassword;
