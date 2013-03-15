/**
 * Module dependencies
 */

var javascript = require('./../parsers/javascript'),
	highlighter = require('highlight.js'),
	fs = require('fs'),
	jade = require('jade');

/**
 * Fetch and compile the template
 */

var template = fs.readFileSync(__dirname + '/templates/javascript.jade','utf-8');
var options = {
	pretty : true
};
var render = jade.compile(template,options);



/**
 * HTMLify the javascript file represented by `js`
 * @param  {string|Buffer} js -
 * @return {string} html
 */

exports.htmlify = function htmlify(js){
	var comments = javascript.parse(js);
	console.log(JSON.stringify(comments,null,'\t'));
	return render(comments);
};