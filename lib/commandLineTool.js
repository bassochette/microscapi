/**
 * Module dependencies
 */
var fs                   = require('fs');
var inquirer             = require('inquirer');
var colors               = require('colors');
var MicroscopeGenerator  = require('./microapiGenerator');

/**
* microscope CommandLineTool with inquirer class.
*/
(function () {
	"use strict";

	var microscopeGenerator = new MicroscopeGenerator();

	/**
	* CommandLineTool constructor.
	*/
	function CommandLineTool(){
		colors.setTheme({
			primary: 'blue',
			warning: 'yellow',
			danger: 'red',
			info: 'cyan',
			success : 'green',
			default : 'grey'
		});
	};

	/**
	 * start prompt and display microscope logo
	 */
	CommandLineTool.prototype.start = function() {
		this.display_logo();
		this.display_microscope_form();
	};

	/**
	 * Display microscope CLI form.
	 */
	CommandLineTool.prototype.display_microscope_form = function() {
		var self = this;
		inquirer.prompt([{
			type: "list",
			name: "task",
			message: "What would you like to do ?",
			choices: [
				"run server",
				"new project",
				"generate",
				"scaffold",
				"database",
				"exit"
			]}
		], function(answer){
			self.microscope_form_callback(answer);
		});
	};

	/**
	 * display generate form
	 */
	CommandLineTool.prototype.display_generate_form = function() {
		var self = this;
		inquirer.prompt([{
			type: "list",
			name: "generator",
			message: "what do you want to generate ?",
			choices: ["model","api","exit"]
		}],
		function(answer){
			self.generate_form_callback(answer);
		});
	};

	/**
	 * display scaffold form
	 */
	CommandLineTool.prototype.display_scaffold_form = function() {
		var self = this;
		inquirer.prompt([
		{
			type: "list",
			name: "scaffold",
			message: "what do you want to scaffold ?",
			choices: ['rest api', 'DAL', 'exit']
		},
		{type: "input", name: "model", message: "Describe model here : ?"}],
		function(answers){
			self.scaffold_form_callback(answers);
		});
	};

	/**
	 * display databse form
	 */
	CommandLineTool.prototype.display_database_form = function() {
		var self = this;
		inquirer.prompt([{
			type: "list",
			name: "database",
			message: "what do you want to do with your database ?",
			choices: ['synchronize', 'run fixtures', 'drop', 'exit']
		}],
		function(answer){
			self.database_form_callback(answer);
		});
	};

	/**
	 * microscope form callback.
	 * @param  {Array} answer
	 */
	CommandLineTool.prototype.microscope_form_callback = function(answer) {
		switch(answer.task){
			case "run server":
				microscopeGenerator.runServer();
				break;
			case "new project":
				this.display_project_form();
				break;
			case "generate":
				this.display_generate_form();
				break;
			case "scaffold":
				this.display_scaffold_form();
				break;
			case "database":
				this.display_database_form();
				break;
			default:
				return null;
		}
	};


	/**
	 * database form callback
	 * @param  {Object} answer
	 */
	CommandLineTool.prototype.database_form_callback = function(answer) {
		var DbManager = require(process.cwd()+'/db/dbManager');
		var dbManager = new DbManager();

		switch(answer.database){
			case "synchronize":
				console.log('\n... database synchronization ...\n'.info);
				dbManager.synchronize();
				break;
			case "run fixtures":
				dbManager.runFixtures();
				break;
			case "drop":
				console.log('\n... dropping database ...\n'.danger);
				dbManager.drop();
				break;
			default:
				return null;
		}
	};

	/**
	 * scaffold rest api with DAL.
	 * @param  {Object} model
	 */
	CommandLineTool.prototype.scaffold_rest_api = function(model) {
		microscopeGenerator.scaffoldRestApi(model);
	};

	/**
	 * generate a model
	 */
	CommandLineTool.prototype.generate_model = function() {
		var self = this;
		console.log('\n example : modelname propertyName:string propertyName2:text ... \n'.info);
		inquirer.prompt(
			{type: "input", name: "model", message: "discribe your model :"},
			function(answers){
				var model = self.parse_model(answers.model);
				microscopeGenerator.generateModel(model);
			}
		);
	};

	/**
	 * display project generator form
	 */
	CommandLineTool.prototype.display_poroject_form = function() {
		var self = this;
		
		inquirer.prompt(
			{type: "input", name: "project", message: "What is your project name ?"}, function(answer){
				microscopeGenerator.generateProject(answer.project);
		});
	};

	/**
	 * parse_model from string.
	 * @param  {String} model_str
	 * @return {[type]}
	 */
	CommandLineTool.prototype.parse_model = function(model_str) {
		var parts = model_str.split(' ');
		var model = {name : parts[0], properties : []};
		var isValidateModel = true;

	    for (var i = 1; i < parts.length; i++) {
	        var property = parts[i].split(':');
	        var name = property[0];
	        var type = property[1].toUpperCase();

	        if (microscopeGenerator.isModelPropertyValid(type)) {
	            model.properties.push({ name: name, type: type });
	        }
	        else {
	            isValidateModel = false;
	            console.log('\nunknown type for property : '.danger + name);
	        }
	    }

	    if (isValidateModel) {
	        return model;
	    } else {
	        return null;
	    }
	};



	/**
	 * display microscopejs logo
	 */
	CommandLineTool.prototype.display_logo = function() {
		var logo = "        tt        \n      t    t      \n    ,, tttt ;.    \n   t tttttttt t   \n t ,tttttttttt: t \nt tttttttttttttt t\nt;ttt ttttttt tt;t\nt;tttt ttttt  tt;t\nt;ttttt tt tt tt;t\nt;tttttt  ttt tt;t\nt;ttttttttttt tt;t\nt;ttttttttttt tt;t\nt;ttttttttttt tt;t\nt;tttttttttttitt;t\nt tttttttttttitt t\n t :tttttttttt. t \n   t ttttttt; t   \n     t tttt t     \n      ,:  ;:      \n        tt        \n";
		console.log(logo.cyan);
	};

	module.exports = CommandLineTool;
})();