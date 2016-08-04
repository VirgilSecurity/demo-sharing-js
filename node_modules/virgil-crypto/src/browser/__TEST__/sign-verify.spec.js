import { VirgilCrypto } from '../../../browser';

const PASSWORD = 'veryStrongPa$$0rd';
const INITIAL_DATA = 'initial data';

describe('sign/verify', () => {

	it('signed data should be verified', () => {
		let keyPair = VirgilCrypto.generateKeyPair(PASSWORD);
		let encryptedData = VirgilCrypto.encrypt(INITIAL_DATA, keyPair.publicKey, keyPair.publicKey);
		let sign = VirgilCrypto.sign(encryptedData, keyPair.privateKey, PASSWORD);
		let verified = VirgilCrypto.verify(encryptedData, keyPair.publicKey, sign);

		expect(verified).toEqual(true);
	});

});
