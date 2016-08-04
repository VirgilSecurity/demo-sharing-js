import _ from 'lodash';
import VirgilCrypto from './utils/crypto-module';
import * as CryptoUtils from './utils/crypto-utils';
import { throwVirgilError } from './utils/crypto-errors';

export function encryptWithKey (initialData, recipientId, publicKey) {
	let virgilCipher = new VirgilCrypto.VirgilCipher();
	let encryptedDataBuffer;

	try {
		let recipientIdByteArray = CryptoUtils.toByteArray(recipientId);
		let dataByteArray = CryptoUtils.toByteArray(initialData);
		let publicKeyByteArray = CryptoUtils.toByteArray(publicKey);

		virgilCipher.addKeyRecipient(recipientIdByteArray, publicKeyByteArray);
		let encryptedDataByteArray = virgilCipher.encrypt(dataByteArray, true);
		encryptedDataBuffer = CryptoUtils.byteArrayToBuffer(encryptedDataByteArray);

		// cleanup memory to avoid memory leaks
		recipientIdByteArray.delete();
		dataByteArray.delete();
		encryptedDataByteArray.delete();
	} catch (e) {
		throwVirgilError('90001', { initialData: initialData, key: publicKey });
	} finally {
		virgilCipher.delete();
	}

	return encryptedDataBuffer;
}

export default encryptWithKey;
