/**
 * Module dependencies
 */

var markdown = require('./../htmlifiers/markdown'),
	utils = require('./../utils'),
	step = require('step'),
	cheerio = require('cheerio'),
	utils = require('./../utils');

/**
 * Build a html piece from the README.md of the module in `cwd`
 * @param  {string}   cwd      - current working directory
 * @param  {Function} callback -
 */

module.exports = function(cwd,callback){
	var paths = [
		cwd + '/README.md',
		cwd + '/README.markdown',
		cwd + '/README'
	];
	step(
		function read(err){
			utils.readAtLeastOneFile(paths,this);
		},
		function htmlify(err,file){
			if(err) throw err;
			var readme = markdown.htmlify(file);
			var $ = cheerio.load(readme);
			// Remove h1>p et h1 tags
			$('h1>p').remove();
			$('h1').remove();
			readme = '<section id="readme">' + $.html() + '</section>';
			return readme;
		},
		function cleanupLicence(err,readme){
			if(err) throw err;
			var self = this;
			// Remove licence section if LICENCE-like files present
			var paths = [
				cwd + '/LICENCE.md',
				cwd + '/LICENCE.markdown',
				cwd + '/LICENCE',
				cwd + '/LICENSE.md',
				cwd + '/LICENSE.markdown',
				cwd + '/LICENSE'
			];
			utils.statAtLeastOne(paths,function(err,stats){
				// the LICENCE-like doesn't exist not a problem for us
				if(err) self(null,readme);
				// the LICENCE-like file exists
				var $ = cheerio.load(readme);
				var isLicenceSection = function(text){
					text = text.toLowerCase();
					return (text === 'licence' || text === 'license');
				};
				var $licenceSection = $('h2').filter(function(i,el){
					return isLicenceSection($(this).text());
				});
				$licenceSection.next().remove();
				$licenceSection.remove();
				self(null,$.html());
			});
		},
		callback
	);
};