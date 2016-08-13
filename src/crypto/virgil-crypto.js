import Virgil from './crypto-module';
import * as CryptoUtils from './utils/crypto-utils';
import CryptoWorkerApi from './crypto-worker-api';
import { VirgilBufferDataSource } from './virgil-buffer-data-source';
import { VirgilBufferDataSink } from './virgil-buffer-data-sink';


export function decrypt(encryptedData, recipientId, privateKey, privateKeyPassword) {
    let cipher = new Virgil.VirgilStreamCipher();
    let decryptedDataBuffer;
    let dataSource = new VirgilBufferDataSource(encryptedData);
    let recipientIdByteArray = CryptoUtils.toByteArray(recipientId);
    let privateKeyByteArray = CryptoUtils.toByteArray(privateKey);
    let privateKeyPasswordByteArray = CryptoUtils.toByteArray(privateKeyPassword);
    let decryptedSink = new VirgilBufferDataSink();

    try {
        cipher.decryptWithKey(dataSource, decryptedSink, recipientIdByteArray, privateKeyByteArray, privateKeyPasswordByteArray);
        decryptedDataBuffer = decryptedSink.getBytes();
    } catch(e) {
        console.log(e);
        throw new Error('Could not decrypt the given data');
    } finally {
        cipher.delete();
        dataSource.delete();
        recipientIdByteArray.delete();
        privateKeyByteArray.delete();
        privateKeyPasswordByteArray.delete();
        decryptedSink.delete();
    }

    return decryptedDataBuffer;
}

export function decryptAsync(encryptedData, recipientId, privateKey, privateKeyPassword) {
    return CryptoWorkerApi.decryptWithKey(
        encryptedData.buffer,
        recipientId,
        CryptoUtils.toBase64(privateKey),
        privateKeyPassword).then(
        (result) => result,
        () => { throw new Error('Could not decrypt the given data') });
}