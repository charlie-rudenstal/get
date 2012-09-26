/*
 * get
 * Copyright(c) 2012 Charlie Rudenstål <charlie4@gmail.com>
 * MIT Licensed 
 */

var request = require('request');


var jsonSelect = require('JSONSelect');

module.exports = query;

function query(action) {
	var prev = action || function(res, callback) { callback(res); };
	return {
		json: function(url) {
			return query(function(data, callback) {
				prev(data, function(data) {
					request(url, function(a, b) { 
						callback(JSON.parse(b.body)) 
					});
				});
			});
		},

		get: function(property) {
			return query(function(data, callback) {
				prev(data, function(data) {
					callback(data[property] || []);
				});
			});
		},

		reverse: function() {
			return query(function(data, callback) {
				prev(data, function(data) {
					if(typeof data.slice === 'function' && typeof data.reverse === 'function') {
						callback(data.slice(0).reverse());
					} else {
						callback(data);
					}	
				});
			});
		},

		match: function(selector) {
			return query(function(data, callback) {
				prev(data, function(data) {
					callback(jsonSelect.match(selector, data));	
				});
			});
		},

		log: function() {
			return query(function(data, callback) {
				var data = prev(data, callback);
				callback(data || []);
			});
		},

		then: function(callback) {
			callback(this);
		},

		resolve: function(callback) {
			prev(null, callback);
		}
	}
}

/*var r = query('www.a').resolve();
var a = query('www.a');
a.resolve();

var a = json("www.a")
       .json('www.b')
       .where(d => 3)
       .limit(4)
       .orderby('dd')
       .resolve();


var a = json('dd', function() {
	return map(function() {'dd'}, function() {
		hej('ff');
	})
})


Query.resolve = function(actions) {

}*/