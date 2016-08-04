import _ from 'lodash';

window.Module = window.Module || {};
window.Module.onRuntimeInitialized = _.noop;

require('script!../../lib/virgil-emscripten');

export default window.Module;
