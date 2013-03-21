/*!
 * Module dependencies
 */

var githubFromPackage = require('github-from-package'),
	fs = require('fs'),
	step = require('step'),
	url = require('url');

/**
 * Build a html piece containing the unofficial github buttons
 * 	thanks to the `package.json`
 *
 * @param  {String}   cwd      - current working directory
 * @param  {Function} callback -
 */

module.exports = function(cwd,callback){
	var path = cwd + '/package.json';
	step(
		function retrieve(){
			var options = {
				encoding : 'utf8'
			};
			fs.readFile(path,this);
		},
		function htmlify(err,file){
			if(err) throw err;
			var urlRepo = githubFromPackage(JSON.parse(file));
			if(urlRepo){
				var urlRepoParsed = url.parse(urlRepo);
				var pathnameSplit = urlRepoParsed.pathname.slice(1).split('/');
				var github = {
					repo : pathnameSplit[1],
					user : pathnameSplit[0]
				};
				var buttonTypes = ['watch','fork'];
				var html = '';
				buttonTypes.forEach(function(buttonType){
					html += '<iframe src="http://ghbtns.com/github-btn.html?user=' + github.user + '&repo=' + github.repo + '&type=' + buttonType + '&count=true"allowtransparency="true" frameborder="0" scrolling="0" width="110" height="20"></iframe>'
				});
				return this(null,html);
			}
			var err = new Error('Cannot figure out the github url of this project thanks to the package.json');
			this(err);
		},
		callback
	);
};