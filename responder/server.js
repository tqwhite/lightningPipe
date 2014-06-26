"use strict";
var qtools = require('qtools');
qtools = new qtools(module);

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var config = require('../config/requestServer.js');
config = new config();
config = config.specs();

var program = require('commander');
program.version('tqTest')
	.option('-y, --background', 'spawn to background')
	.parse(process.argv);

if (program.background) {
	qtools.die('background not yet implemented');
}

var transferPacket=require(__dirname+'/specs/transferPacket.js');
transferPacket=new transferPacket();
var testData=require(__dirname+'/specs/testData.js');

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
	transferPacket.reset().add('Meta', {body: req.body, query: req.query}).add('Data', {StudentPersonal:testData.StudentPersonal});
	res.json(transferPacket.finishedObject());
});

// router2.post('/', function(req, res) {
// 	res.json({
// 		status: 'school',
// 		body: req.body, query: req.query
// 	});
// });

app.use('/StudentPersonal', router2);

app.listen(config.port);
qtools.message('Magic happens on port ' + config.port);


