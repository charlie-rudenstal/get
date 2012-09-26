var query = require('../../lib/helpers/query');
var apikey = "7b0268fdfa224eb2932f335195d4f77a";

var projects = function(noparam, callback) { 
	query
	.json('https://agilezen.com/api/v1/projects', {'X-Zen-ApiKey': apikey })
	.match('.items :nth-child(1n) > .name')
	.then(callback);
}











module.exports = {
	index: projects,
	//stories: stories,
	projects: projects
}

/*var stories = function(project, _) {	
	// TODO: Check for int, then it's an id
	// Projects are by id, retrieve id by project name
	var options = {}; 
	options.url = 'https://agilezen.com/api/v1/projects';
	options.headers = {"X-Zen-ApiKey": apikey };
	return this.json(options, _);
}*/