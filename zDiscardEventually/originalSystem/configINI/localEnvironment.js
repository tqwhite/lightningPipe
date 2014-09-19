'use strict';
var qtools = require('qtools'),
	qtools = new qtools(module),
	events = require('events'),
	util = require('util');

//START OF moduleFunction() ============================================================

var moduleFunction = function(args) {
	events.EventEmitter.call(this);
	var self = this,
		forceEvent = function(eventName, outData) {
			this.emit(eventName, {
				eventName: eventName,
				data: outData
			});
		}

		//INITIALIZE OBJECT ====================================

	this.args = args;



	// 				this.sendMetaData=false;
	// 				this.testServer=false;


	this.sendMetaData = true;
	this.testServer = true;
	
	this.dataFileDirectory='/Volumes/qubuntuFileServer/cmerdc/lightningPipe/testDataFiles/';


	
	this.get=function(name){
		return this[name];
	}

	//BUILD RETURN OBJECT ====================================

	this.forceEvent = forceEvent;
	return this;
};

//END OF moduleFunction() ============================================================

util.inherits(moduleFunction, events.EventEmitter);
module.exports = moduleFunction;
