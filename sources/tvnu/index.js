var query = require('../../lib/helpers/query');

var search = function(search, data, callback) { 
    console.log("search", search);
    query
    .json('http://services.tv.nu/search?query='+escape(search)+'&aggregate=program')
    .get("results")
    .match('.name')
    .then(callback);
}

module.exports = {
    index: search,
    search: search
}