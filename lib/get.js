/**
 * get
 * Copyright(c) 2012 Charlie Rudenstål <charlie4@gmail.com>
 * MIT Licensed 
 */
module.exports = get;

var query = require('../lib/helpers/query');
var tokenize = require('../lib/tokenize');

function get(args, callback) {
	// args[0] and [1] are usually 'node' and 'get'
	
	var params = args.slice(2).join(' ');

	var tokens = tokenize(params, null, null, function(buffer) {
		return buffer == 'aftonbladet' ? 'SOURCE' :
			   buffer == 'expressen' ? 'SOURCE' : 
			   buffer == 'svd' ? 'SOURCE' : 
			   buffer == 'tvnu' ? 'SOURCE' : 
			   buffer == 'az' ? 'SOURCE' : 
			   buffer == '+' ? 'MERGE' : 
			   'SYMBOL';
	});

	parse(tokens, null, callback);
	// parse(tokens, null, function() {});

	// var source = args[2]; // ie tvnu
	// var action = args[3]; // ie search
	// var param = args.slice(4); // ie simpsons	
	//request(source, action, param, helpers, callback);	

	// var helpers = { request: require('request') };

	//

}

function parse(tokens, data, callback) {
	data = data || [];

	if(tokens.length == 0) { 
		callback(data);
		return; 
	}

	var token = tokens[0];

	switch(token.type) {
		case 'SOURCE':
			var source = token.text;
			var action = null;
			var params = [];
			var q = query.query();


			// Get next symbol
			parse(tokens.slice(1), data, function(params) {
				request(source, action, params, q, function(newQuery) {
					newQuery.resolve(function(newData) {
						parse(tokens.slice(2), newData, callback);
					})
				});
			});

			break;

		case 'SYMBOL':
			
			/*var mergedTokens = token.text;
			var curToken = token;
			var i = 0;
			while(curToken.type == 'SYMBOL') {
				mergedTokens += ' ' + curToken.text;
				curToken = tokens[++i];
			}*/

			//console.log("merged", mergedTokens);
			callback(token.text);

		break;

		case 'MERGE':
			//var paramSource = tokens[1];
			

			parse(tokens.slice(1), data, function(mergeWithData) {
				
				//parse(tokens.slice(2), data.concat(mergeWithData), callback);

			});

			/*return;

			var source = paramSource.text;
			var action = null;
			var params = [];
			var q = query.query();
			request(source, action, params, q, function(newQuery) {
				newQuery.resolve(function(newData) {				
					//parse(tokens.slice(2), data.concat(newData), callback);
				});
			});*/

			break;

		default: 
			console.log("Warning: No token found (Default)");
			parse(tokens.slice(1));
	}
}

function request(sourceName, actionName, params, currentQuery, callback) {

	// Get source module
	var source = require('../sources/' + sourceName);

	// If action is missing: default to index action and append action name to params
	if (actionName in source == false) {
		request(sourceName, 'index', [actionName].concat(params), currentQuery, callback);
		return;
	}
	
	var helpers = {};

	// Call source with action and parameter
	source[actionName].apply(helpers, [params.join(' ')].concat([currentQuery]).concat(function(query) {
		callback(query);
	}));
}

/**
 * Make sure that a query is resolved.
 * query objects are chained and usually return themselves 
 * and not their data, unless resolved.
 */
function resolve(query, callback) {
	if (typeof query === 'object' && 'resolve' in query) {
		query.resolve(callback);
	} else {
		callback(query);
	}
}