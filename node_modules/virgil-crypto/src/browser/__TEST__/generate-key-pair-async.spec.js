import { VirgilCrypto } from '../../../browser';

const KEYS_TYPES_ENUM = VirgilCrypto.KeysTypesEnum;
const PASSWORD = 'veryStrongPa$$0rd';

describe('generaKeyPairAsync', () => {
	let keyPair = {};

	describe('with default params', () => {
		beforeEach(async (cb) => {
			keyPair = await VirgilCrypto.generateKeyPairAsync();
			cb();
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
		beforeEach(async (cb) => {
			keyPair = await VirgilCrypto.generateKeyPairAsync(PASSWORD);
			cb();
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
		beforeEach(async (cb) => {
			keyPair = await VirgilCrypto.generateKeyPairAsync(KEYS_TYPES_ENUM.Default);
			cb();
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
		beforeEach(async (cb) => {
			keyPair = await VirgilCrypto.generateKeyPairAsync(PASSWORD, KEYS_TYPES_ENUM.Default);
			cb();
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

});
