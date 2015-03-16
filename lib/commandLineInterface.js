#!/usr/bin/env node

/**
 * module dependencies
 */
var program             = require('commander');
var CommandLineTool     = require('./commandLineTool');
var MicroApi = require('./microapiGenerator');
var colors              = require('colors');

var microapiGenerator = new MicroApi();

program
  .version('0.15.2')

/**
 * display help. // todo
 */
program.on('help', function () {
	console.log('\nmicroapi (0.0.1) commands : \n'.cyan);
	console.log('tool :'.cyan + ', display microscope inquirer tool'.green);
	console.log('new :'.cyan + ' Initialize a bew microapi server skeleton'.green);
	console.log('server :'.cyan + ' run microapi server'.green);
	console.log('generate '.cyan + ' [api, model] :'.yellow + ' generate files with options'.green);
	console.log('scaffold '.cyan + ' [ api, dal] :'.yellow + ' scaffold somethings with options'.green);
	console.log('db '.cyan + ' [sync, drop, fixture] :'.yellow + ' interact with database'.green);
});

/**
 * display command line tool.
 */
program.on('tool', function () {
	var commandLineTool = new CommandLineTool();
	commandLineTool.start();
});

/**
 * create new microscope project
 * @param  {[type]} args
 */
program.on('new', function (args) {
	var projectName = args[0];
	microapiGenerator.generateProject(projectName);
});

/**
 * run application server.
 */
program.on('server', function () {
	microapiGenerator.runServer();
});

/**
 * parse generate command.
 * @param  {[type]} args
 */
program.on('generate', function (args) {
	var target = args[0];
	if(target === 'api'){
		var apiArgs = args.slice(1);
		generateApi(apiArgs);
	}
	else if(target === 'model'){
		var modelArgs = args.slice(1);
		generateModel(modelArgs);
	}
	else{
		var output = '\nunknown command ' + target
		console.log(output.red);
	}
});

/**
 * parse scaffold command.
 * @param  {[type]} args
 */
program.on('scaffold', function (args) {
	var target = args[0];
	var modelArgs = args.slice(1);
	if(target === 'api'){
		scaffoldRestApi(modelArgs);
	}
	else if(target === 'dal'){
		scaffoldDal(modelArgs);
	}
	else{
		var output = '\nunknown command ' + target
		console.log(output.red);
	}
});

/**
 * parse db command
 * @param  {[type]} args
 */
program.on('db', function(args){
	var target = args[0];
	switch(target){
		case 'sync':
			databaseSynchronize();
			break;

		case 'drop':
			databaseDrop();
			break;

		case 'fixture':
            databaseFixture(); //@todo patch microscope
			break;
		default:
			var output = '\nunknown command ' + target
			console.log(output.red);
	}
});


/**
 * parse and scaffold api from args
 * @param  {[type]} args
 */
var scaffoldRestApi = function(args){
	var model = parseModel(args);
	if(model){
		microapiGenerator.scaffoldRestApi(model);
	}
	else{
		console.log('model is not valid'.red);
	}
};

/**
 * parse and scaffold dal from args
 * @param  {[type]} args
 */
var scaffoldDal = function(args){
	var model = parseModel(args);
	if(model){
		microapiGenerator.scaffoldDal(model);
	}
	else{
		console.log('model is not valid'.red);
	}
};

/**
 * parse and generate model from args
 * @param  {[type]} args
 */
var generateModel = function(args){
	var model = parseModel(args);
	if(model){
		microapiGenerator.generateModel(model);
	}
	else{
		console.log('model is not valid'.red);
	}
};

var generateApi = function(args){
    var model = parseModel(args)
    if(model){
        microapiGenerator.generateApi(model)
    } else {
        console.log('Invalid model definition.'.red)
    }
}

/**
 * synchronize database.
 */
var databaseSynchronize = function(){
	var DbManager = require(process.cwd()+'/db/dbManager');
	var dbManager = new DbManager();
	dbManager.synchronize();
};

/**
 * drop database
 */
var databaseDrop = function(){
	var DbManager = require(process.cwd()+'/db/dbManager');
	var dbManager = new DbManager();
	dbManager.drop();
};

/**
 * run fixtures
 */
var databaseFixture = function(){
	var DbManager = require(process.cwd()+'/db/dbManager');
	var dbManager = new DbManager();
	dbManager.runFixtures();
};

/**
 * parse model from arguments.
 * @return {Object} model
 */
var parseModel = function(args){
	var model = { name: args[0], properties: [] };
    var isValidateModel = true;

    for (var i = 1; i < args.length; i++) {
        var property = args[i].split(':');
        var name = property[0];
        var type = property[1].toUpperCase();

        if (microapiGenerator.isModelPropertyValid(type)) {
            model.properties.push({ name: name, type: type });
        }
        else {
            isValidateModel = false;
            console.log('\nunknown type for property : '.red + name);
        }
    }

    if (isValidateModel) {
        return model;
    } else {
        return null;
    }
};

program.parse(process.argv);