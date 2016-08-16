/**
 * Gets a query parameter from current url by name.
 *
 * @param {string} name - Parameter name to get.
 * @returns {string} Parameter value.
 * */
export function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}
