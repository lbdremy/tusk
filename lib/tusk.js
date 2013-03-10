/**
 * Module dependencies
 */

var htmlifiers = require('./htmlifiers/'),
	parsers = require('./parsers/'),
	documenters = require('./documenters/'),
	consolidate = require('consolidate');

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
	//TODO Build index.jade with consolidate
	// see https://github.com/visionmedia/consolidate.js#api and https://github.com/visionmedia/jade
}

