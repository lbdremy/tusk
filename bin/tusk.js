#!/usr/bin/env node

/**
 * Module dependencies
 */

var tusk = require('./../'),
	optimist = require('optimist');

// Build the command line tool and parse the arguments
var argv = optimist
	.usage('Usage: $0 [--input=FOLDER] [options]')
	.describe('input','use the files contained in FOLDER to generate the documentation')
    .describe('styles','use the FILE(s) as the css file of the site')
    .describe('scripts','use the FILE(s) as the javascript script(s) of the site')
    .describe('help','show the help')
    .alias('i','input')
    .alias('o','output')
    .alias('h','help')
    .boolean('help')
    .default('input',process.cwd())
    .default('styles','')
    .default('scripts','')
    .argv;

// Show the help
if(argv.help){
    process.stdout.write(optimist.help());
    process.exit(0);
}

// Document
tusk.document(argv,function(err,page){
    if(err) throw err;
    console.log(page);
});