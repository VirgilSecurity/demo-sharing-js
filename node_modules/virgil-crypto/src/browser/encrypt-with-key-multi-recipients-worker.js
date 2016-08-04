export default function(initialData, recipients) {
	let deferred = this.deferred();
	let virgilCipher = new VirgilCryptoWorkerContext.VirgilCipher();
	let dataByteArray = VirgilCryptoWorkerContext.VirgilBase64.decode(initialData);

	try {
		let recipientIdsByteArrays = [];

		for (let i = 0, l = recipients.length; i < l; i++) {
			var recipient = recipients[i];

			let recipientIdByteArray = VirgilCryptoWorkerContext.VirgilByteArray.fromUTF8(recipient.recipientId);
			let publicKeyByteArray = VirgilCryptoWorkerContext.VirgilByteArray.fromUTF8(recipient.publicKey);

			virgilCipher.addKeyRecipient(recipientIdByteArray, publicKeyByteArray);
			recipientIdsByteArrays.push(recipientIdByteArray);
		}

		let encryptedDataByteArray = virgilCipher.encrypt(dataByteArray, true);
		let encryptedDataBase64 = VirgilCryptoWorkerContext.VirgilBase64.encode(encryptedDataByteArray);

		// cleanup memory to avoid memory leaks
		dataByteArray.delete();
		encryptedDataByteArray.delete();

		for (let j = 0, rsl = recipientIdsByteArrays.length; j < rsl; j++) {
			recipientIdsByteArrays[j].delete();
		}

		deferred.resolve(encryptedDataBase64);
	} catch (e) {
		deferred.reject(e);
	} finally {
		virgilCipher.delete();
	}
};
