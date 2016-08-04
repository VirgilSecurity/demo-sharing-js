// transpilers
import 'babel-core/external-helpers';

// workaround for error: `only one instance of babel/polyfill is allowed`
// so, include the babel/polyfill into build, but load only single instance
if (global && !global._babelPolyfill) {
	require('babel/polyfill');
}

export { Buffer } from 'buffer';
import * as VirgilCryptoAPI from './src/browser';
export const Version = PACKAGE_VERSION;
export const VirgilCrypto = { ...{ Buffer: Buffer }, ...VirgilCryptoAPI };
