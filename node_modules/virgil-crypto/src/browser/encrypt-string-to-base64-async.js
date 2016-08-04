import * as CryptoUtils from './utils/crypto-utils';
import encryptAsync from './encrypt-async';

export function encryptStringToBase64Async (...args) {
	args[0] = CryptoUtils.stringToBuffer(args[0]);

	return encryptAsync(...args).then((encryptedDataBuffer) => encryptedDataBuffer.toString('base64'));
}

export default encryptStringToBase64Async;
