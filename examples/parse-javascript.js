var tusk = require('./../'),
	fs = require('fs');


var obj = tusk.parsers.javascript.parse(fs.readFileSync(__dirname + '/../lib/tusk.js'));
console.log(obj);