import _ from 'lodash';
import VirgilError from '../../lib/Error';

_.templateSettings.interpolate = /{([\s\S]+?)}/g;

export const errors = {
	'00000': 'An error occurred',
	'00001': 'The "{arg}" must be a "{type}"',
	'00002': 'The "{arg}" must be an "{type}"',
	'90001': 'Unable to ENCRYPT the given data "{initialData}", using the given key "{key}"',
	'90002': 'Unable to DECRYPT the given data "{initialData}", using the given key "{key}"',
	'90003': 'Unable to ENCRYPT the given data "{initialData}", using the given password "{password}"',
	'90004': 'Unable to DECRYPT the given data "{initialData}", using the given password "{password}"',
	'90005': 'Unable to SIGN the given data "{initialData}", using the given key "{key}" and password "{password}"',
	'90006': 'Unable to VERIFY the given data "{initialData}", using the given key "{key}" and sign "{sign}"',
	'90007': 'Unable to generate virgil keys using the given password "{password}"',
	'90008': 'Unable to ENCRYPT the given data "{initialData}", using the recipients "{recipients}"'
};

export function throwVirgilError (code, tokens) {
	throw new VirgilError(_.template(errors[code])(tokens), code);
}

export function throwValidationError (code, tokens) {
	throwVirgilError(code, tokens);
}
