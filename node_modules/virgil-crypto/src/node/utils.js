var Virgil = require('../../virgil_js.node');

var utils = {
	bufferToByteArray: function bufferToByteArray (buffer) {
		var array = new Virgil.VirgilByteArray(buffer.length);

		for (var i = 0; i < buffer.length; ++i) {
			array.set(i, buffer[i]);
		}

		return array;
	},

	stringToByteArray: function stringToByteArray (string) {
		var buffer = new Buffer(string, 'utf8');
		return utils.bufferToByteArray(buffer);
	},

	byteArrayToString: function byteArrayToString (byteArray) {
		var buffer = utils.byteArrayToBuffer(byteArray);
		return buffer.toString('utf8');
	},

	byteArrayToBuffer: function byteArrayToBuffer (byteArray) {
		var size = byteArray.size();
		var buffer = new Buffer(size);

		for (var i = 0; i < size; ++i) {
			buffer[i] = byteArray.get(i);
		}

		return buffer;
	},

	toByteArray: function toByteArray (data) {
		switch (true) {
			case Buffer.isBuffer(data):
				return utils.bufferToByteArray(data);
			case typeof data === 'string':
				return utils.stringToByteArray(data);
			default:
				throw new Error('Can\'t convert ' + typeof data + ' to ByteArray.');
		}
	}
};

module.exports = utils;
