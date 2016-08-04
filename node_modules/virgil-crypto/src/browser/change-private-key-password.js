import _ from 'lodash';
import VirgilCrypto from './utils/crypto-module';
import * as u from './utils/crypto-utils';

export function changePrivateKeyPassword (privateKey, oldPassword, newPassword) {
	if (!_.isString(privateKey)) {
		throw new TypeError('Private key must be string');
	}

	if (!_.isString(oldPassword)) {
		throw new TypeError('Old password must be string');
	}

	if (!_.isString(newPassword)) {
		throw new TypeError('New password must be string');
	}

	return u.byteArrayToBuffer(VirgilCrypto.VirgilKeyPair.resetPrivateKeyPassword(
		u.toByteArray(privateKey),
		u.toByteArray(oldPassword),
		u.toByteArray(newPassword)
	)).toString('utf8');
};
