var VirgilCrypto = require('../../virgil_js.node');

module.exports = {
	SHA1: VirgilCrypto.VirgilPBKDF.Hash_SHA1,
	SHA224: VirgilCrypto.VirgilPBKDF.Hash_SHA224,
	SHA256: VirgilCrypto.VirgilPBKDF.Hash_SHA256,
	SHA384: VirgilCrypto.VirgilPBKDF.Hash_SHA384,
	SHA512: VirgilCrypto.VirgilPBKDF.Hash_SHA512
};
