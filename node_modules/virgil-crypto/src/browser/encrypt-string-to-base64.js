import * as CryptoUtils from './utils/crypto-utils';
import encrypt from './encrypt';

export function encryptStringToBase64 (...args) {
	args[0] = CryptoUtils.stringToBuffer(args[0]);

	return encrypt(...args).toString('base64');
}

export default encryptStringToBase64;
