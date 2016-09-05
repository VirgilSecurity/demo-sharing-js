# Virgil Secure Sharing Demo
This is a demo app showing one way you can use Virgil Crypto Library in javascript to create a secure file sharing app.
After you complete the steps in **Setup** section you will be able to download, decrypt and view encrypted media files
from a browser.

## Setup

### Clone the repository
```
$ git clone https://github.com/VirgilSecurity/virgil-secure-sharing.git
$ cd ./secure-sharing
```

### Install the dependencies
```
$ npm install
```

### Configure
In order to decrypt files the app needs a private part of the key used to encrypt the files, private key password and 
recipient id used during encryption. Set these as environment variables before starting the server. For example, execute:
```
PRIVATE_KEY=<base64_encoded_private_key> PRIVATE_KEY_PASSWORD=<private_key_password> RECIPIENT_ID=<recipient_id> npm run start
```
to set variables and start a server on Unix platform.

### Prepare encrypted files

#### Encrypt
To encrypt the files you can use Virgil CLI tool. Instructions on how to encrypt data without using Virgil Services can be found [here](https://github.com/VirgilSecurity/virgil-cli/wiki#using-virgil-cli-without-committing-to-services).

#### Upload
Upload the files to some publicly available storage (e.g. Dropbox) so that they can be downloaded by the app.

#### Create metadata
In order for decrypted media files to be opened accordingly to their type you must provide MIME type of the file along with 
it's download url. You do that by creating a JSON object with two properties "type" and "url":
```
{
	type: "video/mp4",
	url: "https://example.com/encrypted_video"
}
```

#### Encode the metadata
The metadata are passed to the app via url query parameter named `source`. The value of that parameter should be a base64-encoded
metadata JSON. There are multiple ways to encode a string in base64 any of which should work fine for this example.

### Give it a try
Now open your browser and point to `http://localhost:3000/?source=<source>` where `<source>` is the string obtained on the previous step.

## Notes

### Supported MIME types
For audio and video files only the following MIME types are supported:

#### Audio
- audio/aac (.aac)
- audio/mp4 (.mp4 .m4a)
- audio/mpeg (.mp1 .mp2 .mp3 .mpg .mpeg)
- audio/ogg (.oga .ogg)
- audio/wav (.wav)
- audio/webm (.webm)

#### Video
- video/mp4 (.mp4 .m4v)
- video/ogg (.ogv)
- video/webm (.webm)

### File sizes
Due to the use of [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob) objects the maximum file size is limited to 500Mb in Google Chrome browser.
In browsers where size of `Blob` is not restricted it is not guaranteed that files over ~700Mb will be successfully decrypted due to memory limitations.
 
## Live demo
- [Video](https://virgil-crypto-sharing.herokuapp.com/?source=eyJ0eXBlIjoidmlkZW8vbXA0IiwidXJsIjoiaHR0cHM6Ly9kb3dubG9hZHMudmlyZ2lsc2VjdXJpdHkuY29tL2RlbW9maWxlcy92aWRlby5tcDQuZW5jIn0=)
- [Audio](https://virgil-crypto-sharing.herokuapp.com/?source=eyJ0eXBlIjoiYXVkaW8vbXBlZyIsInVybCI6Imh0dHBzOi8vZG93bmxvYWRzLnZpcmdpbHNlY3VyaXR5LmNvbS9kZW1vZmlsZXMvYXVkaW8ubXAzLmVuYyJ9)
- [Image](https://virgil-crypto-sharing.herokuapp.com/?source=eyJ0eXBlIjoiaW1hZ2UvanBlZyIsInVybCI6Imh0dHBzOi8vZG93bmxvYWRzLnZpcmdpbHNlY3VyaXR5LmNvbS9kZW1vZmlsZXMvaW1hZ2UuanBnLmVuYyJ9)
