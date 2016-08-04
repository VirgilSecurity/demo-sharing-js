import { VirgilCrypto } from '../../../browser';

const KEYS_TYPES_ENUM = VirgilCrypto.KeysTypesEnum;
const PASSWORD = 'veryStrongPa$$0rd';

describe('generaKeyPair', () => {
	let keyPair = {};

	describe('with default params', () => {
		beforeEach(() => {
			keyPair = VirgilCrypto.generateKeyPair();
		});

		it('"publicKey" should be defined', () => {
			expect(keyPair.publicKey).toBeDefined();
		});

		it('"privateKey" should be defined', () => {
			expect(keyPair.privateKey).toBeDefined();
		});

		it('"privateKey" is not encrypted', () => {
			expect(keyPair.privateKey).not.toContain('ENCRYPTED');
		});
	});

	describe('with password', () => {
		beforeEach(() => {
			keyPair = VirgilCrypto.generateKeyPair(PASSWORD);
		});

		it('"publicKey" should be defined', () => {
			expect(keyPair.publicKey).toBeDefined();
		});

		it('"privateKey" should be defined', () => {
			expect(keyPair.privateKey).toBeDefined();
		});

		it('"privateKey" encrypted', () => {
			expect(keyPair.privateKey).toContain('ENCRYPTED');
		});
	});

	describe('with specific type "Default"', () => {
		beforeEach(() => {
			keyPair = VirgilCrypto.generateKeyPair(KEYS_TYPES_ENUM.Default);
		});

		it('"publicKey" should be defined', () => {
			expect(keyPair.publicKey).toBeDefined();
		});

		it('"privateKey" should be defined', () => {
			expect(keyPair.privateKey).toBeDefined();
		});

		it('"privateKey" encrypted', () => {
			expect(keyPair.privateKey).not.toContain('ENCRYPTED');
		});
	});

	describe('with specific type "Default" and password', () => {
		beforeEach(() => {
			keyPair = VirgilCrypto.generateKeyPair(PASSWORD, KEYS_TYPES_ENUM.Default);
		});

		it('"publicKey" should be defined', () => {
			expect(keyPair.publicKey).toBeDefined();
		});

		it('"privateKey" should be defined', () => {
			expect(keyPair.privateKey).toBeDefined();
		});

		it('"privateKey" encrypted', () => {
			expect(keyPair.privateKey).toContain('ENCRYPTED');
		});
	});

	describe('with specific type', () => {
		describe(`"${KEYS_TYPES_ENUM.Default}"`, () => {
			beforeAll(() => {
				keyPair = VirgilCrypto.generateKeyPair(KEYS_TYPES_ENUM.Default);
			});

			it('`publicKey` should be defined', () => {
				expect(keyPair.publicKey).toBeDefined();
			});

			it('`privateKey` should be defined', () => {
				expect(keyPair.privateKey).toBeDefined();
			});

			it('`privateKey` not encrypted', () => {
				expect(keyPair.privateKey).not.toContain('ENCRYPTED');
			});
		});
	});

	describe('change private key password', () => {
		it('Default', function () {
			var firstPassword = 'qwerty1';
			var secondPassword = 'qwerty2';
			var data = 'abc';
			var recipientId = 'im id';
			var keyPair = VirgilCrypto.generateKeyPair(firstPassword);
			var updatedPrivateKey = VirgilCrypto.changePrivateKeyPassword(keyPair.privateKey, firstPassword, secondPassword);
			var encryptedData = VirgilCrypto.encrypt(data, recipientId, keyPair.publicKey, secondPassword);
			var decryptedData = VirgilCrypto.decrypt(encryptedData, recipientId, updatedPrivateKey, secondPassword);
			expect(decryptedData.toString('utf8')).toContain(data);
		});
	});
});
