import React from 'react';
import Loader from 'react-loader';

import {MediaService} from '../media.service';
import {MediaElement} from './media-element.component';

export class MediaListComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: !!props.source,
            mediaSource: null
        };
    }

    componentDidMount() {
        let source = this.props.source;
        if (source) {
            new MediaService(source)
                .fetch()
                .then((blob) => {
                    this.setState({
                        loading: false,
                        mediaSource: blob
                    });
                }, (error) => {
                    alert(error);
                });
        }
    }

    render() {
        let content = this.state.mediaSource ? <MediaElement mediaSource={this.state.mediaSource}/> :
            <h3>No source parameter given :(</h3>;

        return (
            <div>
                <Loader loaded={!this.state.loading}>
                    {content}
                </Loader>
            </div>
        );
    }
}
