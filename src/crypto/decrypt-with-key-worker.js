export function decryptWithKeyWorker (encryptedData, recipientId, privateKeyBase64, privateKeyPassword) {
    let deferred = this.deferred();
    let virgilCipher = new VirgilCryptoWorkerContext.VirgilStreamCipher();

    try {
        let dataSource = new VirgilCryptoWorkerContext.VirgilByteArrayDataSource(new Uint8Array(encryptedData));
        let recipientIdByteArray = VirgilCryptoWorkerContext.VirgilByteArray.fromUTF8(recipientId);
        let privateKeyByteArray = VirgilCryptoWorkerContext.VirgilBase64.decode(privateKeyBase64);
        let privateKeyPasswordByteArray = VirgilCryptoWorkerContext.VirgilByteArray.fromUTF8(privateKeyPassword);
        let decryptedDataSink = new VirgilCryptoWorkerContext.VirgilByteArrayDataSink();

        console.time('Decrypting');
        virgilCipher.decryptWithKey(dataSource, decryptedDataSink, recipientIdByteArray, privateKeyByteArray, privateKeyPasswordByteArray);
        console.timeEnd('Decrypting');

        let decryptedDataUInt8Array = decryptedDataSink.getBytes();

        // cleanup memory to avoid memory leaks
        dataSource.delete();
        recipientIdByteArray.delete();
        privateKeyByteArray.delete();
        privateKeyPasswordByteArray.delete();
        decryptedDataSink.delete();

        deferred.resolve(decryptedDataUInt8Array);
    } catch (e) {
        deferred.reject(e);
    } finally {
        virgilCipher.delete();
    }
}
