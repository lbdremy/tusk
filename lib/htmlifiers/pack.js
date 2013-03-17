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
	if(typeof pack.author === 'string'){
		pack.author = pack.author.replace(/<.*?>/,'').trim();
	}else if(typeof pack.author === 'object' && pack.author.name){
		pack.author = pack.name.trim();
	}else{
		pack.author = 'Anonymous';
	}
	return render(pack);
};