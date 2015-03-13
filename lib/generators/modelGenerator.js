/**
* Module dependencies.
*/
var colors = require('colors')
var Utils = require('../utils.js')

/**
 * ModelGenerator class.
 */

	var utils = new Utils()
	var templatePath = __dirname + '/../../templates/generators/modelTemplate.ejs'

	/**
	* Constructor.
	*/
	function ModelGenerator(){};

	/**
	 * write model file from model object and module path.
	 * @param  {model} model
	 * @param  {String]} modulePath
	 */
	ModelGenerator.prototype.generate = function(model) {
		var destinationFile = process.cwd() + '/backend/models/' + model.name + '.js'
		utils.writeFileSync(destinationFile, templatePath, model)
		var output = model.name + ' model created'
		console.log(output.green)
        return model
	}

	module.exports = ModelGenerator
