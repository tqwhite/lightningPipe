'use strict';
var qtools = require('qtools'),
	qtools = new qtools(module),
	events = require('events'),
	util = require('util');

//START OF moduleFunction() ============================================================

var moduleFunction = function(dataSource, controlObj, program, config, fileName) {
	events.EventEmitter.call(this);
	var self = this;


	var conversionFunction = function() {

		sourceData.mapFieldNames();
		sourceData.processLines();
		sourceData.convert();
		sourceData.assemble();


		if (typeof (finishedOutputObject) == 'undefined') {
			finishedOutputObject = {};
			finishedOutputObject[controlObj.endPointWrapperName] = sourceData.finishedObject; //very often, I find it useful to generate an object literal above for testing and don't want to have it overwritten here
		}

		var wrapupCallback = 'no final output wanted';

		if (program.verbose) {
			qtools.dump({
				sourceObjectList: sourceData.sourceObjectList
			});
			qtools.dump({
				finishedOutputObject: finishedOutputObject
			});

			console.log('\n\nstarting api write');
			wrapupCallback = dataSource.targetServerAccess.writeResultMessages;
		}
		if (program.dumpJson) {
			console.log('\n\n' + JSON.stringify(finishedOutputObject) + '\n\n');
		}
		dataSource.targetServerAccess[controlObj.accessModelMethodName](finishedOutputObject, controlObj.apiEndpoint, wrapupCallback);

	}

	var loginFoundCallback = function(error, response, body) {

		if (error) {
			console.log('\n\n\n=============== LOGIN ERROR ===========================\n');
			console.log(error);
			console.log('\n===================================================\n');
			qtools.die();
		} else {

			doSomeWork();
		}
	}

	var doSomeWork = function() {

		if (program.pingOnly) {
			dataSource.targetServerAccess.pingApiEndpoint(controlObj);
		} else {
			if (program.verbose) {
				console.log('\n\nstarting conversion\n\n');
			}

			sourceData.execute();
			sourceData.on('gotData', conversionFunction);
		}
	}

	//INITIALIZE OBJECT ====================================

	var finishedOutputObject;

	var converter = dataSource.textToJson,
		sourceData = new converter(fileName, dataSource.dictionary.get(controlObj.definitionName)),
		communicationObject = qtools.extend(
			config.loginInfo(),
			{
				loginCallback: loginFoundCallback,
				dryRun: ( !program.forReal && !program.pingOnly),
				dumpJson: program.dumpJson
			}
		);

	dataSource.targetServerAccess.start(communicationObject);


	return this;
};

//END OF moduleFunction() ============================================================

util.inherits(moduleFunction, events.EventEmitter);
module.exports = moduleFunction;
