"use strict";
var qtools = require('qtools');
qtools = new qtools(module);


var config = require('./config/targetServer.js');
config = new config();
var displayConfig = qtools.clone(config.loginInfo());
displayConfig.password = '****';

/*

node ebControl.js --markScale --verbose dataFiles/eb/objectiveSetup/markScales.eb
node ebControl.js --markScale --verbose --forReal dataFiles/eb/objectiveSetup/markScales.eb

node ebControl.js --specialty --verbose dataFiles/eb/attributeSetup/specialties.eb
node ebControl.js --specialty --verbose --forReal dataFiles/eb/attributeSetup/specialties.eb

node ebControl.js --objective --verbose --forReal dataFiles/uff/objectiveSetup/objectives.eb
node ebControl.js --assignGradeLevel --verbose --forReal dataFiles/uff/objectiveSetup/gradeLevelAssignments.eb
node ebControl.js --assignTerm --verbose --forReal dataFiles/uff/objectiveSetup/termAssignments.eb
node ebControl.js --assignSpecialty --verbose --forReal dataFiles/uff/objectiveSetup/specialtyAssignments.eb


EB SEQUENCE
node ebControl.js --assignTeacher --verbose dataFiles/eb/peopleSetup/assignTeacher.eb

node ebControl.js --school --forReal  --verbose dataFiles/eb/schoolSetup/school.eb
node ebControl.js --gradeLevel --forReal  --verbose dataFiles/eb/schoolSetup/gradeLevel.eb
node ebControl.js --gradeLevelSchool --forReal  --verbose dataFiles/eb/schoolSetup/gradeLevelSchool.eb
node ebControl.js --term --forReal  --verbose -- dataFiles/eb/schoolSetup/term.eb
node ebControl.js --termSchool --forReal  --verbose -- dataFiles/eb/schoolSetup/termSchool.eb
node ebControl.js --schoolSetCurrentTerm --forReal  --verbose -- dataFiles/eb/schoolSetup/school.eb

node ebControl.js --student --forReal  --verbose -- dataFiles/eb/peopleSetup/student.eb
node ebControl.js --teacher --forReal  --verbose -- dataFiles/eb/peopleSetup/teacher.eb


node ebControl.js --homeroom --forReal  --verbose -- dataFiles/eb/peopleSetup/homeroom.eb
node ebControl.js --assignStudent --forReal  --verbose dataFiles/eb/peopleSetup/assignStudent.eb
 
 
node ebControl.js --objective --verbose --forReal dataFiles/eb/objectiveSetup/objectives.eb
node ebControl.js --assignGradeLevel --verbose --forReal dataFiles/eb/objectiveSetup/gradeLevelAssignments.eb
node ebControl.js --assignTerm --verbose --forReal dataFiles/eb/objectiveSetup/termAssignments.eb
node ebControl.js --assignSpecialty --verbose --forReal dataFiles/eb/objectiveSetup/specialtyAssignments.eb

node ebControl.js --assignTeacher --forReal  --verbose dataFiles/eb/peopleSetup/assignTeacher.eb


UFF SEQUENCE
node ebControl.js --school --forReal  --verbose dataFiles/uff/schoolSetup/school.uff
node ebControl.js --term --forReal  --verbose dataFiles/uff/schoolSetup/term.uff
node ebControl.js --schoolSetCurrentTerm --forReal  --verbose -- dataFiles/uff/schoolSetup/schoolSetCurrentTerm.uff
node ebControl.js --gradeLevel --forReal  --verbose dataFiles/uff/schoolSetup/gradeLevel.uff

node ebControl.js --student --forReal  --verbose dataFiles/uff/peopleSetup/student.uff
node ebControl.js --teacher --forReal  --verbose -- dataFiles/uff/peopleSetup/teacher.uff


node ebControl.js --homeroom --forReal  --verbose -- dataFiles/uff/peopleSetup/homeroom.uff
node ebControl.js --assignStudent --forReal  --verbose dataFiles/uff/assignStudent.uff

node ebControl.js --assignTeacher --forReal  --verbose dataFiles/uff/assignTeacher.uff


*/

var commandFlags = require('commander');
commandFlags.version('tqTest')
	.option('-y, --markScale', 'upload markScale')
	.option('-y, --specialty', 'upload specialties')
	.option('-y, --objective', 'upload objectives')
	.option('-y, --assignGradeLevel', 'upload assignGradeLevel')
	.option('-y, --assignTerm', 'upload assignGradeLevel')
	.option('-y, --assignSpecialty', 'upload assignSpecialty')

	.option('-y, --school', 'upload schools')
	.option('-y, --gradeLevel', 'upload grade levels')
	.option('-y, --gradeLevelSchool', 'upload gradeLevelSchool')
	.option('-y, --term', 'upload terms')
	.option('-y, --termSchool', 'upload termSchool')
	.option('-y, --schoolSetCurrentTerm', 'upload schoolSetCurrentTerm')

	.option('-y, --student', 'upload students')
	.option('-y, --teacher', 'upload teachers')

	.option('-y, --homeroom', 'create a new homeroom for later student attaching')

	.option('-y, --assignStudent', 'attach students to rosmats')
	.option('-y, --assignTeacher', 'attach teachers to rosmats')

//	.option('-f, --skipFirstLine', 'UNUSED, system now detects if first line matches dictionary schema')
	.option('-R, --forReal', 'for [R]eal')
	.option('-j, --dumpJson', 'dump json')
	.option('-v, --verbose', 'Verbose')
	.option('-v, --pingOnly', 'Verbose')
	.option('-q, --quiet', 'Quiet, no messages')
	.parse(process.argv);


