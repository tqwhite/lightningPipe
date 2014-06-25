"use strict";
var qtools = require('qtools');
qtools = new qtools(module);


var config = require('./config/targetServer.js');
config = new config();
var displayConfig = qtools.clone(config.loginInfo());
displayConfig.password = '****';

/*

node ebControl.js --markScale --verbose dataSource/dataFiles/eb/objectiveSetup/markScales.eb
node ebControl.js --markScale --verbose --forReal dataSource/dataFiles/eb/objectiveSetup/markScales.eb

node ebControl.js --specialty --verbose dataSource/dataFiles/eb/attributeSetup/specialties.eb
node ebControl.js --specialty --verbose --forReal dataSource/dataFiles/eb/attributeSetup/specialties.eb

node ebControl.js --objective --verbose --forReal dataSource/dataFiles/uff/objectiveSetup/objectives.eb
node ebControl.js --assignGradeLevel --verbose --forReal dataSource/dataFiles/uff/objectiveSetup/gradeLevelAssignments.eb
node ebControl.js --assignTerm --verbose --forReal dataSource/dataFiles/uff/objectiveSetup/termAssignments.eb
node ebControl.js --assignSpecialty --verbose --forReal dataSource/dataFiles/uff/objectiveSetup/specialtyAssignments.eb


EB SEQUENCE
node ebControl.js --assignTeacher --verbose dataSource/dataFiles/eb/peopleSetup/assignTeacher.eb

node ebControl.js --school --forReal  --verbose dataSource/dataFiles/eb/schoolSetup/school.eb
node ebControl.js --gradeLevel --forReal  --verbose dataSource/dataFiles/eb/schoolSetup/gradeLevel.eb
node ebControl.js --gradeLevelSchool --forReal  --verbose dataSource/dataFiles/eb/schoolSetup/gradeLevelSchool.eb
node ebControl.js --term --forReal  --verbose -- dataSource/dataFiles/eb/schoolSetup/term.eb
node ebControl.js --termSchool --forReal  --verbose -- dataSource/dataFiles/eb/schoolSetup/termSchool.eb
node ebControl.js --schoolSetCurrentTerm --forReal  --verbose -- dataSource/dataFiles/eb/schoolSetup/school.eb

node ebControl.js --student --forReal  --verbose -- dataSource/dataFiles/eb/peopleSetup/student.eb
node ebControl.js --teacher --forReal  --verbose -- dataSource/dataFiles/eb/peopleSetup/teacher.eb


node ebControl.js --homeroom --skipFirstLine --forReal  --verbose -- dataSource/dataFiles/eb/peopleSetup/homeroom.eb
node ebControl.js --assignStudent --forReal  --verbose dataSource/dataFiles/eb/peopleSetup/assignStudent.eb
 
 
node ebControl.js --objective --verbose --forReal dataSource/dataFiles/eb/objectiveSetup/objectives.eb
node ebControl.js --assignGradeLevel --verbose --forReal dataSource/dataFiles/eb/objectiveSetup/gradeLevelAssignments.eb
node ebControl.js --assignTerm --verbose --forReal dataSource/dataFiles/eb/objectiveSetup/termAssignments.eb
node ebControl.js --assignSpecialty --verbose --forReal dataSource/dataFiles/eb/objectiveSetup/specialtyAssignments.eb

node ebControl.js --assignTeacher --forReal  --verbose dataSource/dataFiles/eb/peopleSetup/assignTeacher.eb


UFF SEQUENCE
node ebControl.js --school --skipFirstLine --forReal  --verbose dataSource/dataFiles/uff/schoolSetup/school.uff
node ebControl.js --term --skipFirstLine --forReal  --verbose dataSource/dataFiles/uff/schoolSetup/term.uff
node ebControl.js --schoolSetCurrentTerm --forReal  --verbose -- dataSource/dataFiles/uff/schoolSetup/schoolSetCurrentTerm.uff
node ebControl.js --gradeLevel --skipFirstLine --forReal  --verbose dataSource/dataFiles/uff/schoolSetup/gradeLevel.uff

node ebControl.js --student --skipFirstLine --forReal  --verbose dataSource/dataFiles/uff/peopleSetup/student.uff
node ebControl.js --teacher --skipFirstLine --forReal  --verbose -- dataSource/dataFiles/uff/peopleSetup/teacher.uff


node ebControl.js --homeroom --skipFirstLine --forReal  --verbose -- dataSource/dataFiles/uff/peopleSetup/homeroom.uff
node ebControl.js --assignStudent --skipFirstLine --forReal  --verbose dataSource/dataFiles/uff/assignStudent.uff

node ebControl.js --assignTeacher --skipFirstLine --forReal  --verbose dataSource/dataFiles/uff/assignTeacher.uff


*/

