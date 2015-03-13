/**
* Modules dependencies.
*/
var fs       = require('fs');
var path     = require('path');
var express  = require('express');
var url      = require('url');
var engine   = require('ejs-locals');

/**
* Application loader
*/
(function () {

	/**
	 * Constructor.
	 * @param {express} app.
	 */
	function Bootloader(app) {
		this.loadControllers(app);
		this.loadApiControllers(app);
	}


    Bootloader.prototype.loadApi = function(app){
        var apiFolder = __dirname + '/backend/api';
        loadFromFolder(apiFolder, app);
    }


	/**
	 * Dynamically load controller from folder.
	 * @param  {String} folderpath
	 * @param  {express} app
	 */
	var loadFromFolder = function(folderpath, app) {
		fs.readdir(folderpath, function (err, files) {
			if (err) { throw err; }
			files.forEach(function (file) {
				if (path.extname(file) === '.js') {
					var Module = require(folderpath + file);
					var module = new Module(app);
				}
			});
		});
	};

	module.exports = Bootloader;
})();