var targetServerAccess = require('./expressbook/targetServer.js'),
	targetServerAccess = new targetServerAccess.targetServerAccess();


var fileName = process.argv[process.argv.length - 1], //"coreOrig.txt"
	fileType = fileName.match(/\.(\w*)$/)[1],
	sourceData;

switch (fileType) {
	case 'eb':
		var dictionaryName = 'ebDefinition'
		break;
	case 'uff':
		var dictionaryName = 'uffDefinition'
		break;
}


var dataSource = {
	textToJson: require('textToJson'), //this doesn't get used until passed to the commandLIneResponder
	dictionary: require('dictionary')
};

dataSource.dictionary = new dataSource.dictionary({
	dataDefinition: require("./dataDefinitions/" + dictionaryName + ".js"),
	target: 'expressbook'
});

if (commandFlags.school) {
	var controlObj = {
		apiEndpoint: '/data/API/1/School',
		outboundFinalObjectName: 'SchoolInfo',
		definitionName: 'school'
	};
} else if (commandFlags.gradeLevel) {
	var controlObj = {
		apiEndpoint: '/data/API/1/School/Grade',
		outboundFinalObjectName: 'Grades',
		definitionName: 'gradeLevel'
	};
} else if (commandFlags.gradeLevelSchool) {
	var controlObj = {
		apiEndpoint: '/data/API/1/School/Grade',
		outboundFinalObjectName: 'Grades',
		definitionName: 'gradeLevelSchool'
	};
} else if (commandFlags.term) {
	var controlObj = {
		apiEndpoint: '/data/API/1/School/Termm',
		outboundFinalObjectName: 'Terms',
		definitionName: 'term'
	};
} else if (commandFlags.termSchool) {
	var controlObj = {
		apiEndpoint: '/data/API/1/School/Termm',
		outboundFinalObjectName: 'Terms',
		definitionName: 'termSchool'
	};
} else if (commandFlags.schoolSetCurrentTerm) {
	var controlObj = {
		apiEndpoint: '/data/API/1/School',
		outboundFinalObjectName: 'SchoolInfo',
		definitionName: 'schoolSetCurrentTerm'
	};
} else if (commandFlags.teacher) {
	var controlObj = {
		apiEndpoint: '/data/API/1/Teacher',
		outboundFinalObjectName: 'UserInfo',
		definitionName: 'teacher'
	};

} else if (commandFlags.student) {
	var controlObj = {
		apiEndpoint: '/data/API/1/Student',
		outboundFinalObjectName: 'StudentPersonal',
		definitionName: 'student'
	};
} else if (commandFlags.homeroom) {
	var controlObj = {
		apiEndpoint: '/data/API/1/Gradebook/Homeroom',
		outboundFinalObjectName: 'Homerooms',
		definitionName: 'homeroom'
	};
} else if (commandFlags.assignTeacher) {
	var controlObj = {
		apiEndpoint: '/data/API/1/Teacher/AssignTeachers',
		outboundFinalObjectName: 'assignmentPairs',
		definitionName: 'assignTeacher'
	};


} else if (commandFlags.assignStudent) {
	var controlObj = {
		apiEndpoint: '/data/API/1/Student/AssignStudents',
		outboundFinalObjectName: 'assignmentPairs',
		definitionName: 'assignStudent'
	};
} else if (commandFlags.studentAssignment_Nested_ROSMATVERSIONWORKS) {
	var controlObj = {
		apiEndpoint: '/data/Rosmat/attachStudents1',
		outboundFinalObjectName: 'assignmentPairs',
		definitionName: 'DSDFDSFSDFSDFDF'
	};

} else if (commandFlags.objective) {
	var controlObj = {
		apiEndpoint: '/data/API/1/Objective',
		outboundFinalObjectName: 'Objectives',
		definitionName: 'objective'
	};
} else if (commandFlags.assignGradeLevel) {
	var controlObj = {
		apiEndpoint: '/data/API/1/Objective/AssignGradeLevel',
		outboundFinalObjectName: 'GradeLevelAssignments',
		definitionName: 'assignGradeLevel'
	};
} else if (commandFlags.assignTerm) {
	var controlObj = {
		apiEndpoint: '/data/API/1/Objective/AssignTerm',
		outboundFinalObjectName: 'TermAssignments',
		definitionName: 'assignTerm'
	};
} else if (commandFlags.assignSpecialty) {
	var controlObj = {
		apiEndpoint: '/data/API/1/Objective/AssignSpecialty',
		outboundFinalObjectName: 'SpecialtyAssignments',
		definitionName: 'assignSpecialty'
	};
} else if (commandFlags.specialty) {
	var controlObj = {
		apiEndpoint: '/data/API/1/Attribute/Specialtyy',
		outboundFinalObjectName: 'Specialties',
		definitionName: 'specialty'
	};
} else if (commandFlags.markScale) {
	var controlObj = {
		apiEndpoint: '/data/API/1/Objective/MarkScale',
		outboundFinalObjectName: 'MarkScales',
		definitionName: 'markScale'
	};
} else {
	console.log('\n\n=== you need to choose something to upload ===');
	commandFlags.outputHelp();
	process.exit(1);
}

if (!commandFlags.quiet) {
	console.log("executing " + controlObj.definitionName);
}
if (commandFlags.verbose) {

	controlObj.config = displayConfig;
	console.log('fileName='+fileName+'\n');
	qtools.dump({
		'\n\n===== controlObj =====\n': controlObj
	});
	console.log('\n\attempting login');
}

var sourceData = new dataSource.textToJson(fileName, dataSource.dictionary.get(controlObj.definitionName)),
	responder = require("./expressbook/commandLineResponder.js");

responder = new responder(sourceData, targetServerAccess, controlObj, commandFlags, config)






