/**
 * Loads the javascript code into a blob and returns a url of that Blob.
 *
 * @param {string} code - Javascript code as a string.
 * @returns {string} URL of the Blob representing the javascript code.
* */
export function blobScript(code) {
    return URL.createObjectURL(new Blob([code], { type: 'text/javascript' }));
}

export default blobScript;