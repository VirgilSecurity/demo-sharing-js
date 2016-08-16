import CryptoWorkerApi from './crypto-worker-api';

/**
* Asynchronously decrypts the data with private key.
*
* @param {ArrayBuffer} encryptedData - The data to decrypt.
* @param {string} recipientId - Recipient Id that was used for encryption.
* @param {string} privateKey - Private key as base64 string.
* @param {string} privateKeyPassword - Private key password.
*
* @returns {Promise<Uint8Array>} A promise that will be resolved with decrypted data.
* */
export function decryptAsync(encryptedData, recipientId, privateKey, privateKeyPassword) {
    return CryptoWorkerApi.decryptWithKey(
        encryptedData,
        recipientId,
        privateKey,
        privateKeyPassword).then(
        (result) => result,
        () => { throw new Error('Could not decrypt the given data') });
}