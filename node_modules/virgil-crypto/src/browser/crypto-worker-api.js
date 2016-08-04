import 'operative';
import blobScript from './utils/blob-script';
import rawVirgilEmscripten from 'raw!../lib/virgil-emscripten';
import rawWorkerCrypto from 'raw!./utils/worker-crypto-context';

import generateKeyPairWorker from './generate-key-pair-worker';
import encryptWithKeyWorker from './encrypt-with-key-worker';
import encryptWithKeyMultiRecipientsWorker from './encrypt-with-key-multi-recipients-worker';
import encryptWithPasswordWorker from './encrypt-with-password-worker';
import decryptWithKeyWorker from './decrypt-with-key-worker';
import decryptWithPasswordWorker from './decrypt-with-password-worker';
import signWorker from './sign-worker';
import verifyWorker from './verify-worker';

const api = {
	generateKeyPair: generateKeyPairWorker,
	encryptWithKey: encryptWithKeyWorker,
	encryptWithKeyMultiRecipients: encryptWithKeyMultiRecipientsWorker,
	encryptWithPassword: encryptWithPasswordWorker,
	decryptWithKey: decryptWithKeyWorker,
	decryptWithPassword: decryptWithPasswordWorker,
	sign: signWorker,
	verify: verifyWorker
};

const dependencies = [blobScript(rawVirgilEmscripten), blobScript(rawWorkerCrypto)];

export default window.operative(api, dependencies);
