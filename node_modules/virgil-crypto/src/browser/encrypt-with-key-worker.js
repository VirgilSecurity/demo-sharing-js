export default function(initialData, recipientId, publicKey) {
	let deferred = this.deferred();
	let virgilCipher = new VirgilCryptoWorkerContext.VirgilCipher();

	try {
		let recipientIdByteArray = VirgilCryptoWorkerContext.VirgilByteArray.fromUTF8(recipientId);
		let dataByteArray = VirgilCryptoWorkerContext.VirgilBase64.decode(initialData);
		let publicKeyByteArray = VirgilCryptoWorkerContext.VirgilByteArray.fromUTF8(publicKey);

		virgilCipher.addKeyRecipient(recipientIdByteArray, publicKeyByteArray);
		let encryptedDataByteArray = virgilCipher.encrypt(dataByteArray, true);
		let encryptedDataBase64 = VirgilCryptoWorkerContext.VirgilBase64.encode(encryptedDataByteArray);

		// cleanup memory to avoid memory leaks
		recipientIdByteArray.delete();
		dataByteArray.delete();
		encryptedDataByteArray.delete();

		deferred.resolve(encryptedDataBase64);
	} catch (e) {
		deferred.reject(e);
	} finally {
		virgilCipher.delete();
	}
};
