var tusk = require('./../'),
	fs = require('fs');


var obj = tusk.parsers.javascript.parse(fs.readFileSync(__dirname + '/../lib/parsers/javascript.js'));
console.log(JSON.stringify(obj,null,'\t'));