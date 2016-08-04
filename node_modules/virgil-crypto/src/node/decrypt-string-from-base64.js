var decrypt = require('./decrypt');

module.exports = function decryptStringFromBase64 () {
	var args = Array.prototype.slice.apply(arguments);
	args[0] = new Buffer(args[0], 'base64');

	return decrypt.apply(null, args).toString('utf8');
};
