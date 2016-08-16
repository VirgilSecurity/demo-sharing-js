import CryptoWorkerApi from './crypto-worker-api';

export function decryptAsync(encryptedData, recipientId, privateKey, privateKeyPassword) {
    return CryptoWorkerApi.decryptWithKey(
        encryptedData,
        recipientId,
        privateKey,
        privateKeyPassword).then(
        (result) => result,
        () => { throw new Error('Could not decrypt the given data') });
}