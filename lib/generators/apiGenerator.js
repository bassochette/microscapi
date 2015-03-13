/**
* Module dependencies.
*/
var fs = require('fs')
var colors = require('colors')
var Utils = require('../utils')

/**
 * ControllerGenerator class
 */
(function(){

	var utils = new Utils()
	var templatePath = __dirname + '/../../templates/generators/apiTemplate.ejs'

	/**
	* Constructor.
	*/
	function ApiGenerator(){}

	/**
	* Generate empty controller with actions, views and stylus file from controller model.
	*/
	apiGenerator.prototype.generate = function(apiModel) {
		var destinationFile = process.cwd() + '/backend/api/' + apiModel.name.toLowerCase() + 'Api.js'
        
        utils.writeFileSync(destinationFile, templatePath, apiModel)
        var output = apiModel.name + ' api created'
        console.log(output.green)

	}

	module.exports = ApiGenerator
})()