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



	//get startup switches -------------------------------------------------------

	var program = require('commander');
	program.version('tqTest')
		//	.option('-y, --background', 'spawn to background')
		.option('-a, --append', 'append data to file if file is present')
		.option('-h, --header', 'add header row with field names')
		.option('-v, --verbose', '(lowercase) -v, show messages instead of putting into file')
		.option('-q, --quiet', 'no messages')
		.option('-f, --file', 'get specs from file')
		.parse(process.argv);

	if (program.background) {
		qtools.die('background not yet implemented');
	}

	//set up application -------------------------------------------------------

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
			var inputGenerator = require('apiAccessor');
			break;
	}

	switch ('file') {
		case 'file':
			var destinationGenerator = require('fileWriter');
			break;
	}

	switch ('tabDelimited') {
		case 'tabDelimited':
			var conversionGenerator = require('objectFlattener');
			break;
	}

	//define functionality -------------------------------------------------------


	var logOutput = function(status, sourceName, destName) {
		var message = '';

		if (status) {
			message += '\nstatus: ' + (status ? 'failed' : 'success') + ' for dest: ' + destName + ', retrieved from ' + sourceName + '\n';

			message += '\n\n' + qtools.dump(status, true);

		} else {
			message += '\nstatus: ' + (status ? 'failed' : 'success') + ' for dest: ' + destName + ', retrieved from ' + sourceName + '\n';
		}

		if (program.verbose) {
			console.log(qtools.wrapMessage(message));
		} else if (status) {
		
			var errorFileName = 'error.txt';
			if (!self.errorDest) {
				self.errorDest = new destinationGenerator({
					fileName: errorFileName,
					append: true
				});
			}
			self.errorDest.takeItAway(qtools.wrapMessage(message)); //bug: does not work if a callback is supplied. main data file writing works fine. weird.
			if (!program.quiet) {
				qtools.die('Errors were found. More info in ' + errorFileName);
			}
		}
	}

	var executeAccess = function(args) {

		var notificationCallback = function(err, result) {
			
			if (err){

				args.retryCount=(typeof(args.retryCount)=='undefined')?3:args.retryCount;
				if (args.retryCount){
					self.requestQueue.push(args);
				if (!program.quiet) {
					qtools.message('requeuing for file: ' + args.destination);
				}
					self.emit('executeNext');
				}
				else{
				logOutput(err, args.source, args.destination);
				
				}
				
			}
			else{
			logOutput(err, args.source, args.destination);
			if (!program.quiet) {
				qtools.message('finished file: ' + args.destination);
			}
			}
		
		
			self.emit('executeNext');
		}

		var destination = new destinationGenerator({
			fileName: args.destination,
			append: args.switches.append
		});

		var input = new inputGenerator({
			url: args.source
		});


		var conversion = new conversionGenerator({
			source: input,
			destination: destination,
			usablePayloadDottedPath: args.path,
			callback: notificationCallback,
			switches: args.switches,
			config:{ lineEnding:config.lineEnding}
		});

		conversion.doIt();

	}

	var getSpecsFromFile = function() {
		var fs = require('fs'),
			fileName = program.args[0],
			specs = fs.readFileSync(fileName, 'utf8');

		return JSON.parse(specs);
	}

	var getSpecsFromCommandLine = function() {

		var tmp = program.args[0].split(/\?|#/g),
			query = program.args[0].match(/\?(.*)/),
			query = query ? query : [],
			source = tmp[0] + (query[1] ? '?' + query[1] : ''),
			path = tmp[1];


		return [{
				source: source,
				path: path,
				destination: program.args[1],
				switches: {
					header: program.header,
					append: program.append
				}
			}];
	}

	//do it -------------------------------------------------------

	if (program.file) {
		this.requestQueue = getSpecsFromFile();
	} else {
		this.requestQueue = getSpecsFromCommandLine();
	}

	
	this.on('executeNext', function(){
		var next=self.requestQueue.pop();
		if (next){
		executeAccess(next);
		}
	});

	for (var i=0, len=config.concurrentLightningPipeCalls; i<len; i++){
		self.emit('executeNext');
	}




	return this;
};

//END OF moduleFunction() ============================================================

util.inherits(moduleFunction, events.EventEmitter);
module.exports = moduleFunction;

new moduleFunction();















