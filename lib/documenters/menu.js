/**
 * Module dependencies
 */

var cheerio = require('cheerio');

/**
 * Build a HTML piece from the given HTML `content`
 * @param  {string}   content      - HTML
 * @return {string} HTML menu of the given `content`
 * @api private
 */

module.exports = function(content){
	var $ = cheerio.load(content);
	var menu = '<ul>';
	var struct = [];
	$('*').each(function(i,element){
		if(element.name === 'h2'){
			struct.push({ h2 : element, h3 : [] });
		}else if(element.name === 'h3'){
			struct[struct.length - 1].h3.push(element);
		}
	});
	struct.forEach(function(part){
		var text = $(part.h2).text();
		var href = text.toLowerCase().trim().replace(/ /g,'-');
		menu += '<li><a href="#' + href + '">' + text + '</a></li>';
		if(part.h3.length > 0){
			menu += '<ul>';
			part.h3.forEach(function(element){
				var text = $(element).text();
				var href = text.toLowerCase().trim().replace(/ /g,'-');
				menu += '<li><a href="#' + href + '">' + text + '</a></li>';
			});
			menu += '</ul>';
		}
	});
	menu += '</ul>';
	return menu;
};