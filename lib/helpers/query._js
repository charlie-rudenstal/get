var request = require('request');

module.exports = query;

// todo: should not perform action instantly
// they should return a method which will perform the action,
// and the action should be all be performed on resolve
// by doing this we shouldn't need to pass _ around

function query(action) {
	return {
		json: function(url) {
			return query(function(data, _) {
				var res = JSON.parse(request(url, _).body);
				return res;
			});
		},

		get: function(property) {
			return query(function(data, _) {
				var res = data[property] || [];
				return res;
			});
		},

		reverse: function() {
			return query(function(data, _) {
				var res = data.slice(0).reverse();
				return res;
			});
		},

		resolve: function(_) {
			var next = action || function(res) { return res; };
			var future = next(null);
			return future(_);
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