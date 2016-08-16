var Module = Module || {
    // set the size of asm.js heap to 768Mb to avoid
    // 'out of memory' errors when decrypting large files
    TOTAL_MEMORY: 1024 * 1024 * 768 // 768Mb
};
Module.onRuntimeInitialized = function () {};
var VirgilCryptoWorkerContext = Module;

