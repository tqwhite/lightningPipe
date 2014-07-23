"use strict";
var qtools = require('qtools');
qtools = new qtools(module);

var express = require('express');
var app = express();




/*
curl http://localhost:8081/uff/1.0/districts/ | pbcopy
curl http://localhost:8081/uff/1.0/districts/albany/schools
curl http://localhost:8081/uff/1.0/districts/albany/schools/010
curl http://localhost:8081/uff/1.0/districts/albany/schools/010/segments/StudentBaseTest2
*/



var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

//GET STARTUP SWITCHES =======================================================

var program = require('commander');
program.version('tqTest')
//	.option('-y, --background', 'spawn to background')
	.option('-f, --forReal', 'access database, not test data')
	.option('-f, --test', 'access test data, not database, default')
	.parse(process.argv);

if (program.background) {
	qtools.die('background not yet implemented');
}

//SET UP APPLICATION =======================================================

var localEnvironment = require('../config/localEnvironment.js');
global.localEnvironment = new localEnvironment();

var config = require('../config/requestServer.js');
config = new config();

var dataSource, listenerPort;
if (program.forReal) {
	//dataSource = require(__dirname + '/specs/testData.js');
	config = config.specs('forReal');
} else {
	//	dataSource = require(__dirname + '/specs/testData.js');
	config = config.specs('test');
}


var router = express.Router();
app.use('/', router);

var client;

//START AUTHENTICATION =======================================================


router.use(function(req, res, next) {

	client = require('client');
	client = new client({
		req: req
	});



	client.on('validAuth', next);
	client.on('badAuth', function() {
		console.log('invalid client');
		res.json(client.errorResult());
	});



	client.auth(req);

});



//START ROUTE SETUP =======================================================



var output = require("sender");

var model = require('hybridModel');


var uriParser = require("uriParser");
uriParser = new uriParser({
	apiName: "uff",
	apiVersion: '1.0'
});

var apiVersion = uriParser.getVersion(),
	apiName = uriParser.getName();
	
	global.localEnvironment.updateBaseUri(apiName, apiVersion);


//START ROUTING FUNCTION =======================================================

router.get(new RegExp('/' + apiName + '/' + apiVersion + '/(.*)'), function(req, res, next) {
	//closure: client
	var sender = new output();

	req.params.queryInfo = uriParser.parse(req.params[0]);


	var sender = sender.generateSender('tablename', res, req);

	var sessionModel = new model({
		queryInfo: req.params.queryInfo,
		clientProfile: client.profile()
	});
	
	qtools.addMetaData('queryInfo', req.params.queryInfo);
	
	sessionModel.on('gotData', function(result) {
		result.meta=qtools.mergeMetaData(result.meta);
		sender('', result);
	});

	sessionModel.on('badData', function(result) {
		result.meta=qtools.mergeMetaData(result.meta);
		sender(result);
	});

	sessionModel.getData();

});



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












