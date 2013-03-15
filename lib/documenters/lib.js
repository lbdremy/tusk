/**
 * Module dependencies
 */

var javascript = require('./../htmlifiers/javascript'),
	fs = require('fs'),
	step = require('step');

/**
 * Build a html piece from the lib folder of the module in `cwd`
 * @param  {string}   cwd      - current working directory
 * @param  {Function} callback -
 */

module.exports = function(cwd,callback){
	step(
		function retrieve(){
			fs.readFile(cwd + '/lib/all.js','utf8',this);
		},
		function htmlify(err,file){
			if(err) throw err;
			return '<section id="lib">' + javascript.htmlify(file) + '</section>';
		}
	);
};
