export default function(initialData, password, isEmbeddedContentInfo) {
	let deferred = this.deferred();
	let virgilCipher = new VirgilCryptoWorkerContext.VirgilCipher();

	try {
		let dataByteArray = VirgilCryptoWorkerContext.VirgilBase64.decode(initialData);
		let passwordByteArray;

		if (password) {
			passwordByteArray = VirgilCryptoWorkerContext.VirgilByteArray.fromUTF8(password);
			virgilCipher.addPasswordRecipient(passwordByteArray);
		}

		let encryptedDataByteArray = virgilCipher.encrypt(dataByteArray, isEmbeddedContentInfo);
		let encryptedDataBase64 = VirgilCryptoWorkerContext.VirgilBase64.encode(encryptedDataByteArray);

		// cleanup memory to avoid memory leaks
		dataByteArray.delete();
		if (passwordByteArray) {
			passwordByteArray.delete();
		}

		deferred.resolve(encryptedDataBase64);
	} catch (e) {
		deferred.reject(e);
	} finally {
		virgilCipher.delete();
	}
}
