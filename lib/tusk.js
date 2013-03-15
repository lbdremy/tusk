/**
 * Module dependencies
 */

var htmlifiers = require('./htmlifiers/'),
	parsers = require('./parsers/'),
	documenters = require('./documenters/'),
	consolidate = require('consolidate'),
	step = require('step');

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
			documenters.showcase(parts.input,this.parallel());
			documenters.readme(parts.input,this.parallel());
			documenters.lib(parts.input,this.parallel());
		},
		function finalize(err,showcase,readme,lib){
			if(err) throw err;
			var content = [readme,lib].reduce(function(content,section){
				return content + section;
			},'<article>') + '</article>';
			//TODO Build index.jade with consolidate
			// see https://github.com/visionmedia/consolidate.js#api and https://github.com/visionmedia/jade
			var locals = {
				title : '',
				description : '',
				showcase : showcase,
				menu : '',
				content : content,
				scripts : [],
				stylesheets : []
			};
			consolidate.jade(__dirname + '/views/index.jade',locals,this);
		},
		done
	);
}

