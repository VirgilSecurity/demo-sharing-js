import * as CryptoUtils from './utils/crypto-utils';
import decrypt from './decrypt';

export function decryptStringFromBase64 (...args) {
	args[0] = CryptoUtils.base64ToBuffer(args[0]);

	return decrypt(...args).toString('utf8');
}

export default decryptStringFromBase64;
