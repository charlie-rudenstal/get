var query = require('../../lib/helpers/query');

var foo = function(query2, _) {
	return query([], _)
		   .json('http://services.tv.nu/search?query=' + query2 + '&aggregate=program', _)
		   .get(0, _)
		   .get('results', _)
		   .resolve()
	;
}

module.exports = {
	index: foo,
	search: foo
}