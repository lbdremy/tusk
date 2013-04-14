/**
 * Module dependencies
 */

var javascript = require('./../parsers/javascript'),
	highlighter = require('highlight.js'),
	marked = require('marked'),
	fs = require('fs'),
	jade = require('jade');

/**
 * Fetch and compile the template
 */

var template = fs.readFileSync(__dirname + '/templates/example.jade','utf-8');
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
	comments.forEach(function(comment){
		comment.resume = {};
		comment.resume.code = '';
		comment.resume.title = comment.description.summary;
		comment.resume.description = marked(comment.description.body)
		if(comment.code) comment.resume.code = highlighter.highlight('javascript',comment.code).value;
	});
	return render({ comments : comments });
};