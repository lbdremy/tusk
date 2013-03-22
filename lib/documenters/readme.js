/**
 * Module dependencies
 */

var markdown = require('./../htmlifiers/markdown'),
	utils = require('./../utils'),
	step = require('step'),
	cheerio = require('cheerio');

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
			$('h1>p').remove();
			$('h1').remove();
			return  '<section id="readme">' + $.html() + '</section>';
		},
		callback
	);
};