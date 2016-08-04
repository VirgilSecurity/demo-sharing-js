import React from 'react';
import ReactDOM from 'react-dom';
import * as helpers from './helpers';

import {MediaListComponent} from './components/media-list.component';

ReactDOM.render(
    <MediaListComponent source={helpers.getParameterByName('source')} />,
    document.getElementById('app')
);
