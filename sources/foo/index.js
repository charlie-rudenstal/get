var query = require('../../lib/helpers/query');
var json = require('../../lib/helpers/json');

var foo = function(search, callback) {
    callback(
        json('http://services.tv.nu/search?query=hem&aggregate=program')
        .get("results")
    );
}

module.exports = {
	index: foo,
	search: foo
}