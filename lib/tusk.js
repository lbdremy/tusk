/**
 * Module dependencies
 */

var htmlifiers = require('./htmlifiers/'),
	parsers = require('./parsers/'),
	documenters = require('./documenters/'),
	consolidate = require('consolidate'),
	step = require('step'),
	utils = require('./utils'),
	fs = require('fs');

/**
 * Expose htmlifiers
 * 	htmlifiers are responsible for tranforming js, json, markdown data into html.
 */

exports.htmlifiers = htmlifiers;

/**
 * Expose parsers
 *  parsers are responsible for extracting relevant informations from the noise into js, json, markdown format.
 */

exports.parsers = parsers;

/**
 * Exports documenters
 * 	documenters are responsible for finding, fetching and transforming the known into readable and meaningful information
 * 	in our case for the web.
 */

exports.documenters = documenters;

/**
 * Export the document method
 *  main job of tusk
 */

exports.document = document;

/**
 * Document the given `parts`
 * @param  {Array}   parts -
 * @param  {Function} done -
 */

function document(parts,done){
	step(
		function work(){
			var self = this;
			documenters.showcase(parts.input,this.parallel());
			documenters.readme(parts.input,this.parallel());
			documenters.licence(parts.input,this.parallel());
			documenters.lib(parts.input,this.parallel());
			var cssCallback = this.parallel();
			utils.readFiles(parts.styles.split(','),function(err,files){
				if(err) return cssCallback(err);
				var css = utils.compressCSS(files.join('\n'));
				cssCallback(null,css);
			});
			var jsCallback = this.parallel();
			utils.readFiles(parts.scripts.split(','),function(err,files){
				if(err) return jsCallback(err);
				var js = utils.compressJS(files.join('\n'));
				jsCallback(null,js);
			});
			var dotTuskCallback = this.parallel();
			fs.readFile(parts.input + '/.tusk.json',function(err,file){
				if(err) return dotTuskCallback(err);
				dotTuskCallback(null,JSON.parse(file));
			});
			documenters.githubButtons(parts.input,this.parallel());
			documenters.badges(parts.input,this.parallel());
		},
		function finalize(err,showcase,readme,licence,lib,style,script,dotTusk,githubButtons,badges){
			if(err) throw err;
			var content = [readme,lib,licence].reduce(function(content,section){
				return content + section;
			},'');
			content = documenters.anchors(content);
			var packagejson = require(parts.input + '/package.json');
			// Find keywords
			var keywords = '';
			if(packagejson.keywords){
				keywords = packagejson.keywords.join(',') + ',' + packagejson.name
			}
			var locals = {
				title : packagejson.name,
				description : packagejson.description,
				author : utils.findAuthor(packagejson),
				keywords : keywords,
				showcase : showcase,
				badges : badges,
				menu : documenters.menu(content),
				content : content,
				script : script,
				style : style,
				dotTusk : dotTusk,
				githubButtons : githubButtons,
				packagejson : packagejson
			};
			consolidate.jade(__dirname + '/views/index.jade',locals,this);
		},
		done
	);
}

