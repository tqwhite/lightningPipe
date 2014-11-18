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


//server configuration ==============

	this.sendMetaData = false;
	this.testServer = false;

	//global.localEnvironment.testServer

//file system configuration ==============
	
	this.dataFileDirectory='/Volumes/qubuntuFileServer/cmerdc/lightningPipe/dataFiles/';
	this.logFileDirectory='/Volumes/qubuntuFileServer/cmerdc/lightningPipe/logFiles/';

//logging ==============

	var logger = require('bunyan');
	this.log = new logger({name: 'development' ,
	streams: [
// 		{
// 			stream: process.stdout,
// 			level: 'debug'
// 		},
		{
			path: this.logFileDirectory + 'lightningClover.log',
			level: 'trace'
		}
	], src:true});

//uri Setup ==============

	this.scheme = 'http';
	this.domain = 'localhost';

	this.updateBaseUri = function(apiName, apiVersion, port) {
		if (port) {
			port = ':' + port;
		}
		this.baseUri = this.scheme + '://' + this.domain + port + '/' + apiName + '/' + apiVersion + '/';
	}



	//BUILD RETURN OBJECT ====================================

	this.get = function(name) {
		return this[name];
	}

	this.forceEvent = forceEvent;
	return this;
};

//END OF moduleFunction() ============================================================

util.inherits(moduleFunction, events.EventEmitter);
module.exports = moduleFunction;

