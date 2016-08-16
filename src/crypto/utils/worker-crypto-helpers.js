Module['VirgilByteArray']['fromUint8Array'] = function(uint8Array) {
    var byteArray = new Module.VirgilByteArray;
    byteArray.assign(uint8Array);
    return byteArray;
};

Module['VirgilByteArray']['prototype']['toUint8Array'] = function() {
    let size = this.size();
    let array = new Uint8Array(size);

    for (let i = 0; i < size; ++i) {
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
        let start = this.position;
        let end = Math.min(start + this.chunkSize, this.bytes.length);
        let chunk = this.bytes.slice(start, end);
        let bytesRead = chunk.length;
        let byteArray = Module.VirgilByteArray.fromUint8Array(chunk);

        this.seek(this.position + bytesRead);
        return byteArray;
    },
    seek: function(offset) {
        if (offset < 0) {
            offset = this.bytes.length + offset;
        }
        this.position = offset;
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