/**
 * Module dependencies
 */

var markdown = require('./../htmlifiers/markdown'),
	utils = require('./../utils'),
	step = require('step');

/**
 * Build a html piece from the README.md of the module in `cwd`
 * @param  {string}   cwd      - current working directory
 * @param  {Function} callback -
 */

module.exports = function(cwd,callback){
	var paths = [
		cwd + '/LICENCE.md',
		cwd + '/LICENCE.markdown',
		cwd + '/LICENCE',
		cwd + '/LICENSE.md',
		cwd + '/LICENSE.markdown',
		cwd + '/LICENSE'
	];
	step(
		function read(err){
			utils.readAtLeastOneFile(paths,this);
		},
		function htmlify(err,file){
			if(err) throw err;
			var licence = markdown.htmlify(file);
			return '<section id="licence"><h2>Licence</h2>' + licence + '</section>';
		},
		callback
	);
};