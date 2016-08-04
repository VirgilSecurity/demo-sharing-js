var encrypt = require('./encrypt');

module.exports = function encryptStringToBase64 () {
	var args = Array.prototype.slice.apply(arguments);
	args[0] = new Buffer(args[0], 'utf8');

	return encrypt.apply(null, args).toString('base64');
};
