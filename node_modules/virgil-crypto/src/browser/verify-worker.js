export default function(initialData, publicKey, sign) {
	let deferred = this.deferred();
	let virgilSigner = new VirgilCryptoWorkerContext.VirgilSigner();

	try {
		let signByteArray = VirgilCryptoWorkerContext.VirgilBase64.decode(sign);
		let dataByteArray = VirgilCryptoWorkerContext.VirgilBase64.decode(initialData);
		let publicKeyByteArray = VirgilCryptoWorkerContext.VirgilByteArray.fromUTF8(publicKey);
		let isVerified = virgilSigner.verify(dataByteArray, signByteArray, publicKeyByteArray);

		// cleanup memory to avoid memory leaks
		dataByteArray.delete();
		publicKeyByteArray.delete();
		signByteArray.delete();

		deferred.resolve(isVerified);
	} catch (e) {
		deferred.reject(e);
	} finally {
		virgilSigner.delete();
	}
}
