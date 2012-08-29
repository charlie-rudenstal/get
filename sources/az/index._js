var json = require('../../lib/helpers/json');
var apikey = "7b0268fdfa224eb2932f335195d4f77a";

var index = function(params, _) {
	// If first param is not 'projects' or 'stories', treat it like a project name
	// and display its stories
	
}

var projects = function(noParam, _) {
	var options = {};
	options.url = 'https://agilezen.com/api/v1/projects';
	options.headers = {"X-Zen-ApiKey": apikey };
	return json(options, _)
			   .get('items')
			   .getEach('name');
}

var stories = function(project, _) {
	
	// TODO: Check for int, then it's an id
	// Projects are by id, retrieve id by project name
	//var p = projects(null, _).

	//return p;

	/*var options = {};
	options.url = 'https://agilezen.com/api/v1/projects';
	options.headers = {"X-Zen-ApiKey": apikey };
	return this.json(options, _);*/
}

module.exports = {
	index: index,
	stories: stories,
	projects: projects
}