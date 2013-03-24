/**
 * Module dependencies
 */

var cheerio = require('cheerio');

/**
 * Add anchors to every h2,h3,h4 tags in the given HTML `content`
 * @param  {string}   content      - HTML
 * @return {string} same HTML with anchors on h2,h3,h4
 * @api private
 */

module.exports = function(content){
	var $ = cheerio.load(content);
	var tags = ['h2','h3','h4'];
	tags.forEach(function(tag){
		$(tag).each(function(index,element){
			$(element).attr('id',$(element).text().toLowerCase().trim().replace(/ /g,'-'));
		});
	});
	return $.html();
};