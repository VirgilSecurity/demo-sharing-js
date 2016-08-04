var fs = require('fs');
var path = require('path');
var del = require('del');
var request = require('request');

var cryptoVersion = '1.8.1';
var downloadUrl = 'https://cdn.virgilsecurity.com/packages/asmjs/virgil-crypto-' + cryptoVersion + '-asmjs.js';
var downloadFilePath = path.join(__dirname, '../', 'virgil-emscripten.js');
var libPath = path.resolve(path.join(__dirname, '../src/lib/virgil-emscripten.js'));

request
	.get(downloadUrl)
	.on('response', function(res) {
		if (res.statusCode != 200) {
			abortWithError(res.statusMessage);
		}
	})
	.on('error', abortWithError)
	.on('end', function() {
		if (fs.existsSync(downloadFilePath)) {
			console.log('The Virgil Crypto asmjs build successfully downloaded.\n\n');
			console.log('Updating asmjs library...\n\n');

			fs.writeFileSync(libPath, fs.readFileSync(downloadFilePath));

			console.log('The asmjs library updated successfully...\n\n');

			del(downloadFilePath);
		} else {
			abortWithError();
		}
	})
	.pipe(fs.createWriteStream(downloadFilePath));

function abortWithError(error) {
	console.log('Something goes wrong, the Virgil Crypto asmjs build is not downloaded yet.');

	if (error) {
		console.log(error);
	}

	process.exit(-1);
}
