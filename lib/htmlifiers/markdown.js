/**
 * Module dependencies
 */

var marked = require('marked'),
	highlighter = require('highlight.js');

/*!
 * Set default options of marked
 */

marked.setOptions({
	gfm: true,
	tables: true,
	breaks: false,
	pedantic: false,
	sanitize: true,
	smartLists: true,
	langPrefix: 'language-',
	highlight: function(code,lang){
		if(lang && highlighter.LANGUAGES[lang]) return highlighter.highlight(lang,code).value;
		return highlighter.highlightAuto(code).value;
	}
});

/**
 * HTMLify the markdown file represented by `md`
 * @param  {string|Buffer} md -
 * @return {string} html
 */

exports.htmlify = function htmlify(md){
	return marked(md.toString());
};