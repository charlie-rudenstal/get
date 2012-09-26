 var query = require('../../lib/helpers/query');

var articles = function(noparam, data, callback) { 
    query
    .rss('http://www.svd.se/sport/?service=rss&type=latest')
    .exclude('meta')
    .match('.title')
    .then(callback);
}

module.exports = {
    index: articles,
    articles: articles
}