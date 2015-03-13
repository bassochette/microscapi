/**
 * module dependencies
 */
var Utils                = require('./utils');
var colors               = require('colors');
var ModelGenerator       = require('./generators/modelGenerator');
var ApiGenerator  = require('./generators/apiGenerator');
var DALScaffolder        = require('./scaffolders/dalScaffolder');
var ApiScaffolder        = require('./scaffolders/apiScaffolder');

/**
 * microapi generator class
 */
(function(){

	/**
	* Constructor.
	*/
	function MicroapiGenerator(){

	};

	/**
	 * generate microscope project
	 */
	MicroapiGenerator.prototype.generateProject = function(projectName) {
		var source = __dirname + '/../templates/project/';
		var destination = process.cwd() + '/'+ projectName;

		var utils = new Utils();
		utils.copyTemplate(source, destination, function(){
			console.log('\nmicroapi project initialized'.green);
			console.log('cd project && npm install'.cyan);
			console.log('edit ./configs/database.json\n'.yellow);
		});
	};

	/**
	* run application server.
	*/
	MicroapiGenerator.prototype.runServer = function() {
		var binPath = process.cwd() + '/server';
		var open = require("open");

		require(binPath);
		open("http://localhost:3000");
	};



	/**
	 * scaffold rest api
	 * @param  {[type]} model
	 */
	MicroapiGenerator.prototype.scaffoldRestApi = function(model) {
		var modelGenerator = new ModelGenerator();
		modelGenerator.generate(model);

		var apiScaffolder = new ApiScaffolder();
		apiScaffolder.generate(model);

		var dalScaffolder = new DALScaffolder();
		dalScaffolder.generate(model);
	};

	/**
	 * generate data access layer
	 * @param  {[type]} model
	 */
	MicroapiGenerator.prototype.scaffoldDal = function(model) {
		var modelGenerator = new ModelGenerator();
		modelGenerator.generate(model);

		var dalScaffolder = new DALScaffolder();
		dalScaffolder.generate(model);
	};

	/**
	 * generate model file
	 * @param  {[type]} model
	 */
	MicroapiGenerator.prototype.generateModel = function(model) {
		var modelGenerator = new ModelGenerator();
		modelGenerator.generate(model);
	};

    MicroapiGenerator.prototype.generateApi = function(model){
        var apiGenerator = new ApiGenerator();
        apiGenerator.generate(model);
    }


	/**
	 * Check validity of property type.
	 * @param  {String}  type
	 */
	MicroapiGenerator.prototype.isModelPropertyValid = function(type) {
		var validateType = ['STRING', 'TEXT', 'DATE', 'BOOLEAN', 'INTEGER', 'FLOAT'];
	    if (validateType.contains(type.toUpperCase())) {
	        return true;
	    } else {
	        return false;
	    }
	};

	/*
	* Extend JavaScript Array prototype.
	*/
	Array.prototype.contains = function (obj) {
		var i = this.length;
		while (i--) {
		    if (this[i] === obj) {
		        return true;
		    }
		}
		return false;
	}

	module.exports = MicroapiGenerator;
})();