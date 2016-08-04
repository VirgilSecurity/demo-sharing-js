import VirgilCrypto from './utils/crypto-module';
import * as CryptoUtils from './utils/crypto-utils';
import { throwVirgilError } from './utils/crypto-errors';

export function decryptWithKey (initialEncryptedData, recipientId, privateKey, privateKeyPassword = '') {
	let virgilCipher = new VirgilCrypto.VirgilCipher();
	let decryptedDataBuffer;

	try {
		let recipientIdByteArray = CryptoUtils.toByteArray(recipientId);
		let dataByteArray = CryptoUtils.toByteArray(initialEncryptedData);
		let privateKeyByteArray = CryptoUtils.toByteArray(privateKey);
		let privateKeyPasswordByteArray = CryptoUtils.toByteArray(privateKeyPassword);
		let decryptedDataByteArray = virgilCipher.decryptWithKey(dataByteArray, recipientIdByteArray, privateKeyByteArray, privateKeyPasswordByteArray);
		decryptedDataBuffer = CryptoUtils.byteArrayToBuffer(decryptedDataByteArray);

		// cleanup memory to avoid memory leaks
		recipientIdByteArray.delete();
		dataByteArray.delete();
		privateKeyByteArray.delete();
		decryptedDataByteArray.delete();
		privateKeyPasswordByteArray.delete();
	} catch (e) {
		throwVirgilError('90002', { initialData: initialEncryptedData, key: privateKey });
	} finally {
		virgilCipher.delete();
	}

	return decryptedDataBuffer;
}

export default decryptWithKey;
