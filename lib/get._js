/**
 * get
 * Copyright(c) 2012 Charlie Rudenstål <charlie4@gmail.com>
 * MIT Licensed 
 */
module.exports = get;

function get(args, _) {

	// Remove first argument: engine executing this app 'node'
	args.shift();

	// Remove second argument: name/alias of this executable
	args.shift();  

	// Get source name, ie tvnu
	var name = args.shift();

	try {
		// Prepare helpers
		var helpers = {};
		helpers.request = require('request');
		helpers.json = require('../lib/helpers/json');

		// Get source 
		var source = require('../sources/' + name);

		// Call action in source, call index if it doesn't exist
		action = action in source ? action : 'index';

		// Get source action, default to index if it doesn't exist
		var action = args.shift();
		if(action in source == false) {
			args.unshift(action); // probably a param if not a valid action. leave args alone. 
			action = 'index';
		}

		// Get source parameter
		var param = args.join(' ');

		// Call source with action and parameter
		var respon = source[action].apply_(_, helpers, [param]);

		// Autoresolve if this is a response from the 
		// get helper that hasn't been resolved
		if(typeof respon === 'object' && 'get' in respon) respon = respon.get();

	} catch(e) {
		console.log(e);
	}

	return respon;
}