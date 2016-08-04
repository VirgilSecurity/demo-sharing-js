import React from 'react';
import Loader from 'react-loader';

import {MediaService} from '../media.service';
import {MediaElement} from './media-element.component';

export class MediaListComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mediaLoaded: false,
            mediaLink: null
        };
    }

    componentDidMount() {
        new MediaService(this.props.source)
            .fetch()
            .then((blob) => {
                this.setState({
                    mediaLoaded: true,
                    mediaSource: blob
                });
            }, (error) => {
                alert(error);
            });
    }

    render() {
        return (
            <div>
                <Loader loaded={this.state.mediaLoaded}>
                    <MediaElement mediaSource={this.state.mediaSource}/>
                </Loader>
            </div>
        );
    }
}
