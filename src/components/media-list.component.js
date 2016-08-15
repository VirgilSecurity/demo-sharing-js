import React from 'react';
import Spinner from 'react-spin';

import {MediaService} from '../media.service';
import {MediaElement} from './media-element.component';

export class MediaListComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: !!props.source,
            progress: '',
            mediaSource: null
        };
    }

    componentDidMount() {
        let source = this.props.source;
        let reportProgress = (progress) => {
            this.setState({
                progress: progress,
                loading: true
            });
        };
        if (source) {
            let service;
            try {
                service = new MediaService(source);
            } catch(err) {
                this.setState({
                    loading: false,
                    progress: '',
                    error: err.message
                });
                return;
            }
            service
                .fetch(reportProgress)
                .then((blob) => {
                    this.setState({
                        loading: false,
                        progress: '',
                        mediaSource: blob
                    });
                }, (error) => {
                    this.setState({
                        loading: false,
                        progress: '',
                        error: error.message
                    });
                });
        }
    }

    render() {
        let content = this.state.loading ? <Spinner /> :
                      this.state.error ? <h3>{this.state.error}</h3> :
                      this.state.mediaSource ? <MediaElement mediaSource={this.state.mediaSource}/> :
                                               <h3>No source parameter given :(</h3>;
        let progressCssClass = `progress-message ${this.state.loading ? '' : 'hidden'}`;

        return (
            <div>
                {content}
                <div className={progressCssClass}>
                    {this.state.progress}
                </div>
            </div>
        );
    }
}
