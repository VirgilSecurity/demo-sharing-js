import VirgilCrypto from './crypto-module';
import { Buffer } from 'buffer';
import createWrapper from '../../lib/wrapper';

export const bufferToByteArray = (buffer) => {
	let array = VirgilCrypto.VirgilBase64.decode(buffer.toString('base64'));

	for (let i = 0, bl = buffer.length; i < bl; ++i) {
		array.set(i, buffer[i]);
	}

	return array;
};

export const byteArrayToBuffer = (byteArray) => {
	let size = byteArray.size();
	let buffer = new Buffer(size);

	for (let i = 0; i < size; ++i) {
		buffer[i] = byteArray.get(i);
	}

	return buffer;
};

export const stringToByteArray = (string) => bufferToByteArray(new Buffer(string, 'utf8'));

export const byteArrayToString = (byteArray) => byteArrayToBuffer(byteArray).toString('utf8');

export const toByteArray = (data) => {
	switch (true) {
		case Buffer.isBuffer(data):
			return bufferToByteArray(data);
		case typeof data === 'string':
			return stringToByteArray(data);
		default:
			throw new Error(`Can't convert ${typeof data} to ByteArray.`);
	}
};

export const toBase64 = (data) => VirgilCrypto.VirgilBase64.encode(toByteArray(data));

export const base64ToBuffer = (data) => byteArrayToBuffer(VirgilCrypto.VirgilBase64.decode(data));

export const stringToBuffer = (data) => byteArrayToBuffer(toByteArray(data));

export const wrapper = createWrapper({ toByteArray, byteArrayToBuffer });
