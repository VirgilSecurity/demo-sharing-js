import _ from 'lodash';
import VirgilCrypto from './utils/crypto-module';
import * as CryptoUtils from './utils/crypto-utils';
import { throwVirgilError } from './utils/crypto-errors';

export function encryptWithKeyMultiRecipients (initialData, recipients) {
	let virgilCipher = new VirgilCrypto.VirgilCipher();
	let encryptedDataBuffer;
	let recipientIdsByteArrays = [];

	try {
		let dataByteArray = CryptoUtils.toByteArray(initialData);

		_.each(recipients, (recipient) => {
			let recipientIdByteArray = CryptoUtils.toByteArray(recipient.recipientId);
			let publicKeyByteArray = CryptoUtils.toByteArray(recipient.publicKey);

			virgilCipher.addKeyRecipient(recipientIdByteArray, publicKeyByteArray);

			recipientIdsByteArrays.push(recipientIdByteArray);
		});

		let encryptedDataByteArray = virgilCipher.encrypt(dataByteArray, true);
		encryptedDataBuffer = CryptoUtils.byteArrayToBuffer(encryptedDataByteArray);

		// cleanup memory to avoid memory leaks
		dataByteArray.delete();
		encryptedDataByteArray.delete();
		_.each(recipientIdsByteArrays, (recipientIdByteArray) => recipientIdByteArray.delete());
	} catch (e) {
		throwVirgilError('90008', { initialData: initialData, recipients: recipients });
	} finally {
		virgilCipher.delete();
	}

	return encryptedDataBuffer;
}

export default encryptWithKeyMultiRecipients;
