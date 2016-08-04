export default function(password, keysType) {
	let deferred = this.deferred();

	try {
		let passwordByteArray = VirgilCryptoWorkerContext.VirgilByteArray.fromUTF8(password);
		let virgilKeys = VirgilCryptoWorkerContext.VirgilKeyPair.generate(VirgilCryptoWorkerContext.VirgilKeyPair.Type[keysType], passwordByteArray);

		let publicKey = virgilKeys.publicKey().toUTF8();
		let privateKey = virgilKeys.privateKey().toUTF8(virgilKeys);

		// cleanup memory to avoid memory leaks
		passwordByteArray.delete();
		virgilKeys.delete();

		deferred.resolve({ publicKey: publicKey, privateKey: privateKey });
	} catch (e) {
		deferred.reject(e);
	}
};
