module.exports = function Enum(a) {
	var i = Object.keys(a).reduce(function(o, k) {
		o[a[k]] = k;
		return o;
	}, {});

	return Object.freeze(Object.keys(a).reduce(function(o, k) {
		o[k] = a[k];
		return o;
	}, function(v) {
		return i[v];
	}));
};
