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

var localEnvironment = require('../config/localEnvironment.js');
global.localEnvironment = new localEnvironment();

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

var tableList = ['StudentPersonal', 'SchoolInfo'];

var urlMapping = {},
	name;

name = 'StudentPersonal';
urlMapping[name] = {
	tableName: 'Student',
	schemaName: 'student',
	outputObjName: name
};
name = 'SchoolInfo';
urlMapping[name] = {
	tableName: 'School',
	schemaName: 'school',
	outputObjName: name
};

global.urlMapping = urlMapping;

for (var i in global.urlMapping) {
	var tableName = i,
		controlObj = urlMapping[i];

	var generateSender = function(tableName, res, req) {

		return function(finishedObject, metaData) {
			//closure: tableName

			var result = {};
			result[tableName] = finishedObject;

			transferPacket.reset()
				.add('Meta', {
					body: req.body,
					query: req.query
				})
				.add('Data', result);
				
			if (global.localEnvironment.get('sendMetaData')){
				transferPacket.add('Meta', metaData);
			}

			res.json(transferPacket.finishedObject());
		}
	};


	router.get(new RegExp('/(' + tableName + ')'), function(req, res, next) {
		//closure: client

		var urlMappingKey = req.params[0],
			controlObj = global.urlMapping[urlMappingKey];

		var sender = generateSender(tableName, res, req);

		var dataSource = require('dataAccess');
		dataSource = new dataSource({
			callback: sender,
			clientProfile: client.profile(),
			tableName: controlObj.tableName,
			schemaName:controlObj.schemaName
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









