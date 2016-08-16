Module['VirgilByteArray']['fromUint8Array'] = function(uint8Array) {
    var byteArray = new Module.VirgilByteArray;
    byteArray.assign(uint8Array);
    return byteArray;
};

Module['VirgilByteArray']['prototype']['toUint8Array'] = function() {
    var size = this.size();
    var array = new Uint8Array(size);
    var i;

    for (i = 0; i < size; ++i) {
        array[i] = this.get(i);
    }

    return array;
};

Module['VirgilStreamDataSource'] = Module.VirgilDataSource.extend("VirgilDataSource", {
    __construct: function(uint8Array, chunkSize) {
        this.__parent.__construct.call(this);
        this.position = 0;
        this.chunkSize = chunkSize || 1024 * 1024; // 1MB by default
        this.bytes = uint8Array;
    },
    hasData: function() {
        return this.position < this.bytes.length;
    },
    read: function() {
        var start = this.position;
        var end = start + this.chunkSize;
        var chunk = this._slice(start, end);
        var bytesRead = chunk.length;
        var byteArray = Module.VirgilByteArray.fromUint8Array(chunk);

        this.seek(this.position + bytesRead);
        return byteArray;
    },
    seek: function(offset) {
        if (offset < 0) {
            offset = this.bytes.length + offset;
        }
        this.position = offset;
    },
    _slice: function(start, end) {
        if (typeof this.bytes.slice === 'function') {
            return this.bytes.slice(start, end);
        }
        var source = this.bytes;
        var len = source.length;
        var relativeStart = start;
        var k = (relativeStart < 0) ? Math.max(len + relativeStart, 0) : Math.min(relativeStart, len);
        var relativeEnd = (end === undefined) ? len : end;
        var final = (relativeEnd < 0) ? Math.max(len + relativeEnd, 0) : Math.min(relativeEnd, len);
        var count = final - k;
        var dest = new Uint8Array(count);
        var n = 0;
        while (k < final) {
            dest[n] = source[k];
            ++k;
            ++n;
        }
        return dest;
    }
});

Module['VirgilStreamDataSink'] = Module.VirgilDataSink.extend("VirgilDataSink", {
    __construct: function() {
        this.__parent.__construct.call(this);
        this.bytes = new Uint8Array(0);
    },
    isGood: function() {
        return true;
    },
    write: function(bytes) {
        var chunk = bytes.toUint8Array();
        this._append(chunk);
    },
    getBytes: function () {
        return this.bytes;
    },
    _append: function (uint8Array) {
        var result;
        var totalLength = this.bytes.length + uint8Array.length;

        result = new Uint8Array(totalLength);
        result.set(this.bytes, 0);
        result.set(uint8Array, this.bytes.length);

        this.bytes = result;
    }
});