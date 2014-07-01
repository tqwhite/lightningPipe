"use strict";
var qtools = require('qtools');
qtools = new qtools(module);

var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

//GET STARTUP SWITCHES =======================================================

var program = require('commander');
program.version('tqTest')
	.option('-y, --background', 'spawn to background')
	.option('-f, --forReal', 'access database, not test data')
	.option('-f, --test', 'access test data, not database, default')
	.parse(process.argv);

if (program.background) {
	qtools.die('background not yet implemented');
}

//SET UP APPLICATION =======================================================

var config = require('../config/requestServer.js');
config = new config();

var dataSource, listenerPort;
if (program.forReal) {
	dataSource = require(__dirname + '/specs/testData.js');
	config = config.specs('forReal');
} else {
	dataSource = require(__dirname + '/specs/testData.js');
	config = config.specs('test');
}

var transferPacket = require(__dirname + '/specs/transferPacket.js');
transferPacket = new transferPacket();

var router = express.Router();
app.use('/', router);

var client;

//START AUTHENTICATION =======================================================


router.use(function(req, res, next) {

	client = require('client');
	client = new client({ //will eventually come from req
		id: 'hello',
		requestToken: 'goodbye'
	});

	if (client.auth() === 1) {
		next();
	} else {
		console.log('invalid client');
		res.json(client.errorResult());
	}
});



//START ROUTE GROUP (ping) =======================================================

router.get('/ping', function(req, res, next) {
	//closure: client

	res.json({
		status: 'hello',
		body: req.body,
		query: req.query,
		client: client.profile()
	});
});

router.post('/ping', function(req, res, next) {
	res.json({
		status: 'hello',
		body: req.body,
		query: req.query
	});
});



	

//START ROUTE GROUP (StudentPersonal) =======================================================

var generator=function(tableName, res, req){
	return function(finishedObject) {

		var result={};
		result[tableName]=finishedObject;
	
		transferPacket.reset()
			.add('Meta', {
				body: req.body,
				query: req.query
			})
			.add('Data', result);

		res.json(transferPacket.finishedObject());
	}
}

var tableList=['StudentPersonal', 'SchoolInfo'];

	for (var i=0, len=tableList.length; i<len; i++){
		var tableName=tableList[i];

		router.get('/'+tableName, function(req, res, next) {
			var dataSource=require('dataAccess');
			dataSource=new dataSource({
				callback:generator(tableName, res, req), 
				clientProfile:client.profile(),
				tableName:tableName
			});
		});

	}





router.get(/StudentPersonal\/LocalId\/(.*)/, function(req, res, next) {

	req.params.LocalId = req.params[0];

	transferPacket.reset()
		.add('Meta', {
			x: 'LocalId',
			body: req.body,
			query: req.query
		})
		.add('Data', {
			StudentPersonal: {
				LocalId: req.params.LocalId,
				note: 'not actually looked up'
			}
		});

	res.json(transferPacket.finishedObject());
});


//START SERVER =======================================================

app.listen(config.port);
qtools.message('Magic happens on port ' + config.port);






