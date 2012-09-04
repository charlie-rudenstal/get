var request = require('request');

module.exports = query;

function query(dataState, _) {
	var data = dataState || [];
	return {
		json: function(url, _) {
			var res = JSON.parse(request(url, _).body);
			return query(data.concat(res), _);
		},

		get: function(property, _) {
			var res = data[property] || [];
			return query(res, _);
		},

		reverse: function(_) {
			var res = data.slice(0).reverse();
			return query(res, _);
		},

		resolve: function() {
			return data;
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