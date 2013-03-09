/**
 * Module dependencies
 */

var javascript = require('./../parsers/javascript');

/**
 * HTMLify the javascript file represented by `js`
 * @param  {string|Buffer} js -
 * @return {string} html
 */

exports.htmlify = function htmlify(js){
	var comments = javascript.parse(js);
	//TODO generate HTML page
	var html = '';
	return html;
};