var program = require('commander');
program.version('tqTest')
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

	.option('-f, --skipFirstLine', 'Skip first line if header definitions are there for a schema that does not use it')
	.option('-R, --forReal', 'for [R]eal')
	.option('-j, --dumpJson', 'dump json')
	.option('-v, --verbose', 'Verbose')
	.option('-v, --pingOnly', 'Verbose')
	.option('-q, --quiet', 'Quiet, no messages')
	.parse(process.argv);

var dataSource = require('./dataSource/dataSource.js');

var targetServerAccess = dataSource.targetServerAccess;
dataSource.targetServerAccess = new targetServerAccess();qtools.message('fix this (targetServerAccess)');

var fileName = process.argv[process.argv.length - 1], //"coreOrig.txt"
	fileType = fileName.match(/\.(\w*)$/)[1],
	finishedOutputObject,
	sourceData;

switch (fileType) {
	case 'eb':
		var dictionaryName = 'ebDefinition'
		break;
	case 'uff':
		var dictionaryName = 'uffDefinition'
		break;
}

dataSource.dictionary = new dataSource.dictionary({
	dataDefinition: require("./dataSource/dataDefinitions/" + dictionaryName + ".js"),
	target: 'expressbook',
	skipFirstLine: program.skipFirstLine
});

if (program.school) {
	var controlObj = {
		accessModelMethodName: 'saveCompletedObject',
		apiEndpoint: '/data/API/1/School',
		endPointWrapperName: 'SchoolInfo',
		definitionName: 'school',
		fileName: fileName
	};
} else if (program.gradeLevel) {
	var controlObj = {
		accessModelMethodName: 'saveCompletedObject',
		apiEndpoint: '/data/API/1/School/Grade',
		endPointWrapperName: 'Grades',
		definitionName: 'gradeLevel',
		fileName: fileName
	};
} else if (program.gradeLevelSchool) {
	var controlObj = {
		accessModelMethodName: 'saveCompletedObject',
		apiEndpoint: '/data/API/1/School/Grade',
		endPointWrapperName: 'Grades',
		definitionName: 'gradeLevelSchool',
		fileName: fileName
	};
} else if (program.term) {
	var controlObj = {
		accessModelMethodName: 'saveCompletedObject',
		apiEndpoint: '/data/API/1/School/Termm',
		endPointWrapperName: 'Terms',
		definitionName: 'term',
		fileName: fileName
	};
} else if (program.termSchool) {
	var controlObj = {
		accessModelMethodName: 'saveCompletedObject',
		apiEndpoint: '/data/API/1/School/Termm',
		endPointWrapperName: 'Terms',
		definitionName: 'termSchool',
		fileName: fileName
	};
} else if (program.schoolSetCurrentTerm) {
	var controlObj = {
		accessModelMethodName: 'saveCompletedObject',
		apiEndpoint: '/data/API/1/School',
		endPointWrapperName: 'SchoolInfo',
		definitionName: 'schoolSetCurrentTerm',
		fileName: fileName
	};
} else if (program.teacher) {
	var controlObj = {
		accessModelMethodName: 'saveCompletedObject',
		apiEndpoint: '/data/API/1/Teacher',
		endPointWrapperName: 'UserInfo',
		definitionName: 'teacher',
		fileName: fileName
	};

} else if (program.student) {
	var controlObj = {
		accessModelMethodName: 'saveCompletedObject',
		apiEndpoint: '/data/API/1/Student',
		endPointWrapperName: 'StudentPersonal',
		definitionName: 'student',
		fileName: fileName
	};
} else if (program.homeroom) {
	var controlObj = {
		accessModelMethodName: 'saveCompletedObject',
		apiEndpoint: '/data/API/1/Gradebook/Homeroom',
		endPointWrapperName: 'Homerooms',
		definitionName: 'homeroom',
		fileName: fileName
	};
} else if (program.assignTeacher) {
	var controlObj = {
		accessModelMethodName: 'saveCompletedObject',
		apiEndpoint: '/data/API/1/Teacher/AssignTeachers',
		endPointWrapperName: 'assignmentPairs',
		definitionName: 'assignTeacher',
		fileName: fileName
	};


} else if (program.assignStudent) {
	var controlObj = {
		accessModelMethodName: 'saveCompletedObject',
		apiEndpoint: '/data/API/1/Student/AssignStudents',
		endPointWrapperName: 'assignmentPairs',
		definitionName: 'assignStudent',
		fileName: fileName
	};
} else if (program.studentAssignment_Nested_ROSMATVERSIONWORKS) {
	var controlObj = {
		accessModelMethodName: 'saveCompletedObject',
		apiEndpoint: '/data/Rosmat/attachStudents1',
		endPointWrapperName: 'assignmentPairs',
		definitionName: 'DSDFDSFSDFSDFDF',
		fileName: fileName
	};

} else if (program.objective) {
	var controlObj = {
		accessModelMethodName: 'saveCompletedObject',
		apiEndpoint: '/data/API/1/Objective',
		endPointWrapperName: 'Objectives',
		definitionName: 'objective',
		fileName: fileName
	};
} else if (program.assignGradeLevel) {
	var controlObj = {
		accessModelMethodName: 'saveCompletedObject',
		apiEndpoint: '/data/API/1/Objective/AssignGradeLevel',
		endPointWrapperName: 'GradeLevelAssignments',
		definitionName: 'assignGradeLevel',
		fileName: fileName
	};
} else if (program.assignTerm) {
	var controlObj = {
		accessModelMethodName: 'saveCompletedObject',
		apiEndpoint: '/data/API/1/Objective/AssignTerm',
		endPointWrapperName: 'TermAssignments',
		definitionName: 'assignTerm',
		fileName: fileName
	};
} else if (program.assignSpecialty) {
	var controlObj = {
		accessModelMethodName: 'saveCompletedObject',
		apiEndpoint: '/data/API/1/Objective/AssignSpecialty',
		endPointWrapperName: 'SpecialtyAssignments',
		definitionName: 'assignSpecialty',
		fileName: fileName
	};
} else if (program.specialty) {
	var controlObj = {
		accessModelMethodName: 'saveCompletedObject',
		apiEndpoint: '/data/API/1/Attribute/Specialtyy',
		endPointWrapperName: 'Specialties',
		definitionName: 'specialty',
		fileName: fileName
	};
} else if (program.markScale) {
	var controlObj = {
		accessModelMethodName: 'saveCompletedObject',
		apiEndpoint: '/data/API/1/Objective/MarkScale',
		endPointWrapperName: 'MarkScales',
		definitionName: 'markScale',
		fileName: fileName
	};
} else {
	console.log('\n\n=== you need to choose something to upload ===');
	program.outputHelp();
	process.exit(1);
}

if (!program.quiet) {
	console.log("executing " + controlObj.definitionName);
}
if (program.verbose) {

	controlObj.config = displayConfig;

	qtools.dump({
		'\n\n===== controlObj =====\n': controlObj
	});
	console.log('\n\attempting login');
}



var responder=require("./dataSource/commandLineResponder.js");

responder=new responder(dataSource, controlObj, program, config, fileName)





