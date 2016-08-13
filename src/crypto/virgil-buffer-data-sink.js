import { Buffer } from 'buffer';
import Virgil from './crypto-module';
import { byteArrayToBuffer } from './utils/crypto-utils';

export const VirgilBufferDataSink = Virgil.VirgilDataSink.extend("VirgilDataSink", {
    __construct: function() {
        this.__parent.__construct.call(this);
        this.buffer = Buffer.from([]);
    },
    isGood: function() {
        return true;
    },
    write: function(bytes) {
        let chunk = byteArrayToBuffer(bytes);
        this.buffer = Buffer.concat([this.buffer, chunk], this.buffer.length + chunk.length);
    },
    getBytes: function () {
        return this.buffer;
    }
});
