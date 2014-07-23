'use strict';
var qtools=require('qtools'),
	qtools=new qtools(module),
	events = require('events'), 
	util=require('util');

//START OF moduleFunction() ============================================================

var moduleFunction=function(args){
		events.EventEmitter.call(this);
		var self = this,
			forceEvent = function(eventName, outData) {
				this.emit(eventName, {
					eventName: eventName,
					data: outData
				});
			}

		//INITIALIZE OBJECT ====================================

		this.args=args;
		
		if (args && args.category){this.category=args.category;}
		
		this.specs=function(category){
			category=category || self.category;
			
			if (category=='forReal'){
				return{	
					port: '8082'
				};
			}
			else{ //test port
				return{	
					port: '8081'
				};
			}
		
		}
			
		//BUILD RETURN OBJECT ====================================

		this.forceEvent = forceEvent;
		return this;
	};

//END OF moduleFunction() ============================================================

util.inherits(moduleFunction, events.EventEmitter);
module.exports=moduleFunction;