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

	var helpers = { request: require('request'),
					json: require('../lib/helpers/json') };

	return request(source, action, param, helpers, _);
}

function request(sourceName, actionName, params, helpers, _) {
	// Get source module 
	var source = require('../sources/' + sourceName);

	// If action is missing: default to index action and append action name to params
	if (actionName in source == false) {
		return request(sourceName, 'index', [actionName].concat(params), helpers, _);
	}

	// Call source with action and parameter
	var query = source[actionName].apply_(_, helpers, [params.join(' ')]);

	return resolve(query);
}

/**
 * Make sure that a query is resolved.
 * query objects are chained and usually return themselves 
 * and not their data, unless resolved.
 */
function resolve(query) {
	if (typeof query === 'object' && 'get' in query) {
		return query.get();
	} else {
		return query;
	}
}