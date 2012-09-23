/**
 * get
 * Copyright(c) 2012 Charlie Rudenstål <charlie4@gmail.com>
 * MIT Licensed 
 */
module.exports = get;

function get(args, _) {
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

	return request(source, action, param, helpers, _);
}

function request(sourceName, actionName, params, helpers, _) {
	// Get source module 
	var source = require('../sources/' + sourceName);

	// If action is missing: default to index action and append action name to params
	if (actionName in source == false) {
		return request(sourceName, 'index', [actionName].concat(params), helpers, _);
	}

	try {
		// Call source with action and parameter
		var query = source[actionName].apply_(_, helpers, [params.join(' ')]);
	}
	catch(e) {
		console.log(e);
	}

	return resolve(query, _);
}

/**
 * Make sure that a query is resolved.
 * query objects are chained and usually return themselves 
 * and not their data, unless resolved.
 */
function resolve(query, _) {
	if (typeof query === 'object' && 'resolve' in query) {
		return query.resolve(_);
	} else {
		return query;
	}
}