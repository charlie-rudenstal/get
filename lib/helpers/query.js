/*
 * get
 * Copyright(c) 2012 Charlie Rudenstål <charlie4@gmail.com>
 * MIT Licensed 
 */

var request = require('request');
var rsj = require('rsj');
var jsonSelect = require('JSONSelect');

module.exports = {
	query: query,
	json: function(url, headers) { return query().json(url, headers) },
	rss:  function(url) { return query().rss(url) }
}

// function go(url, callback) {
// 	callback('[{"results": "hej"}]');
// }

function query(action) {
	var prev = action || function(res, callback) { callback(res); };
	return {
		json: function(url, headers) {
			return query(function(data, callback) {
				prev(data, function(data) {
					var options = {url: url, headers: headers};
					request(options, function(a, b) {
						callback(JSON.parse(b.body));
					});
				});
			});
		},

		rss: function(url) {
			return query(function(data, callback) {
				prev(data, function(data) {
					setTimeout(function() { rsj.r2j(url, function(a, b) {	
						callback(JSON.parse(a)); 
					})}, 50); // jsr doesn't support being called 
					  		  // twice without a small interval between
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

		test: function() {
			return query(function(data, callback) {
				prev(data, function(data) {
					callback(data);
				});
			});

		},

		exclude: function(property) {
			return query(function(data, callback) {
				prev(data, function(data) {
					var newData = [];
					for(var a in data) {
						var item = {};
						for(var b in data[a]) {
							if(b != property) { 
								//console.log("prop");
								item[b] = data[a][b];
							}
						}
						newData.push(item);
					}
					callback(newData);
				})
			})
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
			prev([], callback);
		}
	}
}