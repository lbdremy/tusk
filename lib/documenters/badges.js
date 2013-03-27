/*!
 * Module dependencies
 */

var packagejson = require('./../parsers/packagejson'),
	fs = require('fs'),
	step = require('step');

/**
 * Build a html piece containing several status badges (travis, gemnasium)
 * 	thanks to the `package.json` and the `.tusk.json`
 *
 * @param  {String}   cwd      - current working directory
 * @param  {Function} callback -
 */

module.exports = function (cwd,callback){
	step(
		function retrieve(){
			fs.readFile(cwd + '/package.json','utf8',this.parallel());
			fs.readFile(cwd + '/.tusk.json','utf8',this.parallel());
		},
		function htmlify(err,packageFile,tuskFile){
			if(err) throw err;
			var github = packagejson.getGithub(packageFile);
			var tusk = JSON.parse(tuskFile);
			var hasBadges = tusk.travis || tusk.gemnasium;
			var html = '';
			if(hasBadges && github){
				var githubURL = github.user + '/' + github.repo;
				html += '<b>Status:</b><div class="badges">';
				var badgeTemplate = '<a href="LINK" rel="nofollow"><img src="IMAGE_SRC" alt="IMAGE_ALT"/></a>&nbsp;';
				if(tusk.travis){
					html += badgeTemplate
								.replace('LINK','http://travis-ci.org/#!/' + githubURL)
								.replace('IMAGE_SRC','https://secure.travis-ci.org/' + githubURL + '.png')
								.replace('IMAGE_ALT','Build Status');
				}
				if(tusk.gemnasium){
					html += badgeTemplate
								.replace('LINK','https://gemnasium.com/' + githubURL)
								.replace('IMAGE_SRC','https://gemnasium.com/' + githubURL + '.png')
								.replace('IMAGE_ALT','Dependency Status');
				}
				html += '</div>';
			}
			return html;
		},
		callback
	);
};