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

	var list=[];
	for (var i in req){
		var element=req[i];
		console.log(i);
	}
	res.json({body:req.body, query:req.query});
});
app.use('/api', router);

app.listen(config.port);
console.log('Magic happens on port ' + config.port);

