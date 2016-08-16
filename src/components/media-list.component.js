import React from 'react';
import Spinner from 'react-spin';

import {MediaResource} from '../media.resource';
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
        let info;
        let reportProgress = (progress) => {
            this.setState({
                progress: progress,
                loading: true
            });
        };

        try {
            info = JSON.parse(window.atob(this.props.source));
        } catch(e) {
            this.setState({
                loading: false,
                progress: '',
                error: e.message
            });
            return;
        }

        let service = new MediaResource(info);
        service
            .fetchAndDecrypt(reportProgress)
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
