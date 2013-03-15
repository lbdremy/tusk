/**
 * Module dependencies
 */

var pack = require('./../htmlifiers/pack'),
	fs = require('fs'),
	step = require('step');

/**
 * Build a html piece to showcase the module in `cwd`
 * @param  {string}   cwd      - current working directory
 * @param  {Function} callback -
 */

module.exports = function(cwd,callback){
	var path = cwd + '/package.json';
	step(
		function search(){
			fs.stat(path,this)
		},
		function retrieve(err,stats){
			if(err){
				console.warn('the package.json cannot be found!')
				// Bypass the callback chains
				callback();
			}else{
				fs.readFile(path,'utf8',this);
			}
		},
		function htmlify(err,file){
			if(err) throw err;
			return pack.htmlify(file);
		},
		callback
	);
};