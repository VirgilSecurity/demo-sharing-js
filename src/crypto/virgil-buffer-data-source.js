import Virgil from './crypto-module';
import { bufferToByteArray } from './utils/crypto-utils';

export const VirgilBufferDataSource = Virgil.VirgilDataSource.extend("VirgilDataSource", {
    __construct: function(buffer) {
        this.__parent.__construct.call(this);
        this.position = 0;
        this.chunkSize = 1024 * 1024; // 1MB
        this.buffer = buffer;
    },
    hasData: function() {
        return this.position < this.buffer.length;
    },
    read: function() {
        let start = this.position;
        let end = Math.min(start + this.chunkSize, this.buffer.length);
        let chunk = this.buffer.slice(start, end);
        let bytesRead = chunk.length;
        let bytes = bufferToByteArray(chunk);

        this.seek(this.position + bytesRead);
        return bytes;
    },
    seek: function(offset) {
        if (offset < 0) {
            offset = this.buffer.length + offset;
        }
        this.position = offset;
    }
});

