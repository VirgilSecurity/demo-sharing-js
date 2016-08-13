Module['VirgilByteArray']['fromUint8Array'] = function(uint8Array) {
    var byteArray = new Module.VirgilByteArray;
    byteArray.assign(new Uint8Array(uint8Array));
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

Module['concatUint8Arrays'] = function(arrays) {
    var totalLength = 0;
    var offset = 0;
    var result;

    arrays.forEach(function (arr) {
        totalLength += arr.length;
    });

    result = new Uint8Array(totalLength);

    arrays.forEach(function (arr) {
        result.set(arr, offset);
        offset += arr.length;
    });

    return result;
};

Module['VirgilTypedArrayDataSource'] = Module.VirgilDataSource.extend("VirgilDataSource", {
    __construct: function(arrayBuffer) {
        this.__parent.__construct.call(this);
        this.position = 0;
        this.chunkSize = 1024 * 1024; // 1MB
        this.bytes = new Uint8Array(arrayBuffer);
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

Module['VirgilTypedArrayDataSink'] = Module.VirgilDataSink.extend("VirgilDataSink", {
    __construct: function() {
        this.__parent.__construct.call(this);
        this.bytes = new Uint8Array(0);
    },
    isGood: function() {
        return true;
    },
    write: function(bytes) {
        var chunk = bytes.toUint8Array();
        this.bytes = Module.concatUint8Arrays([this.bytes, chunk]);
        var sizeInMb = Math.ceil(this.bytes.length / 1024 / 1024);
        if (sizeInMb % 10 === 0) {
            console.log('Written ' + sizeInMb + 'MB');
        }
    },
    getBytes: function () {
        return this.bytes;
    }
});