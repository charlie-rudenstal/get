/**
 * get
 * Copyright(c) 2012 Charlie Rudenstål <charlie4@gmail.com>
 * MIT Licensed 
 */

var request = require('request');

module.exports = query;

function query(action) {
	var prev = action || function(res, _) { return res; };
	return {
		json: function(url) {
			return query(function(data, _) {
				var data = prev(data, _);
				return JSON.parse(request(url, _).body);
			});
		},

		get: function(property) {
			return query(function(data, _) {
				var data = prev(data, _);
				return data[property] || [];
			});
		},

		reverse: function() {
			return query(function(data, _) {
				var data = prev(data, _);
				if(typeof data.slice === 'function' && typeof data.reverse === 'function') {
					return data.slice(0).reverse();
				} else {
					return data;
				}
			});
		},

		resolve: function(_) {
			return prev(null)(_);
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