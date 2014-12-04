module.exports = {
			identity:{
				name:'JMC Student Plans First Implementation',
				password: 'PASSWORD'
			},
			dataSourceAvailable: { //turns into dataSource:, after api setup
				uff:
				{
					type: 'file',
					location: global.localEnvironment.get('dataFileDirectory') + '/jmcProdSandbox/',
					fileExtension: 'txt',
					definitionName: 'studentPlansInitial', //refers to a file in dataDefinitions
					schemaSourceNameMapping: {
						Course: '',
						User_Base: 'JMC_User_File',
						Section: '',
						Section_Staff: '',
						Section_Student: '',
						Student_Attendance: '',
						Student_Base: '',
						Student_Discipline: '',
						Student_Enrollment: '',
						Student_GPA: '',
						Student_Grades: ''
					},
					receivingSchema: 'expressbook'
				}
			},
			dataAccessAvailable: { //turns into dataAccess:, after api setup
				uff:
				{
					allowed: {
						//if property is not defined, that implies 'all', if ID is in both, disallowed prevails
						//if any are allowed, any not on list are NOT allowed
						//			districts:['blbany'],
						//			schools:['010', '099'],
						segments: []
					},
					disallowed: {
						districts: [],
						//	schools: ['030', '099'],
						//segments: ['Student_Grades_File']
					}
				//	,isAllowed: isAllowed
				}
			}
		};