var foo = function(query, _) {
	return this.json('http://services.tv.nu/search?query=' + query + '&aggregate=program', _)
			   .go(_);
}

module.exports = {
	index: foo,
	search: foo
}