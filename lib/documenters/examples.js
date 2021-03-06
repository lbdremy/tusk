/**
 * Module dependencies
 */

var example = require('./../htmlifiers/example'),
	fs = require('fs'),
	step = require('step'),
	readdirp = require('readdirp');

/**
 * Build a html piece from the lib folder of the module in `cwd`
 * @param  {string}   cwd      - current working directory
 * @param  {Function} callback -
 */

module.exports = function(cwd,callback){
	step(
		function find(){
			var options = {
				root : cwd,
				fileFilter : '*.js',
				directoryFilter : [ 'examples', 'example']
			};
			var stream = readdirp(options);
			var entries = [];
			stream.on('data',function(entry){
				if(entry.parentDir !== '') entries.push(entry);
			});
			stream.on('error',this);
			var self = this;
			stream.on('end',function(){
				self(null,entries);
			});
		},
		function retrieve(err,entries){
			if(err) throw err;
			var self = this;
			entries.forEach(function(entry){
				var onEnd = self.parallel();
				fs.readFile(entry.fullPath,'utf8',function(err,file){
					if(!err) entry.content = file;
					onEnd(err,entry);
				});
			});
		},
		function htmlify(err){
			if(err) throw err;
			var section = '<section><h2>Examples</h2>';
			for(var i = 1; i < arguments.length; i++){
				var entry = arguments[i];
				var html = example.htmlify(entry.content);
				section += html;
			}
			// shorted if there are no examples to show (even if there are files)
			if(section === '<section><h2>Examples</h2>') return '';
			return section +  '</section>';
		},
		callback
	);
};