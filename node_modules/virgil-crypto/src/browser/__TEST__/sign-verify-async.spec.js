import { VirgilCrypto } from '../../../browser';

const PASSWORD = 'veryStrongPa$$0rd';
const INITIAL_DATA = 'initial data';

describe('signAsync/verifyAsync', () => {

	it('signed data should be verified', async (cb) => {
		let keyPair = VirgilCrypto.generateKeyPair(PASSWORD);
		let encryptedData = VirgilCrypto.encrypt(INITIAL_DATA, keyPair.publicKey, keyPair.publicKey);
		let sign = await VirgilCrypto.signAsync(encryptedData, keyPair.privateKey, PASSWORD);
		let verified = await VirgilCrypto.verifyAsync(encryptedData, keyPair.publicKey, sign);

		expect(verified).toEqual(true);
		cb();
	});

});
