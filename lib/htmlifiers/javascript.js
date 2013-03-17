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
	comments.forEach(function(comment){
		comment.resume = {};
		comment.resume.name = '';
		comment.resume.code = '';
		if(comment.ctx && (comment.ctx.type === 'declaration' || comment.ctx.type === 'property')){
			comment.resume.name = comment.ctx.string + ' = ' + comment.ctx.value;
		}else if( comment.ctx && (comment.ctx.type === 'function' || comment.ctx.type === 'method')){
			var parameters = [];
			comment.tags.forEach(function(tag){
				if(tag.type === 'param') parameters.push(tag.name);
			});
			var string = comment.ctx.string.replace('()', '(' + parameters.join(',') + ')');
			comment.resume.name = string;
		}
		comment.resume.description = comment.description.full;
		if(comment.code) comment.resume.code = highlighter.highlight('javascript',comment.code).value;
		comment.resume.parameters = [];
		comment.resume.returns = '';
		comment.tags.forEach(function(tag){
			if(tag.type === 'param'){
				var type =  '<' + tag.types.join('|') + '>';
				var parameter = tag.name + ' ' +  type + ' ' + tag.description;
				comment.resume.parameters.push(parameter);
			}else if(tag.type === 'return' || tag.type === 'returns'){
				var type =  '<' + tag.types.join('|') + '>';
				comment.resume.returns = type + ' ' + tag.description;
			}
		});
	});
	//console.log(JSON.stringify(comments,null,'\t'));
	return render({ comments : comments });
};