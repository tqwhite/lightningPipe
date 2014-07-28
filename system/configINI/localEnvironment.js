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




// 	this.sendMetaData = true;
// 	this.testServer = true;


	this.sendMetaData = false;
	this.testServer = false;


	
	this.dataFileDirectory='/Volumes/qubuntuFileServer/cmerdc/lightningPipe/dataFiles/';
	
	
	this.scheme='http';
	this.domain='localhost';


	this.updateBaseUri=function(apiName, apiVersion, port){
		if (port){port=':'+port;}
	this.baseUri=this.scheme+'://'+this.domain+port+'/'+apiName+'/'+apiVersion+'/';
	}
	

	
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
