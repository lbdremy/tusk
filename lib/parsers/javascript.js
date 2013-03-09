/**
 * Module dependencies
 */

var dox = require('dox');

/**
 * Parse comments in the given string of `js`.
 * @param  {string|Buffer} js
 * @return {Array} comments
 */

exports.parse = function(js){
	var options = {
		raw : true
	};
	return dox.parseComments(js.toString(),options);
}