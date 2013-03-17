/**
 * Module dependencies
 */

var markdown = require('./../htmlifiers/markdown'),
	fs = require('fs'),
	step = require('step'),
	cheerio = require('cheerio');

/**
 * Build a html piece from the README.md of the module in `cwd`
 * @param  {string}   cwd      - current working directory
 * @param  {Function} callback -
 */

module.exports = function(cwd,callback){
	var path = cwd + '/README.markdown';
	step(
		function search(){
			fs.stat(path,this);
		},
		function retrieve(err,stats){
			if(err){
				console.warn('the README.md cannot be found!');
				// Bypass the callback chains
				callback();
			}else{
				fs.readFile(path,'utf8',this);
			}
		},
		function htmlify(err,file){
			var readme = markdown.htmlify(file);
			var $ = cheerio.load(readme);
			$('h1>p').remove();
			$('h1').remove();
			return  '<section id="readme">' + $.html() + '</section>';
		},
		callback
	);
};