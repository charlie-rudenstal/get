var query = require('../../lib/helpers/query');

var foo = function(query2, _) {
	return query(null)
		   .json('http://services.tv.nu/search?query=' + query2 + '&aggregate=program')
		   .get('results')
		   .reverse()
		   .resolve(_)
	;
}

module.exports = {
	index: foo,
	search: foo
}