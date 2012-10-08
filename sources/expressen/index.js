var articles = function(noparam, query, callback) { 
    //query.reverse().then(callback);
    query
    .rss('http://www.expressen.se/Pages/OutboundFeedsPage.aspx?id=3642159&viewstyle=rss')
    .exclude('meta')
    .match('.title')
    .then(callback);
}

module.exports = {
    index: articles,
    articles: articles
}