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


  this.runtimeParameters = {
      lineEnding: '\r\n', //optional, default is linux
      concurrentLightningPipeCalls: 3
    };

this.notifier=require('cloverleafNotifier');
this.notifier=new this.notifier({
	emailAddressList:'TQ Justkidding <tq@justkidding.com>',
	smtpSpecs:{
      host: 'smtp.mandrillapp.com',
      port: '587',
      auth: {
        user: 'tq@justkidding.com',
        pass: 'PASSWORDGOESHERE
      }
    },
    fromEmailAddress:'Cloverleaf Server<tq@erdc.k12.mn.us.com>',
    suppressNotification:true
	});



  //INITIALIZATION ====================================


	this.authParms={
		userName: 'jmcPlans1',
		password: 'PASSWORD'
	}

  return this;
};

//END OF moduleFunction() ============================================================

util.inherits(moduleFunction, events.EventEmitter);
module.exports = moduleFunction;
