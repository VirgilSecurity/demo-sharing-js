# Tutorial JavaScript Crypto Library [![Build Status](https://travis-ci.org/VirgilSecurity/virgil-crypto-javascript.svg?branch=master)](https://travis-ci.org/VirgilSecurity/virgil-crypto-javascript) [![npm](https://img.shields.io/npm/v/virgil-crypto.svg)](https://www.npmjs.com/package/virgil-crypto)

- [Install](#install)
- [Generate Keys](#generate-keys)
- [Obtaining an Access Token](#obtaining-an-access-token)
- [Use case](#use-case)
     - [Step 0. Initialization](#step-0-initialization)
     - [Step 1. Generate and Publish the Keys](#step-1-generate-and-publish-the-keys)
     - [Step 2. Encrypt and Sign](#step-2-encrypt-and-sign)
     - [Step 3. Send a Message](#step-3-send-a-message)
     - [Step 4. Receive a Message](#step-4-receive-a-message)
     - [Step 5. Verify and Decrypt](#step-5-verify-and-decrypt)
- [Encrypt/Decrypt Data](#encryptdecrypt-data)
    - [Using Password](#using-password)
    - [Async (using web workers) Using Password](#async-using-web-workers-using-password)
    - [Using Key](#using-key)
    - [Using Key with Password](#using-key-with-password)
    - [Using Key with Password for Multiple Recipients](#using-key-with-password-for-multiple-recipients)
    - [Async (using web workers) Using Key with Password](#async-using-web-workers-using-key-with-password)
    - [Async (using web workers) Using Key with Password for Multiple Recipients](#async-using-web-workers-using-key-with-password-for-multiple-recipients)
    - [Using Key without Password](#using-key-without-password)
    - [Async (using web workers) Using Key without Password](#async-using-web-workers-using-key-without-password)
- [Sign and Verify Data Using Key](#sign-and-verify-data-using-key)
    - [With Password](#with-password)
    - [Async (using web workers) with Password](#async-using-web-workers-with-password)
- [Source code](#source-code)
- [Resources](#resources)
- [License](#license)
- [Contacts](#contacts)
  
## Install

### NPM

```sh
npm install virgil-crypto
```
Or install Virgil SDK with Virgil Crypto (recommended): 

```sh
npm install virgil-sdk
```

### Bower
```sh
bower install virgil-crypto
```
Or install Virgil SDK with Virgil Crypto (recommended): 

```sh
bower install virgil-sdk
```

### CDN
```html
<script 
src="https://cdn.virgilsecurity.com/packages/javascript/crypto/1.5.5/virgil-crypto.min.js" 
integrity="sha256-3W5xboDke1qIoYdoIGh3alQWUBMElS+lIyGL2JAjYhE=" 
crossorigin="anonymous"></script>
```
Or install Virgil SDK with Virgil Crypto (recommended):

```html
<script 
src="https://cdn.virgilsecurity.com/packages/javascript/sdk/1.4.1/virgil-sdk.min.js" 
integrity="sha256-oa5PdJUfmpmSk0q08WejIusp7epaht49i8NKSf6uoJo="
crossorigin="anonymous"></script>
```

### Demos
[Virgil & Twilio IP Messaging Demo Code](https://github.com/VirgilSecurity/virgil-demo-twilio) and check out working demo:
[End to End Encrypted IP Messaging with Twilio API + Virgil](http://virgil-twilio-demo.azurewebsites.net/) 

Quickstart guide for making your own E2E encrypted IP Messaging is: [here](https://github.com/VirgilSecurity/virgil-demo-twilio/blob/master/Quick%20start%20guide.md)

## Generate Keys

The following code example creates a new public/private key pair.

```javascript
var keyPair = VirgilCrypto.generateKeyPair();
console.log('Key pair without password: ', keyPair);
```

You can also generate a key pair with an encrypted private key just using one of the overloaded constructors.

In the table below you can see all types.

| Key Type          | Description                    |
|-------------------|--------------------------------|
| Default      | recommended safest type        |
| RSA_2048     | RSA 2048 bit (not recommended) |
| RSA_3072     | RSA 3072 bit                   |
| RSA_4096     | RSA 4096 bit                   |
| RSA_8192     | RSA 8192 bit                   |
| EC_SECP256R1 | 256-bits NIST curve            |
| EC_SECP384R1 | 384-bits NIST curve            |
| EC_SECP521R1 | 521-bits NIST curve            |
| EC_BP256R1   | 256-bits Brainpool curve       |
| EC_BP384R1   | 384-bits Brainpool curve       |
| EC_BP512R1   | 512-bits Brainpool curve       |
| EC_M221      | (not implemented yet)          |
| EC_M255      | Curve25519                     |
| EC_M383      | (not implemented yet)          |
| EC_M511      | (not implemented yet)          |
| EC_SECP192K1 | 192-bits "Koblitz" curve       |
| EC_SECP224K1 | 224-bits "Koblitz" curve       |
| EC_SECP256K1 | 256-bits "Koblitz" curve       |


```javascript
var keyPairRsa2048 = VirgilCrypto.generateKeyPair(VirgilCrypto.KeysTypesEnum.RSA_2048);
console.log('Key pair RSA_2048 without password: ', keyPairRsa2048);

var KEY_PASSWORD = 'password';
var keyPairWithPassword = VirgilCrypto.generateKeyPair(KEY_PASSWORD);
console.log('Key pair with password: ', keyPairWithPassword);


var KEY_PASSWORD = 'password';
var keyPairWithPasswordAndSpecificType = VirgilCrypto.generateKeyPair(KEY_PASSWORD, VirgilCrypto.KeysTypesEnum.RSA_2048);
console.log('Key pair RSA_2048 with password: ', keyPairWithPasswordAndSpecificType);
```

In the example below you can see a simply generated public/private keypair without a password.

```
-----BEGIN PUBLIC KEY-----
MIGbMBQGByqGSM49AgEGCSskAwMCCAEBDQOBggAEWIH2SohavmLdRwEJ/VWbFcWr
rU+g7Z/BkI+E1L5JF7Jlvi1T1ed5P0/JCs+K0ZBM/0hip5ThhUBKK2IMbeFjS3Oz
zEsWKgDn8j3WqTb8uaKIFWWG2jEEnU/8S81Bgpw6CyxbCTWoB+0+eDYO1pZesaIS
Tv6dTclx3GljHpFRdZQ=
-----END PUBLIC KEY-----

-----BEGIN EC PRIVATE KEY-----
MIHaAgEBBEAaKrInIcjTeBI6B0mX+W4gMpu84iJtlPxksCQ1Dv+8iM/lEwx3nWWf
ol6OvLkmG/qP9RqyXkTSCW+QONiN9JCEoAsGCSskAwMCCAEBDaGBhQOBggAEWIH2
SohavmLdRwEJ/VWbFcWrrU+g7Z/BkI+E1L5JF7Jlvi1T1ed5P0/JCs+K0ZBM/0hi
p5ThhUBKK2IMbeFjS3OzzEsWKgDn8j3WqTb8uaKIFWWG2jEEnU/8S81Bgpw6Cyxb
CTWoB+0+eDYO1pZesaISTv6dTclx3GljHpFRdZQ=
-----END EC PRIVATE KEY-----
```

Here is what an encrypted private key looks like:

```
-----BEGIN ENCRYPTED PRIVATE KEY-----
MIIBKTA0BgoqhkiG9w0BDAEDMCYEIJjDIF2KRj7u86Up1ZB4yHHKhqMg5C/OW2+F
mG5gpI+3AgIgAASB8F39JXRBTK5hyqEHCLcCTbtLKijdNH3t+gtCrLyMlfSfK49N
UTREjF/CcojkyDVs9M0y5K2rTKP0S/LwUWeNoO0zCT6L/zp/qIVy9wCSAr+Ptenz
MR6TLtglpGqpG4bhjqLNR2I96IufFmK+ZrJvJeZkRiMXQSWbPavepnYRUAbXHXGB
a8HWkrjKPHW6KQxKkotGRLcThbi9cDtH+Cc7FvwT80O7qMyIFQvk8OUJdY3sXWH4
5tol7pMolbalqtaUc6dGOsw6a4UAIDaZhT6Pt+v65LQqA34PhgiCxQvJt2UOiPdi
SFMQ8705Y2W1uTexqw==
-----END ENCRYPTED PRIVATE KEY-----
```

## Obtaining an Access Token
 
First you must create a free Virgil Security developer's account by signing up [here](https://developer.virgilsecurity.com/account/signup). Once you have your account you can [sign in](https://developer.virgilsecurity.com/account/signin) and generate an access token for your application.
 
The access token provides authenticated secure access to Virgil Keys Services and is passed with each API call. The access token also allows the API to associate your app’s requests with your Virgil Security developer's account.
 
Use this token to initialize the SDK client [here](#step-0-initialization).

## Use Case
**Secure any data end to end**: users need to securely exchange information (text messages, files, audio, video etc) while enabling both in transit and at rest protection. 
 
- Application generates public and private key pairs using Virgil Crypto library and uses Virgil Keys service to enable secure end to end communications:
    - public key on Virgil Public Keys Service;
    - private key on Virgil Private Keys Service or locally.
- Sender’s information is encrypted in Virgil Crypto Library with the recipient’s public key.
- Sender’s encrypted information is signed with his private key in Virgil Crypto Library.
- Application securely transfers the encrypted data, sender’s digital signature and UDID to the recipient without any risk to be revealed.
- Application on the recipient’s side verifies that the signature of transferred data is valid using the signature and sender’s public key in Virgil Crypto Library.
- The received information is decrypted with the recipient’s private key using Virgil Crypto Library.
- Decrypted data is provided to the recipient.
 
## Step 0. Initialization
 
### Node
 
```javascript
var VirgilSDK = require('virgil-sdk');
var virgil = new VirgilSDK("%ACCESS_TOKEN%");
```
 
### Browsers
 
```javascript
var VirgilSDK = window.VirgilSDK;
var virgil = new VirgilSDK("%ACCESS_TOKEN%");
```
 
## Step 1. Generate and Publish the Keys
First a mail exchange application is generating the keys and publishing them to the Public Keys Service where they are available in an open access for other users (e.g. recipient) to verify and encrypt the data for the key owner.
 
The following code example creates a new public/private key pair.
 
```javascript
var password = "jUfreBR7";
// the private key's password is optional 
var keyPair = virgil.crypto.generateKeyPair(password); 
```
- [virgil.crypto.generateKeyPair](https://github.com/VirgilSecurity/virgil-crypto-javascript/#generate-keys)
 
The app is registering a Virgil Card which includes a public key and an email address identifier. The card will be used for the public key identification and searching for it in the Public Keys Service. You can create a Virgil Card with or without identity verification, see both examples [here...](https://github.com/VirgilSecurity/virgil/tree/master/javascript/keys-sdk#publish-a-virgil-card)
 
```javascript
virgil.cards.create({
	public_key: keyPair.publicKey,
 	private_key: keyPair.privateKey,
 	private_key_password: 'YOUR_PRIVATE_KEY_PASSWORD',
 	identity: {
 		type: VirgilSDK.IdentityTypes.email,
 		value: 'user@virgilsecurity.com'
 	}
}).then(function (myCard) {a
 
});
```
 
- [virgil.cards.create](https://github.com/VirgilSecurity/virgil/tree/master/javascript/keys-sdk#publish-a-virgil-card)
 
## Step 2. Encrypt and Sign
 
The app is searching for the recipient’s public key on the Public Keys Service to encrypt a message for him. The app is signing the encrypted message with sender’s private key so that the recipient can make sure the message had been sent from the declared sender.
 
```javascript
getChannelRecipients()
	.then(function encryptMessageForAllMembersAndSend (recipients) {
		const encryptedMessage = virgil.crypto.encrypt(message, recipients);
 		const sign = virgil.crypto.sign(encryptedMessage, privateKey);
 		//...
 	})
 		
```
 
- [virgil.crypto.encrypt](https://github.com/VirgilSecurity/virgil-crypto-javascript/#encryptdecrypt-data)
- [virgil.crypto.sign](https://github.com/VirgilSecurity/virgil-crypto-javascript#sign-and-verify-data-using-key)
 
## Step 3. Send a Message
The app is merging the message text and the signature into one structure and sending the message to the recipient using a simple IP messaging client.
 
```javascript
messagingService.sendMessageToChannel({
	channel_name: 'some channel name',
	identity_token: 'messaging service user identity token',
	message: JSON.stringify({
		message: encryptedMessage.toString('base64'),
		sign: sign.toString('base64')
	})
})
```
 
## Step 4. Receive a Message
 
An encrypted message is received on the recipient’s side using an IP messaging client. In order to decrypt and verify the received data, the app on recipient’s side needs to get sender’s Virgil Card from the Keys Service.
 
```javascript
messagingService.getChannelMessages({ channel_name: 'some channel name' })
	.map(function (messagePayload) {
		return virgil.cards.search({
			value: messagePayload.sender_identifier, 
			type: VirgilSDK.IdentityTypes.email
		}).then(function (cards) {
			var senderCard = cards[0];
			// ...
		});
	})
```
 
- [virgil.cards.search](https://github.com/VirgilSecurity/virgil/tree/master/javascript/keys-sdk#search-for-cards)
 
## Step 5. Verify and Decrypt
 
The application is making sure the message came from the declared sender by getting his card on Virgil Public Keys Service. In case of success, the message is decrypted using the recipient's private key.
 
```javascript
var payload = JSON.parse(message.message);
var encryptedMessage = new virgil.crypto.Buffer(payload.message, 'base64');
var sign = new virgil.crypto.Buffer(payload.sign, 'base64');
  
var isVerified = virgil.crypto.verify(encryptedMessage, 
       senderCard.public_key.public_key, sign);
  
 if (!isVerified) {
 	throw new Error('The message signature is not valid');
 }
  
var decryptedMessage = virgil.crypto.decrypt(encryptedMessage, 
       recipientCard.id, privateKey);
// Decrypt returns decrypted content as buffer in order to get 
// original text content
// toString method should be used
var originalMessage = decryptedMessage.toString('utf8');
```
 
- [virgil.crypto.verify](https://github.com/VirgilSecurity/virgil-crypto-javascript#sign-and-verify-data-using-key)
- [virgil.crypto.decrypt](https://github.com/VirgilSecurity/virgil-crypto-javascript#using-key-with-password-for-multiple-recipients)
 

## Encrypt/Decrypt data

The procedure for encrypting and decrypting the data is simple. For example:

If you want to encrypt the data to Bob, you encrypt it using Bob's public key (which you can get from the Public Keys Service), and Bob decrypts it with his private key. If Bob wants to encrypt some data to you, he encrypts it using your public key, and you decrypt it with your private key.

Crypto Library allows to encrypt the data for several types of recipient's user data like public key and password. This means that you can encrypt the data with some password or with a public key generated with the Crypto Library.

### Using Password

> Initial data must be passed as a String or [Buffer](https://github.com/feross/buffer).

> Encrypted data will be returned as a [Buffer](https://github.com/feross/buffer).

> The [Buffer](https://github.com/feross/buffer) constructor is available by ```VirgilCrypto.Buffer```.

```javascript
var INITIAL_DATA = 'data to be encrypted';
var PASSWORD = 'password';

var encryptedData = VirgilCrypto.encrypt(INITIAL_DATA, PASSWORD);
var decryptedData = VirgilCrypto.decrypt(encryptedData, PASSWORD);

console.log('Encrypted data: ' + encryptedData);
console.log('Decrypted data: ' + decryptedData.toString());
```

### Async (using web workers) Using Password

> Only for browsers.

```javascript
var INITIAL_DATA = 'data to be encrypted';
var PASSWORD = 'password';

VirgilCrypto.encryptAsync(INITIAL_DATA, PASSWORD)
  .then(function(encryptedData) {
    console.log('Encrypted data: ' + encryptedData);

    VirgilCrypto.decryptAsync(encryptedData, PASSWORD)
      .then(function(decryptedData) {
        console.log('Decrypted data: ' + decryptedData.toString());
      });
  });
```

### Using Key

> Initial data must be passed as a String or [Buffer](https://github.com/feross/buffer).

> Encrypted data will be returned as a [Buffer](https://github.com/feross/buffer).

> The [Buffer](https://github.com/feross/buffer) constructor is available by ```VirgilCrypto.Buffer```.

### Using Key with Password

```javascript
var KEY_PASSWORD = 'password';
var INITIAL_DATA = 'data to be encrypted';
var RECIPIENT_ID = '<SOME_RECIPIENT_ID>';

var keyPair = VirgilCrypto.generateKeyPair(KEY_PASSWORD);
var encryptedData = VirgilCrypto.encrypt(INITIAL_DATA, RECIPIENT_ID, keyPair.publicKey);
var decryptedData = VirgilCrypto.decrypt(encryptedData, RECIPIENT_ID, keyPair.privateKey, KEY_PASSWORD);

console.log('Encrypted data: ' + encryptedData);
console.log('Decrypted data: ' + decryptedData.toString());
```

### Using Key with Password for Multiple Recipients

```javascript
var KEY_PASSWORD = 'password';
var INITIAL_DATA = 'data to be encrypted';
var RECIPIENT_ID = '<SOME_RECIPIENT_ID>';

var keyPair = VirgilCrypto.generateKeyPair(KEY_PASSWORD);
var recipientsList = [{ recipientId: RECIPIENT_ID, publicKey: keyPair.publicKey }];
var encryptedData = VirgilCrypto.encrypt(INITIAL_DATA, recipientsList);
var decryptedData = VirgilCrypto.decrypt(encryptedData, RECIPIENT_ID, keyPair.privateKey, KEY_PASSWORD);

console.log('Encrypted data: ' + encryptedData);
console.log('Decrypted data: ' + decryptedData.toString());
```

### Async (using web workers) Using Key with Password

> Only for browsers.

```javascript
var KEY_PASSWORD = 'password';
var INITIAL_DATA = 'data to be encrypted';
var RECIPIENT_ID = '<SOME_RECIPIENT_ID>';

VirgilCrypto.generateKeyPairAsync(KEY_PASSWORD)
  .then(function(keyPair) {
    VirgilCrypto.encryptAsync(INITIAL_DATA, RECIPIENT_ID, keyPair.publicKey)
      .then(function(encryptedData) {
        console.log('Encrypted data: ' + encryptedData);

        VirgilCrypto.decryptAsync(encryptedData, RECIPIENT_ID, keyPair.privateKey, KEY_PASSWORD)
          .then(function(decryptedData) {
            console.log('Decrypted data: ' + decryptedData.toString());
          });
      });
  });
```

### Async (using web workers) Using Key with Password for Multiple Recipients

> Only for browsers.

```javascript
var KEY_PASSWORD = 'password';
var INITIAL_DATA = 'data to be encrypted';
var RECIPIENT_ID = '<SOME_RECIPIENT_ID>';

VirgilCrypto.generateKeyPairAsync(KEY_PASSWORD)
  .then(function(keyPair) {
    var recipientsList = [{ recipientId: RECIPIENT_ID, publicKey: keyPair.publicKey }];
    
    VirgilCrypto.encryptAsync(INITIAL_DATA, recipientsList)
      .then(function(encryptedData) {
        console.log('Encrypted data: ' + encryptedData);

        VirgilCrypto.decryptAsync(encryptedData, RECIPIENT_ID, keyPair.privateKey, KEY_PASSWORD)
          .then(function(decryptedData) {
            console.log('Decrypted data: ' + decryptedData.toString());
          });
      });
  });
```

### Using Key without Password

```javascript
var INITIAL_DATA = 'data to be encrypted';
var RECIPIENT_ID = '<SOME_RECIPIENT_ID>';

var keyPair = VirgilCrypto.generateKeyPair();
var encryptedData = VirgilCrypto.encrypt(INITIAL_DATA, RECIPIENT_ID, keyPair.publicKey);
var decryptedData = VirgilCrypto.decrypt(encryptedData, RECIPIENT_ID, keyPair.privateKey);

console.log('Encrypted data: ' + encryptedData);
console.log('Decrypted data: ' + decryptedData.toString());
```

### Async (using web workers) Using Key without Password

> Only for browsers.

```javascript
var INITIAL_DATA = 'data to be encrypted';
var RECIPIENT_ID = '<SOME_RECIPIENT_ID>';

VirgilCrypto.generateKeyPairAsync()
  .then(function(keyPair) {
    VirgilCrypto.encryptAsync(INITIAL_DATA, RECIPIENT_ID, keyPair.publicKey)
      .then(function(encryptedData) {
        console.log('Encrypted data: ' + encryptedData);

        VirgilCrypto.decryptAsync(encryptedData, RECIPIENT_ID, keyPair.privateKey)
          .then(function(decryptedData) {
            console.log('Decrypted data: ' + decryptedData.toString());
          });
      });
  });
```

## Sign and Verify Data Using Key

Cryptographic digital signatures use public key algorithms to provide data integrity. When you sign the data with a digital signature, someone else can verify the signature and can prove that the data originated from you and was not altered after you had signed it.

The following example applies a digital signature to a public key identifier.

> Initial data must be passed as a String or [Buffer](https://github.com/feross/buffer).

> Encrypted data will be returned as a [Buffer](https://github.com/feross/buffer).

> The [Buffer](https://github.com/feross/buffer) constructor is available by ```VirgilCrypto.Buffer```.

### With Password

```javascript
var KEY_PASSWORD = 'password';
var INITIAL_DATA = 'data to be encrypted';
var RECIPIENT_ID = '<SOME_RECIPIENT_ID>';

var keyPair = VirgilCrypto.generateKeyPair(KEY_PASSWORD);
var encryptedData = VirgilCrypto.encrypt(INITIAL_DATA, RECIPIENT_ID, keyPair.publicKey);
var sign = VirgilCrypto.sign(encryptedData, keyPair.privateKey, KEY_PASSWORD);
```

To verify that the data was signed by a particular party, you need the following information:

*   the public key of the party that signed the data;
*   the digital signature;
*   the data that was signed.

The following example verifies a digital signature which was signed by the sender.

```javascript
var isDataVerified = VirgilCrypto.verify(encryptedData, keyPair.publicKey, sign);

console.log('Encrypted data: ' + encryptedData);
console.log('Sign: ' + sign.toString('base64'));
console.log('Is data verified: ' + isDataVerified);
```

### Async (using web workers) With Password

> Only for browsers.

```javascript
var KEY_PASSWORD = 'password';
var INITIAL_DATA = 'data to be encrypted';
var RECIPIENT_ID = '<SOME_RECIPIENT_ID>';

VirgilCrypto.generateKeyPairAsync(KEY_PASSWORD)
  .then(function(keyPair) {
    VirgilCrypto.encryptAsync(INITIAL_DATA, RECIPIENT_ID, keyPair.publicKey)
      .then(function(encryptedData) {
        console.log('Encrypted data: ' + encryptedData);

        VirgilCrypto.signAsync(encryptedData, keyPair.privateKey, KEY_PASSWORD)
          .then(function(sign) {
            console.log('Sign: ' + sign.toString('base64'));

            VirgilCrypto.verifyAsync(encryptedData, keyPair.publicKey, sign)
              .then(function(isDataVerified) {
                console.log('Is data verified: ' + isDataVerified);
              });
          });
      });
  });
```

## Source code
 
* [Use Case Example](https://github.com/VirgilSecurity/virgil-sdk-javascript/tree/master/examples/ip-messaging/client)
* [IP-Messaging Simple Server](https://github.com/VirgilSecurity/virgil-sdk-javascript/tree/master/examples/ip-messaging/server)

## Resources

* [Crypto Library](https://github.com/VirgilSecurity/virgil/blob/master/javascript/crypto-library/readme.md)
* [SDK](https://github.com/VirgilSecurity/virgil/blob/master/javascript/keys-sdk/readme.md)

## License
BSD 3-Clause. See [LICENSE](https://github.com/VirgilSecurity/virgil/blob/master/LICENSE) for details.

## Contacts
Email: <support@virgilsecurity.com>
