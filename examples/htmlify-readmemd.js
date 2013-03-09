var tusk = require('./../'),
	fs = require('fs');


var html = tusk.htmlifiers.markdown.htmlify(fs.readFileSync(__dirname + '/../README.md'));
console.log(html);