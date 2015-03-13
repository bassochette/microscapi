/**
 * module dependencies.
 */
var ejs             = require('ejs')
var Utils           = require('../utils')
var fs              = require('fs')
var colors          = require('colors')

(function(){

	/**
	 * Attributes
	 */
	var apiFolderPath = process.cwd() + '/backend/api/'
	var apiControllerTemplatePath = __dirname + '/../../templates/scaffolding/controllers/apiTemplate.ejs'
	var utils = new Utils()

	/**
	* Constructor.
	*/
	function ApiScaffolder(){
        ejs.open = '<%'
        ejs.close ='%>'
	}

	/**
	* Method description.
	*/
	ApiScaffolder.prototype.generate = function(model) {
		var destinationFile = apiFolderPath + model.name + 'ApiController.js'
		utils.writeFileSync(destinationFile, apiControllerTemplatePath, model)
		var output = model.name+'ApiController created'
		console.log(output.green)
	}

	module.exports = ApiScaffolder
})()