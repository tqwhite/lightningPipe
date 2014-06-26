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
		
		var baseObject={
			Date:new Date(),
			Status:1,
			Data:{},
			Meta:{},
			Message:''
		};
		
		this.outObject=baseObject;
			
		//METHODS ====================================
		
		self.add=function(name, value){
			self.outObject[name]=value;
			return self;
		}
		
		self.finishedObject=function(){
			return self.outObject;
		}
		
		self.reset=function(){
			this.outObject=baseObject;
			return self;
		}
			
		//BUILD RETURN OBJECT ====================================

		this.forceEvent = forceEvent;
		
		
		return this;
	};

//END OF moduleFunction() ============================================================

util.inherits(moduleFunction, events.EventEmitter);
module.exports=moduleFunction;