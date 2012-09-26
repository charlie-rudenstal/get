var query = require('../../lib/helpers/query');

var articles = function(noparam, callback) { 
    query
    .rss('http://www.aftonbladet.se/rss.xml')
    .exclude('meta')
    .match('.title')
    .then(callback);
}

module.exports = {
    index: articles,
    articles: articles
}