var request = require('request');

module.exports = json;


function json(url, _) {
	var action = function(_) {
		return JSON.parse(request(url, _).body);
	};
	return query([action]);
}


function query(actions) {
	return {
		go: function(_) {
			return actions[0](_);
		}
	};
}


	//var r = JSON.parse(request(url, _).body);
	/*return {
		get: function(keyORmapFunc) {
			if(typeof keyORmapFunc == 'string') {
				r = r[keyORmapFunc] || [];
				return this;
			}
			else if(typeof keyORmapFunc == 'function') {
				r = r.map(keyORmapFunc);
				r = r.filter(function(x) { 
					return x !== null && 
					       x !== undefined && 
			       (typeof x !== 'object' || Object.keys(x).length !== 0)  // don't include empty objects/arrays
				});
				return this;
			}
			return r;
		},
		getEach: function(key) {
			if(typeof key == 'string' || typeof key == 'number') {
				return this.get(function(x) {
					return x[key] || {};
				});
			}
		}
	}*/