/**
 * Module dependencies
 */

var fs = require('fs');
	jade = require('jade');

/**
 * Fetch and compile the template
 */

var template = fs.readFileSync(__dirname + '/templates/package-json.jade','utf-8');
var options = {
	pretty : true
};
var render = jade.compile(template,options);

/**
 * HTMLify the package.json file
 * @param  {string} json -
 * @return {string} html
 */

exports.htmlify = function htmlify(json){
	var pack = JSON.parse(json);
	if(pack.author) pack.author = pack.author.replace(/<.*?>/,'').trim();
	return render(pack);
};