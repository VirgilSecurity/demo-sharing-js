import VirgilCrypto from './utils/crypto-module';
import * as u from './utils/crypto-utils';
import { throwVirgilError, throwValidationError } from './utils/crypto-errors';

export function obfuscate (value, salt, algorithm, iterations) {
	iterations = iterations || 2048;
	algorithm = algorithm || VirgilCrypto.VirgilPBKDFHash.SHA384;
	var pbkdf = new VirgilCrypto.VirgilPBKDF(u.toByteArray(salt), iterations);
	pbkdf.setHash(algorithm);
	return u.byteArrayToBuffer(pbkdf.derive(u.toByteArray(value), 0)).toString('base64');
};
