export default function(initialEncryptedData, recipientId, privateKeyBase64, privateKeyPassword) {
	let deferred = this.deferred();
	let virgilCipher = new VirgilCryptoWorkerContext.VirgilCipher();

	try {
		let recipientIdByteArray = VirgilCryptoWorkerContext.VirgilByteArray.fromUTF8(recipientId);
		let dataByteArray = VirgilCryptoWorkerContext.VirgilBase64.decode(initialEncryptedData);
		let privateKeyByteArray = VirgilCryptoWorkerContext.VirgilBase64.decode(privateKeyBase64);
		let privateKeyPasswordByteArray = VirgilCryptoWorkerContext.VirgilByteArray.fromUTF8(privateKeyPassword);
		let decryptedDataByteArray = virgilCipher.decryptWithKey(dataByteArray, recipientIdByteArray, privateKeyByteArray, privateKeyPasswordByteArray);
		let decryptedDataBase64 = VirgilCryptoWorkerContext.VirgilBase64.encode(decryptedDataByteArray);

		// cleanup memory to avoid memory leaks
		recipientIdByteArray.delete();
		dataByteArray.delete();
		privateKeyByteArray.delete();
		decryptedDataByteArray.delete();
		privateKeyPasswordByteArray.delete();

		deferred.resolve(decryptedDataBase64);
	} catch (e) {
		deferred.reject(e);
	} finally {
		virgilCipher.delete();
	}
}
