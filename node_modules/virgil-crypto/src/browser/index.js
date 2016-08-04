import { wrapper } from './utils/crypto-utils';
import Virgil from './utils/crypto-module';

wrapper.wrapPrototype(Virgil, 'VirgilTinyCipher');

export { encrypt } from './encrypt';
export { encryptStringToBase64 } from './encrypt-string-to-base64';
export { encryptAsync } from './encrypt-async';
export { encryptStringToBase64Async } from './encrypt-string-to-base64-async';
export { decrypt } from './decrypt';
export { decryptStringFromBase64 } from './decrypt-string-from-base64';
export { decryptAsync } from './decrypt-async';
export { decryptStringFromBase64Async } from './decrypt-string-from-base64-async';
export { sign } from './sign';
export { signAsync } from './sign-async';
export { verify } from './verify';
export { verifyAsync } from './verify-async';
export { generateKeyPair } from './generate-key-pair';
export { generateKeyPairAsync } from './generate-key-pair-async';
export { generateValidationToken } from './generate-validation-token';
export { changePrivateKeyPassword } from './change-private-key-password';
export { obfuscate } from './obfuscate';
export { default as KeysTypesEnum } from '../lib/keys-types-enum';
export { default as IdentityTypesEnum } from '../lib/identity-types';
export const PBKDFHashTypes = Virgil.VirgilPBKDFHash;
export const VirgilTinyCipher = Virgil.VirgilTinyCipher;
