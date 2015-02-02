'use strict';
var qtools = require('qtools'),
	qtools = new qtools(module),
	events = require('events'),
	util = require('util');

//START OF moduleFunction() ============================================================

var moduleFunction = function() {
	events.EventEmitter.call(this);
	this.forceEvent = forceEvent;
	this.ping = qtools.ping;

	var self = this,
		forceEvent = function(eventName, outData) {
			this.emit(eventName, {
				eventName: eventName,
				data: outData
			});
		};

	//get startup switches -------------------------------------------------------

	var program = require('commander');
	program.version('tqTest')
		//	.option('-y, --background', 'spawn to background')
		.option('-a, --append', 'append data to file if file is present')
		.option('-h, --header', 'add header row with field names')
		.option('-v, --verbose', '(lowercase) -v, show messages instead of putting into file')
		.option('-p, --params', 'Display configuration and environment parameters')
		.option('-q, --quiet', 'no messages')
		.option(', --file', 'get specs from file')
		.option('-o, --overrideParentPath', 'Use this path instead of the one in the spec file (only valid with -f)')
		.parse(process.argv);
		program.argumentData=qtools.extractParameters('', program);


	if (program.background) {
		qtools.die('background not yet implemented');
	}

	//set up application -------------------------------------------------------

	var localEnvironment = require(__dirname + '/../config/localEnvironment.js');
	global.localEnvironment = new localEnvironment({
		appName: 'cloverleaf'
	});
	global.localEnvironment.log.info({
		startup: "STARTING CLOVERLEAF==================="
	});

	var config = require('../config/cloverleaf.js');
	config = new config();
	global.localEnvironment.log.info({
		accessingAsUser: config.authParms.userName
	});

	var runtimeParameters = config.runtimeParameters;

	if (program.params) {
		global.localEnvironment.display();
		config.display();
		qtools.die('parameters done');
	}

	//instance/closure variables -------------------------------------------------------

	var dataBufferList = {},
		controlSpecifications,
		inputGenerator = require('apiAccessor'),
		dataBufferGenerator=require('dataBuffer'),
		destinationGenerator = require('destination'),
		collectorGenerator = require('collector'),
		transformationGenerator=require('transformation');

	//worker functions -------------------------------------------------------

	var displayMessage=function(err, displayMessage, logMessage){

		if (!program.quiet) {
			if (err) {
				qtools.message(displayMessage+qtools.dump(err, true), 'black');
// 				var errorFileName = global.localEnvironment.logFileDirectory + 'error.txt';
// 				qtools.writeSureFile(errorFileName, qtools.wrapMessage(message), {append:true})
			} else {
				qtools.message(displayMessage, 'blue');
			}
		}
		
			if (err) {
		global.localEnvironment.log.warn({
			cloverleaf: {
				type: 'cloverleaf.topLevelError',
				message: logMessage,
				err: err
			}
		});
		}

		
	}
	var pushToFailureList = function(item) {
		if (!self.failureList) {
			self.failureList = [];
		}

		self.failureList.push(item);
	}

	var formatFailureListInfo = function() {

		var outMessage = '';

		for (var i = 0, len = self.failureList.length; i < len; i++) {
			var element = self.failureList[i];
			outMessage += 'FAILED for file: ' + element.destination + ' from (' + element.source + ')\n';

		}

		return outMessage;
	}
	
	var writeFinalError=function(){
		
			global.localEnvironment.log.error({
				cloverleaf: {
					source: 'cloverleaf.errorExit',
					data: formatFailureListInfo()
				}
			});

			config.notifier && config.notifier.addInfo("Cloverleaf DID NOT FINISH SUCCESSFULLY. THERE WERE ERRORS.");
			config.notifier && config.notifier.addInfo(formatFailureListInfo());
			config.notifier && config.notifier.setErrorMode(); //sends email if config doesn't suppress it

			qtools.errorExit(formatFailureListInfo());
		
	}

	var wrapUp = function() {
		if (typeof (self.failureList) != 'undefined') {
			writeFinalError();
		} else {

			global.localEnvironment.log.info({
				successExit: 'Cloverleaf finished successfully'
			});
			config.notifier && config.notifier.addInfo("Cloverleaf finished successfully");


			var messageSuccessExit = function() {return;
				if (!program.quiet) {
				//	qtools.successExit('Cloverleaf finished successfully');
					qtools.message('Cloverleaf finished successfully');
				} else {
				//	qtools.successExit();
				}
			}

			if (config.notifier) {
				config.notifier.transmit(function(notificationError) {
					if (!program.quiet) {
						console.log(notificationError);
					}
					messageSuccessExit();
				}, function(notificationInfo) {
					if (!program.quiet) {
						console.log(notificationInfo.response);
					}
					messageSuccessExit();
				}
				);
			} else {
				messageSuccessExit();
			}



		}
	}

	var validateAndCleanSpecs = function(specs) {

		var parentPath = qtools.getSurePath(specs, "output.context.parentPath");
		parentPath = (!parentPath || parentPath.match(/\/$/)) ? parentPath : parentPath + '/';

		qtools.putSurePath(specs, "output.context.parentPath", parentPath);

		return specs;
	}

	//main routines -------------------------------------------------------

	var getSpecsFromFile = function() {
		var fs = require('fs'),
			fileName = program.argumentData.file,
			specs = fs.readFileSync(fileName, 'utf8');

		specs = validateAndCleanSpecs(JSON.parse(specs));

		return specs;
	}

	var getSpecsFromCommandLine = function() {

		var tmp = program.args[0].split(/\?|#/g),
			query = program.args[0].match(/\?(.*)/),
			query = query ? query : [],
			source = tmp[0] + (query[1] ? '?' + query[1] : ''),
			path = tmp[1];

		var newFormat = {

			input: [
				{
					source: source,
					destination: program.args[1],
					path: path
				}
			],
			process: {
				type: 'passThrough'
			},
			output: {
				type: 'file',
				context: {
					parentPath: '' //expect a fully expressed path in command line
				},
				control: {
					append: program.append,
					header: program.header
				}
			}
		}
		return newFormat;


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

	var executionController = function() {

		var next = self.requestQueue.pop();

		if (next) {

			global.localEnvironment.log.debug({
				cloverleafAction: next
			})

			addToOutstandingList(next);
			getData(next);
		}
	};

	var getData = function(args) {

		var notificationCallback = function(err, result) {
			delete self.outstandingList[args.key];
			if (err) {
				args.retryCount = (typeof (args.retryCount) == 'undefined') ? 3 : args.retryCount - 1;
				if (args.retryCount > 0) {
					self.requestQueue.push(args);
					executionController();
						displayMessage(err, 'REQUEUING for input segment: ' + args.destination + ' from (' + args.source + ') ' + args.retryCount + ' (reason : ' + err.message + ')');

				} else {

					global.localEnvironment.log.fatal({
						FATAL: {
							args: args,
							err: err
						}
					}, 'a request failed');

						displayMessage(err, 'FAILED for input segment:    ' + args.destination + '    from    ' + args.source + '    ' + args.retryCount + '    as user    ' + config.authParms.userName + '   (reason : ' + err.message + ')');
						config.notifier && config.notifier.addInfo("ERROR NOT UPDATED: " + args.destination);

						pushToFailureList(args);

				}

			} else {

				global.localEnvironment.log.debug({
					UPDATEDINPUTSEGMENT: args
				});
				global.localEnvironment.log.info({
					UPDATEDINPUTSEGMENT: {
						file: args.destination,
						url: args.source
					}
				});
				config.notifier && config.notifier.addInfo("Updated: " + args.destination);

					displayMessage('', 'updated input segment:    ' + args.destination + '    from ' + args.source + '    as user    ' + config.authParms.userName);

			}

			if (qtools.count(self.outstandingList) === 0 && qtools.count(self.requestQueue) === 0) {
				finishProcessing();
				return;
			}

			executionController();
		}

		if (!dataBufferList[args.destination]) {
			var dataBuffer = new dataBufferGenerator({
				fileName: args.destination,
				outputSpec: controlSpecifications.output,
				config: config
			});
			dataBufferList[args.destination] = dataBuffer;

		} else {
			dataBuffer = dataBufferList[args.destination];
		}

		var input = new inputGenerator({
			url: args.source,
			authParms: config.authParms //from config/cloverleaf.js
		});

		var collector = new collectorGenerator({
			source: input,
			dataBuffer: dataBuffer,
			usablePayloadDottedPath: args.path,
			callback: notificationCallback
		});

		collector.doIt();

	}


	var finishProcessing = function() {


		controlSpecifications.output.fileFormat = controlSpecifications.output.fileFormat ? controlSpecifications.output.fileFormat : 'tabDelimitted'; //someday it could be 'JSON'
		var destinationSource = new destinationGenerator({
			outputSpec: controlSpecifications.output,
			config: config
		});

		var transformationCallback = function(outputDataBufferList) {
			var writeCount = qtools.count(outputDataBufferList);
			for (var fileName in outputDataBufferList) {
				var outputBuffer = outputDataBufferList[fileName];
				var destination = destinationSource.writer(fileName);

				var charCount=destination.takeItAway(outputBuffer, function(err, result) {
					writeCount = writeCount - 1;

					if (writeCount) {
						displayMessage(err, 'completion status: ' + result.targetDataId + ' ('+result.summaryString+')\n');
					} else {
						displayMessage(err, 'completion status:  ' + result.targetDataId + ' ('+result.summaryString+') (exiting)\n');
						wrapUp();
					}
				});
			}
		}
		
		var transformer = new transformationGenerator({
			transformSpecs: controlSpecifications.transform,
			config: config,
			dataBufferList: dataBufferList,
			callback: transformationCallback
		});

	}



	//make it go -------------------------------------------------------

	if (program.file) {
		controlSpecifications = getSpecsFromFile();
		
		if (program.overrideParentPath && program.argumentData.overrideParentPath){
			controlSpecifications=qtools.putSurePath(controlSpecifications, 'output.context.parentPath', program.argumentData.overrideParentPath+'/');
		}
		
		this.requestQueue = controlSpecifications.input;
	} else {
		controlSpecifications = getSpecsFromCommandLine();
		this.requestQueue = controlSpecifications.input;
	}

	for (var i = 0, len = runtimeParameters.concurrentLightningPipeCalls; i < len; i++) {
		executionController();
	}

	return this;
};

//END OF moduleFunction() ============================================================

util.inherits(moduleFunction, events.EventEmitter);
module.exports = moduleFunction;

new moduleFunction();





















