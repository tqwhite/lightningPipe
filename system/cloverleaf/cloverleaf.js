'use strict';
var qtools = require('qtools'),
	qtools = new qtools(module),
	events = require('events'),
	util = require('util');

//START OF moduleFunction() ============================================================

var moduleFunction = function(args) {
	events.EventEmitter.call(this);
	this.forceEvent = forceEvent;
	this.args = args;
	this.metaData = {};
	this.addMeta = function(name, data) {
		this.metaData[name] = data;
	}

	// 	qtools.validateProperties({
	// 		subject: args,
	// 		targetScope: this, //will add listed items to targetScope
	// 		propList: [
	// 			{
	// 				name: 'placeholder',
	// 				optional: true
	// 			}
	// 		]
	// 	});

	var self = this,
		forceEvent = function(eventName, outData) {
			this.emit(eventName, {
				eventName: eventName,
				data: outData
			});
		};


	//LOCAL FUNCTIONS ====================================



	//METHODS AND PROPERTIES ====================================



	//INITIALIZATION ====================================



	//GET STARTUP SWITCHES =======================================================

	var program = require('commander');
	program.version('tqTest')
		//	.option('-y, --background', 'spawn to background')
		.option('-f, --forReal', 'access database, not test data')
		.option('-f, --test', 'access test data, not database, default')
		.parse(process.argv);

	if (program.background) {
		qtools.die('background not yet implemented');
	}

	//SET UP APPLICATION =======================================================

	var localEnvironment = require(__dirname + '/../config/localEnvironment.js');
	global.localEnvironment = new localEnvironment();

	var config = require('../config/cloverleaf.js');
	config = new config();

	if (program.forReal) {
		config = config.specs('forReal');
	} else {
		config = config.specs('test');
	}

	switch ('api') {
		case 'api':
			var input = require('apiAccessor');
			input = new input({
				url: 'http://localhost:8081/uff/1.0/districts/'
			});
			break;
	}

	switch ('file') {
		case 'file':
			var destination = require('fileWriter');
			destination = new destination({
				fileName:'zTest.txt',
				fileWriteCallback: function(err) {
					if(err){
					qtools.dump({
						'\n\n===== err =====\n': err
					});
					}
					else{
						qtools.message('file was written');
						}
				}
			});
			break;
	}

	switch ('tabDelimited') {
		case 'tabDelimited':
			var conversion = require('objectFlattener');
			conversion = new conversion({
				source: input,
				destination:destination
			});
			break;
	}

	return this;
};

//END OF moduleFunction() ============================================================

util.inherits(moduleFunction, events.EventEmitter);
module.exports = moduleFunction;

new moduleFunction();



