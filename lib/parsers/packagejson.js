/**
 * Module dependencies
 */

var githubFromPackage = require('github-from-package'),
	url = require('url');

/**
 * Parse `packagejson` to find the github repo name and the github user name
 * @param  {string} packagejson
 * @return {object} object containing the user name and the repo name
 * @api private
 */

exports.getGithub = function(packagejson){
	var urlRepo = githubFromPackage(JSON.parse(packagejson));
	var github;
	if(urlRepo){
		var urlRepoParsed = url.parse(urlRepo);
		var pathnameSplit = urlRepoParsed.pathname.slice(1).split('/');
		github = {
			repo : pathnameSplit[1],
			user : pathnameSplit[0]
		};
	}
	return github;
}