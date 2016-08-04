import _ from 'lodash';
import ExtendableError from 'es6-error';

class VirgilError extends ExtendableError {

  _code;
  _message;

  constructor(message = 'Error', code = '00000') {
    if (_.isEmpty(message) || !_.isString(message)) {
      throw new TypeError('The `message` argument should be a not empty string');
    }

    if (_.isEmpty(code)) {
      throw new TypeError('The `code` argument should not be empty');
    }

    super(message);

    this._message = message;
    this._code = code;
  }

  set code(code) {
    this._code = code;
  }

  get code() {
    return this._code;
  }

  set message(code) {
    this._message = code;
  }

  get message() {
    return this._message;
  }

}

export default VirgilError;
