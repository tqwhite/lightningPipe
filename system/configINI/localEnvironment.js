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




	this.sendMetaData = false;

	this.authParms={
		userName: 'SFTP',
		password: 'hello'
	}

	
	this.dataFileDirectory = '/Volumes/qubuntuFileServer/cmerdc/lightningPipe/testDataFiles/';

	this.logFileDirectory = '/Volumes/qubuntuFileServer/cmerdc/lightningPipe/logFiles/';

	this.clientProfileSource = {
		type:'file',
		filePath:'/Volumes/qubuntuFileServer/cmerdc/lightningPipe/system/config/clientProfiles/'
		};
	
	this.updateBaseUri = function(apiDefinition, req) {
		if (typeof(req.socket.localPort)!='undefined') {
			var port = ':' + port;
		}
		else{
			var port='';
		}
		this.baseUri = req.protocol + '://' + req.host + port + '/' + apiDefinition.name + '/' + apiDefinition.version + '/';
	}




//logging ==============



	var mailOptions = {
		from: 'TQ White II <tq@tqwhite.com>',
		to: 'tq@justkidding.com',
	}
	
	var EmailStream = require('bunyan-emailstream').EmailStream
	var emailStream = new EmailStream(mailOptions, {});
	
	var logger = require('bunyan');
	
	this.log = new logger({
		name: args.appName,
		streams: [
			// 		{
			// 			stream: process.stdout,
			// 			level: 'debug'
			// 		},
			{
				path: this.logFileDirectory + 'lightningClover.log',
				level: 'trace'
			}
// 			,
// 			{
// 				type: 'raw', // You should use EmailStream with 'raw' type!
// 				stream: emailStream,
// 				level: 'fatal',
// 			}
		],
		src: false
	});


//this.log.fatal({FATALTEST:'goodbye'}, args.appName+' Test Email from Bunyan logging');

	//==================================================	


	this.get = function(name) {
		return this[name];
	}

	//BUILD RETURN OBJECT ====================================

	this.forceEvent = forceEvent;
	return this;
};

//END OF moduleFunction() ============================================================

util.inherits(moduleFunction, events.EventEmitter);
module.exports = moduleFunction;


