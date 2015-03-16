/**
 * Module dependencies.
 */
var colors = require('colors')
var Utils = require('../utils.js')


var utils = new Utils()
var templatePath = __dirname + '/../../templates/generators/apiTemplate.ejs'

/**
 * Constructor.
 */
function ApiGenerator() {

}

ApiGenerator.prototype.generate = function (apiModel) {
    var destinationFile = process.cwd() + '/backend/api/' + apiModel.name.toLowerCase() + 'Api.js'

    apiModel.methods = {
        '/' : ['get', 'post'],
        '/:id': ['get','put','delete']
    }

    utils.writeFileSync(destinationFile, templatePath, apiModel)
    var output = apiModel.name + ' api created'
    console.log(output.green)

}

module.exports = ApiGenerator
