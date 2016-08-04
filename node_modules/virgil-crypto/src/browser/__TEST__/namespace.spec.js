import { Version, Buffer, VirgilCrypto } from '../../../browser';

describe('Namespace', () => {
	it('`Version` exists', () => expect(Version).toBeDefined());
	it('`VirgilCrypto` exists', () => expect(VirgilCrypto).toBeDefined());
	it('`Buffer` exists', () => expect(Buffer).toBeDefined());
	it('`VirgilCrypto.Buffer` exists', () => expect(VirgilCrypto.Buffer).toBeDefined());
});
