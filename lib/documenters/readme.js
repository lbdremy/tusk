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
			// Remove h1 tag and p tags after h1
			var $p = $('h1 + p');
			while($p[0]){
				$p.remove();
				$p = $('h1 + p');
			}
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
				if(err) return self(null,readme);
				// the LICENCE-like file exists
				var $ = cheerio.load(readme);
				var isLicence = function(text){
					text = text.toLowerCase().trim();
					return (text === 'licence' || text === 'license');
				};
				$('h2').each(function(i,element){
					var $element = $(element);
					var text = $element.text();
					if(isLicence(text)) $element.attr('id','licence');
				});
				var $p = $('h2#licence + p');
				while($p[0]){
					$p.remove();
					$p = $('h2#licence + p');
				}
				$('h2#licence').remove();
				self(null,$.html());
			});
		},
		callback
	);
};