"use strict";
var VirgilCrypto = require('../');
var expect = require('expect');

var PASSWORD = 'veryStrongPa$$0rd';
var INITIAL_DATA = 'initial data';

describe('sign/verify', function () {

	it('signed data should be verified', function () {
		var keyPair = VirgilCrypto.generateKeyPair(PASSWORD);
		var encryptedData = VirgilCrypto.encrypt(INITIAL_DATA, keyPair.publicKey, keyPair.publicKey);
		var sign = VirgilCrypto.sign(encryptedData, keyPair.privateKey, PASSWORD);
		var verified = VirgilCrypto.verify(encryptedData, keyPair.publicKey, sign);

		expect(verified).toEqual(true);
	});

});
