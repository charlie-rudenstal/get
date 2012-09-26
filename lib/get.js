/**
 * get
 * Copyright(c) 2012 Charlie Rudenstål <charlie4@gmail.com>
 * MIT Licensed 
 */
module.exports = get;

function get(args, callback) {
	// args[0] and [1] are usually 'node' and 'get'
	var source = args[2]; // ie tvnu
	var action = args[3]; // ie search
	var param = args.slice(4); // ie simpsons		

	try {
		var helpers = { request: require('request'),
		   			    json: require('../lib/helpers/json') };
	} catch (e) { 
		console.log(e); 
	}

	request(source, action, param, helpers, callback);
}

function request(sourceName, actionName, params, helpers, callback) {
	// Get source module
	var source = require('../sources/' + sourceName);

	// If action is missing: default to index action and append action name to params
	if (actionName in source == false) {
		request(sourceName, 'index', [actionName].concat(params), helpers, callback);
		return;
	}

	// Call source with action and parameter
	source[actionName].apply(helpers, [params.join(' ')].concat(function(query) {
		resolve(query, callback);
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