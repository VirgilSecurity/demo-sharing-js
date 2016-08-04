var https = require('https');
var fs = require('fs');
var path = require('path');
var format = require('util').format;

var destFilePath = path.resolve(__dirname + '/../virgil_js.node');
var file = fs.createWriteStream(destFilePath);

var url = 'https://cdn.virgilsecurity.com/packages/nodejs/virgil-crypto-%s-nodejs-%s-%s-%s.node';

var cryptoVersion = '1.8.1';
var nodeVersion = getNodeVersion();
var platform = getPlatform();
var arch = getArch();

url = format(url, cryptoVersion, nodeVersion, platform, arch);

console.log('Downloading native build.... %s', url);

https.get(url, function(res) {
	if (res.statusCode != 200) {
		noSupport();
	}

	res.pipe(file);
	res.on('error', abortWithError);
	res.on('end', assertFile);
});

function abortWithError (error) {
	console.error('Download error.');
	console.error(error);
}

function assertFile () {
	if (fs.existsSync(destFilePath)) {
		console.log('Successfully downloaded native build.');
	} else {
		noSupport();
	}
}

function getPlatform () {
	if (process.platform === 'darwin') {
		return 'darwin-14.5';
	}

	if (process.platform === 'win32') {
		return 'windows-6.3';
	}

	return process.platform;
}

function getArch () {
	if (process.platform === 'darwin') {
		return 'universal';
	}

	if (process.arch === 'x64' && process.platform !== 'win32') {
		return 'x86_64';
	}

	return process.arch;
}

function getNodeVersion () {
	var versionTokens = process.version.split('.');

	// Use same build for node 4.*.*
	if (versionTokens[0] == 'v4') {
		return '4.4.4';
	}

	// Use same build for node 5.*.*
	if (versionTokens[0] == 'v5') {
		return '5.9.1';
	}

	// Use same build for node 6.*.*
	if (versionTokens[0] == 'v6') {
		return '6.1.0';
	}

	// Use same build for node 0.12.*
	if (versionTokens[0] === 'v0' && versionTokens[1] === '12') {
		return '0.12.7';
	}

	return process.version.slice(1);
}

function noSupport () {
	console.error('\n\n========== WARNING ==========\n');
	console.error('Platform "nodejs-%s-%s-%s" is not supported yet', nodeVersion, platform, arch);
	console.error('\n=============================\n\n');
	process.exit(0);
}
