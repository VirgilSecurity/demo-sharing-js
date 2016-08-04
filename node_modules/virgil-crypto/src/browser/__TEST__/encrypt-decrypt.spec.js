import { VirgilCrypto } from '../../../browser';

const PASSWORD = 'veryStrongPa$$0rd';
const INITIAL_DATA = 'initial data';

describe('encrypt/decrypt', () => {

	function encryptDecryptUsingKeyPair(initialData, keysType, password = '') {
		let keyPair = VirgilCrypto.generateKeyPair(password, keysType);
		let encryptedData = VirgilCrypto.encrypt(initialData, keyPair.publicKey, keyPair.publicKey);
		let decryptedData = VirgilCrypto.decrypt(encryptedData, keyPair.publicKey, keyPair.privateKey, password);

		return decryptedData.toString('utf8');
	}

	it('using password', () => {
		let encryptedData = VirgilCrypto.encrypt(INITIAL_DATA, PASSWORD);
		let decryptedData = VirgilCrypto.decrypt(encryptedData, PASSWORD);

		expect(decryptedData.toString('utf8')).toEqual(INITIAL_DATA);
	});

	it('using keys "Default" without password', () => {
		let decryptedData = encryptDecryptUsingKeyPair(INITIAL_DATA, VirgilCrypto.KeysTypesEnum.Default);
		expect(decryptedData).toEqual(INITIAL_DATA);
	});

	it('using keys "Default" with password', () => {
		let decryptedData = encryptDecryptUsingKeyPair(INITIAL_DATA, VirgilCrypto.KeysTypesEnum.Default, PASSWORD);
		expect(decryptedData.toString('utf8')).toEqual(INITIAL_DATA);
	});

	it('using keys "EC_BP256R1" without password', () => {
		let decryptedData = encryptDecryptUsingKeyPair(INITIAL_DATA, VirgilCrypto.KeysTypesEnum.EC_BP256R1);
		expect(decryptedData).toEqual(INITIAL_DATA);
	});

	it('using keys "EC_BP256R1" with password', () => {
		let decryptedData = encryptDecryptUsingKeyPair(INITIAL_DATA, VirgilCrypto.KeysTypesEnum.EC_BP256R1, PASSWORD);
		expect(decryptedData.toString('utf8')).toEqual(INITIAL_DATA);
	});

	it('using keys "EC_BP384R1" without password', () => {
		let decryptedData = encryptDecryptUsingKeyPair(INITIAL_DATA, VirgilCrypto.KeysTypesEnum.EC_BP384R1);
		expect(decryptedData).toEqual(INITIAL_DATA);
	});

	it('using keys "EC_BP384R1" with password', () => {
		let decryptedData = encryptDecryptUsingKeyPair(INITIAL_DATA, VirgilCrypto.KeysTypesEnum.EC_BP384R1, PASSWORD);
		expect(decryptedData.toString('utf8')).toEqual(INITIAL_DATA);
	});

	it('using keys "EC_BP512R1" without password', () => {
		let decryptedData = encryptDecryptUsingKeyPair(INITIAL_DATA, VirgilCrypto.KeysTypesEnum.EC_BP512R1);
		expect(decryptedData).toEqual(INITIAL_DATA);
	});

	it('using keys "EC_BP512R1" with password', () => {
		let decryptedData = encryptDecryptUsingKeyPair(INITIAL_DATA, VirgilCrypto.KeysTypesEnum.EC_BP512R1, PASSWORD);
		expect(decryptedData.toString('utf8')).toEqual(INITIAL_DATA);
	});

	it('using keys "EC_M221" without password', () => {
		let decryptedData = encryptDecryptUsingKeyPair(INITIAL_DATA, VirgilCrypto.KeysTypesEnum.EC_M221);
		expect(decryptedData).toEqual(INITIAL_DATA);
	});

	it('using keys "EC_M255" without password', () => {
		let decryptedData = encryptDecryptUsingKeyPair(INITIAL_DATA, VirgilCrypto.KeysTypesEnum.EC_M255);
		expect(decryptedData).toEqual(INITIAL_DATA);
	});

	it('using keys "EC_M255" with password', () => {
		let decryptedData = encryptDecryptUsingKeyPair(INITIAL_DATA, VirgilCrypto.KeysTypesEnum.EC_M255, PASSWORD);
		expect(decryptedData.toString('utf8')).toEqual(INITIAL_DATA);
	});

	it('using keys "EC_SECP192K1" without password', () => {
		let decryptedData = encryptDecryptUsingKeyPair(INITIAL_DATA, VirgilCrypto.KeysTypesEnum.EC_SECP192K1);
		expect(decryptedData).toEqual(INITIAL_DATA);
	});

	it('using keys "EC_SECP192K1" with password', () => {
		let decryptedData = encryptDecryptUsingKeyPair(INITIAL_DATA, VirgilCrypto.KeysTypesEnum.EC_SECP192K1, PASSWORD);
		expect(decryptedData.toString('utf8')).toEqual(INITIAL_DATA);
	});

	it('using keys "EC_SECP224K1" without password', () => {
		let decryptedData = encryptDecryptUsingKeyPair(INITIAL_DATA, VirgilCrypto.KeysTypesEnum.EC_SECP224K1);
		expect(decryptedData).toEqual(INITIAL_DATA);
	});

	it('using keys "EC_SECP224K1" with password', () => {
		let decryptedData = encryptDecryptUsingKeyPair(INITIAL_DATA, VirgilCrypto.KeysTypesEnum.EC_SECP224K1, PASSWORD);
		expect(decryptedData.toString('utf8')).toEqual(INITIAL_DATA);
	});

	it('using keys "EC_SECP256K1" without password', () => {
		let decryptedData = encryptDecryptUsingKeyPair(INITIAL_DATA, VirgilCrypto.KeysTypesEnum.EC_SECP256K1);
		expect(decryptedData).toEqual(INITIAL_DATA);
	});

	it('using keys "EC_SECP256K1" with password', () => {
		let decryptedData = encryptDecryptUsingKeyPair(INITIAL_DATA, VirgilCrypto.KeysTypesEnum.EC_SECP256K1, PASSWORD);
		expect(decryptedData.toString('utf8')).toEqual(INITIAL_DATA);
	});

	it('using keys "EC_SECP256R1" without password', () => {
		let decryptedData = encryptDecryptUsingKeyPair(INITIAL_DATA, VirgilCrypto.KeysTypesEnum.EC_SECP256R1);
		expect(decryptedData).toEqual(INITIAL_DATA);
	});

	it('using keys "EC_SECP256R1" with password', () => {
		let decryptedData = encryptDecryptUsingKeyPair(INITIAL_DATA, VirgilCrypto.KeysTypesEnum.EC_SECP256R1, PASSWORD);
		expect(decryptedData.toString('utf8')).toEqual(INITIAL_DATA);
	});

	it('using keys "EC_SECP384R1" without password', () => {
		let decryptedData = encryptDecryptUsingKeyPair(INITIAL_DATA, VirgilCrypto.KeysTypesEnum.EC_SECP384R1);
		expect(decryptedData).toEqual(INITIAL_DATA);
	});

	it('using keys "EC_SECP384R1" with password', () => {
		let decryptedData = encryptDecryptUsingKeyPair(INITIAL_DATA, VirgilCrypto.KeysTypesEnum.EC_SECP384R1, PASSWORD);
		expect(decryptedData.toString('utf8')).toEqual(INITIAL_DATA);
	});

	it('using keys "EC_SECP521R1" without password', () => {
		let decryptedData = encryptDecryptUsingKeyPair(INITIAL_DATA, VirgilCrypto.KeysTypesEnum.EC_SECP521R1);
		expect(decryptedData).toEqual(INITIAL_DATA);
	});

	it('using keys "EC_SECP521R1" with password', () => {
		let decryptedData = encryptDecryptUsingKeyPair(INITIAL_DATA, VirgilCrypto.KeysTypesEnum.EC_SECP521R1, PASSWORD);
		expect(decryptedData.toString('utf8')).toEqual(INITIAL_DATA);
	});

});
