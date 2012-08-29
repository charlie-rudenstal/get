var search = function(query, _) {
	return this.json('http://services.tv.nu/search?query=' + query + '&aggregate=program', _)
		   .get('results')
		   .getEach('programArray')
		   .getEach(0)
		   .getEach('name');
}

module.exports = {
	index: search,
	search: search
}