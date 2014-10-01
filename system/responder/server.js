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

curl http://localhost:8081/uff/1.0/districts/albany/schools/010/segments/StudentBaseTest2
curl http://localhost:8081/uff/1.0/districts/albany/schools/099/segments
curl http://localhost:8081/uff/1.0/districts/albany/schools/099/segmentss
curl http://localhost:8081/uff/1.0/districts/albany/schools/099
curl http://localhost:8081/uff/1.0/districts/albany/schools
curl http://localhost:8081/uff/1.0/districts/albany
curl http://localhost:8081/uff/1.0/districts/


*/



// var bodyParser = require('body-parser');
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
// 	extended: true
// }));

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
global.localEnvironment.log.info({startup:"STARTING LightningPipe===================="});

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

var swapTestStatus = function(req) {

	if (typeof (req.query.test) != 'undefined') {
		global.localEnvironment.testServer = !global.localEnvironment.testServer;
	}
}

var apiDefinition = require("apiDefinition");
apiDefinition = new apiDefinition({
	name: "uff",
	version: '1.0'
});

var pruneOutput = function(req, result) {
	var outObj = result;
	if (req.query.sendFlatSpecs != 'true') {
		delete outObj.FlatSpecs;
	}
	return outObj;
}

var apiDetails = apiDefinition.getSpecs();

global.localEnvironment.updateBaseUri(apiDetails.name, apiDetails.version, config.port);

var outputGenerator = require("sender");

var model = require('hybridModel');


//START ROUTING FUNCTION =======================================================

router.get(new RegExp('/' + apiDetails.name + '/' + apiDetails.version + '/(.*)'), function(req, res, next) {
	//closure: client

	swapTestStatus(req);

	if (global.localEnvironment.testServer) {
		console.log('\n\nuriPath=' + req.params[0] + '\n'); 
	}
	

	var outputObj = new outputGenerator();
	var sender = outputObj.generateSender(res, req);

	var executionPackage={
		uriPath: req.params[0],
		clientProfile: client.profile(),
		apiDefinition: apiDefinition,
		parameters: req.query
	};
	
	global.localEnvironment.log.info({executionPackage:executionPackage})


	client.setApi(apiDefinition);

	var sessionModel = new model(executionPackage);



	sessionModel.on('gotData', function(result) {
		result.meta = qtools.mergeMetaData(result.meta);

		result.result = pruneOutput(req, result.result);
		sender('', result);

		swapTestStatus(req);
	});

	sessionModel.on('badData', function(result) {
		result.meta = qtools.mergeMetaData(result.meta);
		sender(result, '');
		swapTestStatus(req);
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














