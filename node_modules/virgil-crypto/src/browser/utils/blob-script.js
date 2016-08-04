export function blobScript (code) {
	return URL.createObjectURL(new Blob([code], { type: 'text/javascript' }));
}

export default blobScript;
