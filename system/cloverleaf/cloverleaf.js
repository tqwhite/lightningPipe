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
	global.localEnvironment = new localEnvironment({appName:'cloverleaf'});
	global.localEnvironment.log.info({startup:"STARTING CLOVERLEAF==================="});

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

			var errorFileName = global.localEnvironment.logFileDirectory+'error.txt';
			if (!self.errorDest) {
				self.errorDest = new destinationGenerator({
					fileName: errorFileName,
					append: true
				});
			}
			self.errorDest.takeItAway(qtools.wrapMessage(message)); //bug: does not work if a callback is supplied. main data file writing works fine. weird.
			if (!program.quiet) {
				qtools.message('Errors were found. More info in ' + errorFileName);
			}
		}
	}

	var documentFailure = function(item) {
		if (!self.failureList) {
			self.failureList = [];
		}

		self.failureList.push(item);
	}

	var getFailureInfo = function() {
	
	var outMessage='';

		for (var i = 0, len = self.failureList.length; i < len; i++) {
				var element=self.failureList[i];
				outMessage+='FAILED for file: ' + element.destination + ' from (' + element.source + ')\n';

		}
		
		return outMessage;
	}
	
	var finishProcess=function(){
		if (typeof(self.failureList)!='undefined'){
		
			global.localEnvironment.log.error({errorExit:getFailureInfo()});
			qtools.errorExit(getFailureInfo());
		}
		else{

			global.localEnvironment.log.info({successExit:'Cloverleaf finished successfully'});
			if (!program.quiet) {
				qtools.successExit('Process finished successfully');
			}
			else{
				qtools.successExit();
			}
			
		}
	}

	var executeAccess = function(args) {

		var notificationCallback = function(err, result) {


			delete self.outstandingList[args.key];
			if (err) {

				args.retryCount = (typeof (args.retryCount) == 'undefined') ? 3 : args.retryCount - 1;
				if (args.retryCount > 0) {
					self.requestQueue.push(args);
					self.emit('executeNext');
					global.localEnvironment.log.warn({REQUEUING:args});
					if (!program.quiet) {
					
						qtools.message('REQUEUING for file: ' + args.destination + ' from (' + args.source + ')' + args.retryCount);
					}
				} else {
				
					global.localEnvironment.log.fatal({FATALY:args}, 'a request failed');
			
					if (!program.quiet) {
						qtools.message('FAILED for file: ' + args.destination + ' from (' + args.source + ')' + args.retryCount);

						documentFailure(args);

					}
					logOutput(err, args.source, args.destination);

				}

			} else {
				logOutput(err, args.source, args.destination);
				
				global.localEnvironment.log.info({UPDATEDFILE:args});
					
				if (!program.quiet) {
					qtools.message('updated file: ' + args.destination + ' from (' + args.source + ')');
				}
			}

			if (qtools.count(self.outstandingList)===0){
				finishProcess();
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
			config: {
				lineEnding: config.lineEnding
			}
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

	var addToOutstandingList = function(item) {

		if (typeof (self.outstandingList) == 'undefined') {
			self.outstandingList = {};
		}

		if (typeof (item.key) == 'undefined') {
			item.key = qtools.newGuid();
		}

		if (self.outstandingList[item.key]) {
			qtools.die("outstandingList has same item twice", item);
		}

		self.outstandingList[item.key] = item;
	}

	var executionHandler = function() {
		var next = self.requestQueue.pop();

		if (next) {
			
			global.localEnvironment.log.info({executionHandler:next})
	
			addToOutstandingList(next);
			executeAccess(next);
		}
	};

	//do it -------------------------------------------------------

	if (program.file) {
		this.requestQueue = getSpecsFromFile();
	} else {
		this.requestQueue = getSpecsFromCommandLine();
	}




	this.on('executeNext', executionHandler);

	for (var i = 0, len = config.concurrentLightningPipeCalls; i < len; i++) {
		self.emit('executeNext');
	}




	return this;
};

//END OF moduleFunction() ============================================================

util.inherits(moduleFunction, events.EventEmitter);
module.exports = moduleFunction;

new moduleFunction();


















