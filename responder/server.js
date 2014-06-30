"use strict";
var qtools = require('qtools');
qtools = new qtools(module);

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var config = require('../config/requestServer.js');
config = new config();

var program = require('commander');
program.version('tqTest')
	.option('-y, --background', 'spawn to background')
	.option('-f, --forReal', 'access database, not test data')
	.option('-f, --test', 'access test data, not database, default')
	.parse(process.argv);

if (program.background) {
	qtools.die('background not yet implemented');
}

var transferPacket = require(__dirname + '/specs/transferPacket.js');
transferPacket = new transferPacket();

var dataSource, listenerPort;
if (program.forReal) {
	dataSource = require(__dirname + '/specs/testData.js');
	config = config.specs('forReal');
} else {
	dataSource = require(__dirname + '/specs/testData.js');
	config = config.specs('test');
}

app.use(bodyParser.urlencoded({
	extended: true
}))

app.use(bodyParser.json())

var router = express.Router();

router.get('/', function(req, res) {

	res.json({
		status: 'hello',
		body: req.body,
		query: req.query
	});
});

router.post('/', function(req, res) {
	res.json({
		status: 'hello',
		body: req.body,
		query: req.query
	});
});

app.use('/ping', router);

var router2 = express.Router();








router2.get('/', function(req, res) {
	var requestClosed=req;
	
	var dataSource = {
		textToJson: require('textToJson'), //this doesn't get used until passed to the commandLIneResponder
		dictionary: require('dictionary')
	};

	dataSource.dictionary = new dataSource.dictionary({
		//		dataDefinition: require("./dataDefinitions/" + dictionaryName + ".js"),
		dataDefinition: require("../dataDefinitions/" + 'uffDefinition' + ".js"),
		target: 'expressbook',
		skipFirstLine: true
	});

	var fileName = __dirname+'/../dataFiles/uff/peopleSetup/student.uff';

	var controlObj = {
		apiEndpoint: '/data/API/1/Student',
		outboundFinalObjectName: 'StudentPersonal',
		definitionName: 'student'
	};
	var sourceData = new dataSource.textToJson(fileName, dataSource.dictionary.get(controlObj.definitionName))

	sourceData.execute();
	sourceData.on('gotData', function() {


		sourceData.mapFieldNames();
		sourceData.processLines();
		sourceData.convert();
		sourceData.assemble();

		transferPacket.reset()
			.add('Meta', {
				body: requestClosed.body,
				query: requestClosed.query
			})
			.add('Data', {
				StudentPersonal: sourceData.finishedObject
			});

		res.json(transferPacket.finishedObject());
	});
});






router2.get(/LocalId\/(.*)/, function(req, res) {

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

app.use('/StudentPersonal', router2);

app.listen(config.port);
qtools.message('Magic happens on port ' + config.port);




