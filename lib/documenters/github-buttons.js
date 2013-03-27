/*!
 * Module dependencies
 */

var fs = require('fs'),
	step = require('step'),
	packagejson = require('./../parsers/packagejson');

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
			fs.readFile(path,'utf8',this);
		},
		function htmlify(err,file){
			if(err) throw err;
			var github = packagejson.getGithub(file);
			if(github){
				var buttonTypes = ['watch','fork'];
				var html = '';
				buttonTypes.forEach(function(buttonType){
					html += '<iframe src="http://ghbtns.com/github-btn.html?user=' + github.user + '&repo=' + github.repo + '&type=' + buttonType + '&count=true"allowtransparency="true" frameborder="0" scrolling="0" width="78" height="20"></iframe>'
				});
				return this(null,html);
			}
			var err = new Error('Cannot figure out the github url of this project thanks to the package.json');
			this(err);
		},
		callback
	);
};