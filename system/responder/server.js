"use strict";
var qtools = require('qtools');
qtools = new qtools(module);

var express = require('express');
var app = express();

//SET UP APPLICATION =======================================================

var localEnvironment = require('../config/localEnvironment.js');
global.localEnvironment = new localEnvironment({
	appName: 'lightningpipe'
});

global.localEnvironment.log.info({
	startup: "STARTING LightningPipe==================== "
});

var config = require('../config/lightningPipe.js');
config = new config();


//INITIALIZE =======================================================

var outputGenerator = require("sender");
var model = require('hybridModel');
var apiDefinition;
var client;

var router = express.Router();
app.use('/', router);

//START AUTHENTICATION =======================================================

router.use(function(req, res, next) {


	client = require('client');
	client = new client({
		clientProfileSource: config.clientProfileSource,
		req: req
	});

	client.on('validAuth', function() {
		var tmp = qtools.clone(req.headers);
		delete tmp.password;
		global.localEnvironment.log.debug({
			message: 'SUCCESSFUL LOGIN',
			evidence: tmp.userName
		})
		next();
	});

	client.on('badAuth', function(info) {
	
		if (req.originalUrl=='/ping'){ next(); return; }

		var tmp = qtools.clone(req.headers);
		delete tmp.password;
		global.localEnvironment.log.info({
			message: 'FAILED LOGIN ATTEMPT, see debug log for details',
			evidence: tmp.userName
		})
		global.localEnvironment.log.debug({
			message: 'FAILED LOGIN ATTEMPT',
			evidence: tmp
		})

		var outputObj = new outputGenerator();
		var sender = outputObj.generateSender(res, req);
		sender({
			result: 'bad login parameters'
		});

		//		res.json(client.errorResult());
	});

	client.auth(req.headers);

});

//START ROUTING FUNCTION =======================================================


var apiName="uff",
	apiVersion='1.0';

router.get(new RegExp('/' + apiName + '/' + apiVersion + '/(.*)'), function(req, res, next) {
	//closure: client
	
	apiDefinition = require("apiDefinition")
	apiDefinition = new apiDefinition({
		name: apiName,
		version: apiVersion
	});
	global.localEnvironment.updateBaseUri(apiDefinition, req);

	var outputObj = new outputGenerator();
	var sender = outputObj.generateSender(res, req); //returns a function with res, req closed into it

	var executionPackage = {
		uriPath: req.params[0],
		clientProfile: client.profile(),
		apiDefinition: apiDefinition,
		parameters: req.query
	};

	global.localEnvironment.log.debug({
		executionPackage: executionPackage
	})

	client.setApi(apiDefinition);

	var sessionModel = new model(executionPackage);

	sessionModel.on('gotData', function(result) {
		result.meta = qtools.mergeMetaData(result.meta);
		sender('', result);
	});

	sessionModel.on('badData', function(result) {
		result.meta = qtools.mergeMetaData(result.meta);
		sender(result, '');
	});

	sessionModel.getData();

}); //end of main GET process ---------------------------------------------------

//START ROUTE GROUP (ping) =======================================================

router.get('/ping', function(req, res, next) {
	//closure: client

	res.json({
		status: 'hello from ping/get',
		body: req.body,
		query: req.query,
		client: client.profile()
	});
});

router.post('/ping', function(req, res, next) {
	res.json({
		status: 'hello from ping/post',
		body: req.body,
		query: req.query
	});
});

//START SERVER =======================================================

app.listen(config.port);

qtools.message('Magic happens on port ' + config.port);

