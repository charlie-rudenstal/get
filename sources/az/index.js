var query = require('../../lib/helpers/query');
var apikey = "inject";

var projects = function(noparam, data, callback) { 
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