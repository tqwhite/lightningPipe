'use strict';
var qtools = require('qtools'),
	qtools = new qtools(module),
	events = require('events'),
	util = require('util');

//START OF moduleFunction() ============================================================

var moduleFunction = function(sourceData, targetServerAccess, controlObj, commandFlags, config) {
	events.EventEmitter.call(this);
	var self = this;


	var conversionFunction = function() {

		sourceData.mapFieldNames();
		sourceData.processLines();
		sourceData.convert();
		sourceData.assemble();


		if (typeof (finishedOutputObject) == 'undefined') {
			finishedOutputObject = {};
			finishedOutputObject[controlObj.outboundFinalObjectName] = sourceData.finishedObject; //very often, I find it useful to generate an object literal above for testing and don't want to have it overwritten here
		}

		var wrapupCallback = 'no final output wanted';

		if (commandFlags.verbose) {
			qtools.dump({
				sourceObjectList: sourceData.sourceObjectList
			});
			qtools.dump({
				finishedOutputObject: finishedOutputObject
			});

			console.log('\n\nstarting api write');
			wrapupCallback = targetServerAccess.writeResultMessages;
		}
		if (commandFlags.dumpJson) {
			console.log('\n\n' + JSON.stringify(finishedOutputObject) + '\n\n');
		}
		targetServerAccess.saveCompletedObject(finishedOutputObject, controlObj.apiEndpoint, wrapupCallback);

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

		if (commandFlags.pingOnly) {
			targetServerAccess.pingApiEndpoint(controlObj);
		} else {
			if (commandFlags.verbose) {
				console.log('\n\nstarting conversion\n\n');
			}

			sourceData.execute();
			sourceData.on('textToJson.gotData', conversionFunction);
		}
	}

	//INITIALIZE OBJECT ====================================

	var finishedOutputObject;

	var communicationObject = qtools.extend(
			config.loginInfo(),
			{
				loginCallback: loginFoundCallback,
				dryRun: ( !commandFlags.forReal && !commandFlags.pingOnly),
				dumpJson: commandFlags.dumpJson
			}
		);

	targetServerAccess.start(communicationObject);


	return this;
};

//END OF moduleFunction() ============================================================

util.inherits(moduleFunction, events.EventEmitter);
module.exports = moduleFunction;
