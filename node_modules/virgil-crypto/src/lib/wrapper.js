module.exports = function createWrapper (utils) {
	return {
		wrapAll: wrapAll,
		wrapPrototype: wrapPrototype,
		wrapFunction: wrapFunction
	}

	// Add type conversions to all functions / methods
	function wrapAll (library) {
		for (var className in library) {
			wrapPrototype(library[className]);

			// wrap static functions
			for (var member in library[className]) {
				if (typeof library[className][member] === 'function') {
					library[className][member] = wrapFunction(library[className][member]);
				}
			}
		}
	}

	// Add type conversions to class methods
	function wrapPrototype (root, className) {
		// asmjs bindings
		for (var i in root[className].prototype) {
			if (typeof root[className].prototype[i] === 'function') {
				root[className].prototype[i] = wrapFunction(root[className].prototype[i]);
			}
		}

		// Node bindings
		for (var i in root[className].prototype.__proto__) {
			if (typeof root[className].prototype.__proto__[i] === 'function') {
				root[className].prototype.__proto__[i] = wrapFunction(root[className].prototype.__proto__[i]);
			}
		}
	}

	// Wrap function with type conversions
	function wrapFunction (func) {
		return function wrappedFunction () {
			var args = Array.prototype.slice.apply(arguments);

			for (var i in args) {
				// Convert strings and buffer to VirgilByteArray
				if (typeof args[i] === 'string' || Buffer.isBuffer(args[i])) {
					args[i] = utils.toByteArray(args[i]);
				}
			}

			var result = func.apply(this, args);

			// ByteArray
			if (typeof result === 'object') {
				return utils.byteArrayToBuffer(result);
			}

			return result;
		}
	}
}
