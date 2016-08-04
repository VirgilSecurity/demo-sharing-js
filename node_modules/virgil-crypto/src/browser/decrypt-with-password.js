import VirgilCrypto from './utils/crypto-module';
import * as CryptoUtils from './utils/crypto-utils';
import { throwVirgilError } from './utils/crypto-errors';

export function decryptWithPassword (initialEncryptedData, password = '') {
	let virgilCipher = new VirgilCrypto.VirgilCipher();
	let decryptedDataBuffer;

	try {
		let dataByteArray = CryptoUtils.toByteArray(initialEncryptedData);
		let passwordByteArray = CryptoUtils.toByteArray(password);
		let decryptedDataByteArray = virgilCipher.decryptWithPassword(dataByteArray, passwordByteArray);
		decryptedDataBuffer = CryptoUtils.byteArrayToBuffer(decryptedDataByteArray);

		// cleanup memory to avoid memory leaks
		dataByteArray.delete();
		passwordByteArray.delete();
		decryptedDataByteArray.delete();
	} catch (e) {
		throwVirgilError('90004', { initialData: initialEncryptedData, password: password });
	} finally {
		virgilCipher.delete();
	}

	return decryptedDataBuffer;
}

export default decryptWithPassword;
