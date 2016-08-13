import 'operative';
import blobScript from './utils/blob-script';
import rawWorkerCrypto from 'raw!./utils/worker-crypto-context';
import rawVirgilEmscripten from 'raw!../../lib/virgil_crypto_asmjs';
import rawVirgilCryptoHelpers from 'raw!./utils/worker-crypto-helpers';

import { decryptWithKeyWorker } from './decrypt-with-key-worker';

const api = {
    decryptWithKey: decryptWithKeyWorker
};

const deps = [blobScript(rawWorkerCrypto), blobScript(rawVirgilEmscripten), blobScript(rawVirgilCryptoHelpers)];

export default window.operative(api, deps);