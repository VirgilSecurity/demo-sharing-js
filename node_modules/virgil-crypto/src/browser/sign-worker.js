export default function(initialData, privateKeyBase64, privateKeyPassword) {
	let deferred = this.deferred();
	let virgilSigner = new VirgilCryptoWorkerContext.VirgilSigner();

	try {
		let dataByteArray = VirgilCryptoWorkerContext.VirgilBase64.decode(initialData);
		let privateKeyByteArray = VirgilCryptoWorkerContext.VirgilBase64.decode(privateKeyBase64);
		let privateKeyPasswordByteArray = VirgilCryptoWorkerContext.VirgilByteArray.fromUTF8(privateKeyPassword);

		let sign = virgilSigner.sign(dataByteArray, privateKeyByteArray, privateKeyPasswordByteArray);
		let signBase64 = VirgilCryptoWorkerContext.VirgilBase64.encode(sign);

		// cleanup memory to avoid memory leaks
		dataByteArray.delete();
		privateKeyByteArray.delete();
		privateKeyPasswordByteArray.delete();

		deferred.resolve(signBase64);
	} catch (e) {
		deferred.reject(e);
	} finally {
		virgilSigner.delete();
	}
}
