export default function(initialEncryptedData, password) {
	let deferred = this.deferred();
	let virgilCipher = new VirgilCryptoWorkerContext.VirgilCipher();

	try {
		let dataByteArray = VirgilCryptoWorkerContext.VirgilBase64.decode(initialEncryptedData);
		let passwordByteArray = VirgilCryptoWorkerContext.VirgilByteArray.fromUTF8(password);
		let decryptedDataByteArray = virgilCipher.decryptWithPassword(dataByteArray, passwordByteArray);
		let decryptedData = VirgilCryptoWorkerContext.VirgilBase64.encode(decryptedDataByteArray);

		// cleanup memory to avoid memory leaks
		dataByteArray.delete();
		passwordByteArray.delete();
		decryptedDataByteArray.delete();

		deferred.resolve(decryptedData);
	} catch (e) {
		deferred.reject(e);
	} finally {
		virgilCipher.delete();
	}
};
