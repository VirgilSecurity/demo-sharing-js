import React from 'react';

export class MediaElement extends React.Component {
    constructor(props) {
        super(props);
        this.url = window.URL.createObjectURL(props.mediaSource);
    }

    componentWillUnmount() {
        window.URL.revokeObjectURL(this.url);
    }

    render() {
        let mediaSource = this.props.mediaSource;
        let url = this.url;
        let mediaElement;
        if (/^audio\/.*/.test(mediaSource.type)) {
            mediaElement = <audio src={url} type={mediaSource.type} controls/>;
        } else if (/^image\/.*/.test(mediaSource.type)) {
            mediaElement = <img src={url} alt={'Decrypted image'} />;
        } else if (/^video\/.*/.test(mediaSource.type)) {
            mediaElement = <video src={url} type={mediaSource.type} controls/>;
        } else {
            mediaElement = <h3>Unsupported media :(</h3>
        }
        return (
            <div className={'media-element-container'}>
                {mediaElement}
            </div>
        );
    }
}

