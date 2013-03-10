#!/usr/bin/env node

/**
 * Module dependencies
 */

var tusk = require('./../'),
	optimist = require('optimist');

// Build the command line tool and parse the arguments
var argv = optimist
	.usage('Usage: $0 [--input=FOLDER] [--output=FOLDER] [options]')
	.describe('input','use the files contained in FOLDER to generate the documentation')
	.describe('output','save the documentation in FOLDER')
    .describe('layout','use the FILE or FOLDER as the layout of the site')
    .describe('style','use the FILE as the css file of the site')
    .describe('scripts','use the FILE(s) as the javascript script(s) of the site')
    .describe('help','show the help')
    .alias('script','scripts')
    .alias('i','input')
    .alias('o','output')
    .alias('h','help')
    .boolean('help')
    .default('input',process.cwd())
    .default('output',process.cwd() + '/documentation')
    .default('layout','tusk/lib/views/index.jade')
    .default('style','tusk/lib/assets/stylesheets/style.css')
    .default('scripts','tusk/lib/assets/scripts/script.js')
    .argv;

// Show the help
if(argv._.length === 0 || argv.help){
    console.log(optimist.help());
    process.exit(0);
}