/**
 * tokenize
 * Copyright(c) 2012 Charlie Rudenstål <charlie4@gmail.com>
 * MIT Licensed 
 */
module.exports = tokenize;

// var tokens = tokenize('abc if blue else green abc');
// console.log(tokens);

function tokenize(remainder, tokens, buffer, getTokenType) {
	if (isTokenCharacter(remainder[0])) {
		return tokenize(remainder.substring(1), tokens, (buffer || '') + remainder[0], getTokenType);
	} else {
		var token = { type: getTokenType(buffer), text: buffer };
		if(remainder.length == 0) {
			return (tokens || []).concat(token); 
		} else {
			return tokenize(remainder.substring(1), (tokens || []).concat(token), null, getTokenType);
		}
	}
}

/*function getTokenType(buffer) {
	return buffer == 'if' ? 'IF' :
		   buffer == 'else' ? 'ELSE' : 
		   'SYMBOL';
}*/

function isTokenCharacter(character) {
	return character && /[a-zA-Z+]/.test(character);
}

