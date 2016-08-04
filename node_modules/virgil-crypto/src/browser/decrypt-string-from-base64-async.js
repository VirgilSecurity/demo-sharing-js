import * as CryptoUtils from './utils/crypto-utils';
import decryptAsync from './decrypt-async';

export function decryptStringFromBase64Async (...args) {
	args[0] = CryptoUtils.base64ToBuffer(args[0]);

	return decryptAsync(...args).then((decryptedDataBuffer) => decryptedDataBuffer.toString('utf8'));
}

export default decryptStringFromBase64Async;
