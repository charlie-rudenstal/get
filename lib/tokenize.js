/**
 * tokenize
 * Copyright(c) 2012 Charlie Rudenstål <charlie4@gmail.com>
 * MIT Licensed 
 */
module.exports = tokenize;

//var tokens = tokenize('abc if blue else green abc');
//console.log(tokens);

function tokenize(remainder, tokens, buffer) {
	if (remainder.length == 0) return tokens;
	if (isTokenCharacter(remainder[0])) {
		return tokenize(remainder.substring(1), tokens, (buffer || '') + remainder[0]);
	} else {
		var token = { text: buffer };
		if (isToken(buffer)) {
			token.type = buffer.toUpperCase();
		} else {
			token.type = 'SYMBOL';
		}
		return tokenize(remainder.substring(1), (tokens || []).concat(token));
	}
}

function isTokenCharacter(character) {
	return /[a-zA-Z]/.test(character);
}

function isToken(buffer) {
	return buffer == 'if' 
	    || buffer == 'else';
}