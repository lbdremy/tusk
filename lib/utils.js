/*!
 * Module dependencies
 */

var uglifyjs = require('uglify-js'),
	sqwish = require('sqwish'),
	fs = require('fs'),
	step = require('step');

/**
 * Compress the given javascript `code`
 *
 * @param {String} code - javascript code
 * @return {String} javascrip code commpressed
 */

exports.compressJS = function compressJS(code){
	var parser = uglifyjs.parser;
	var uglify = uglifyjs.uglify;
	var ast = parser.parse(code); // parse code and get the initial AST
	//ast = uglify.ast_mangle(ast); // get a new AST with mangled names
	//ast = uglify.ast_squeeze(ast); // get an AST with compression optimizations
	return uglify.gen_code(ast); // compressed code here
};

/**
 * Compress the given css `code`
 *
 * @param {String} code - css code
 * @return {String} css code compressed
 */

exports.compressCSS = function compressCSS(code){
	return sqwish.minify(code,false);
};

/**
 * Read files
 *
 * @param {Array<String>} paths - a list of file system paths
 * @param {Function} callback -
 * @param {Error} callback(err) -
 * @param {Array} callback(,files) - a list containing the contain of each file system paths previously given
 */

exports.readFiles = function readFiles(paths,callback){
	step(function read(){
		var group = this.group();
		paths.forEach(function(path){
			var options = {
				encoding : 'utf8'
			};
			fs.readFile(path,options,group());
		});
	},callback)
};

/**
 * Read at least one file in the given `paths`
 *
 * @param {Array<String>} paths -
 * @param {Function} callback -
 * @param {Error} callback(err) -
 * @param {Array} callback(,file) -
 */

exports.readAtLeastOneFile = function readAtLeastOneFile(paths,callback){
	step(
		function readFiles(){
			var group = this.group();
			paths.forEach(function(path){
				fs.readFile(path,'utf8',group());
			});
		},
		function cleanup(err,files){
			var goodFile;
			files.forEach(function(file){
				if(file && !goodFile) goodFile = file;
			});
			if(!goodFile) throw new Error('Cannot read any of the given files: ' + paths.join(','));
			return goodFile;
		},
		callback
	);
};

/**
 * Give at least one file status for the given `paths`
 *
 * @param {Array<String>} paths -
 * @param {Function} callback -
 * @param {Error} callback(err) -
 * @param {Array} callback(,file) -
 */

exports.statAtLeastOne = function statAtLeastOne(paths,callback){
	step(
		function stats(){
			var group = this.group();
			paths.forEach(function(path){
				fs.stat(path,group());
			});
		},
		function cleanup(err,stats){
			var goodStat;
			stat.forEach(function(stat){
				if(stat && !goodStat) goodStat = stat;
			});
			if(!goodStat) throw new Error('Cannot stat any of the given files: ' + paths.join(','));
			return goodStat;
		},
		callback
	);
};