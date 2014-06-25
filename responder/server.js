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

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

var router = express.Router();

router.get('/', function(req, res) {

	res.json({status:'hello', body:req.body, query:req.query});
});

router.post('/', function(req, res) {
	res.json({status:'hello', body:req.body, query:req.query});
});

app.use('/ping', router);

app.listen(config.port);
qtools.message('Magic happens on port ' + config.port);

