{
    "input": [  
    {"source":"http://127.0.0.1:8000/uff/1.0/districts/Albany/schools/010/segments/Address_Contact?sendFlatSpecs=true","destination":"Address_Contact", "path":"Data.Address_Contact", "switches":{"header":false, "append":true}},

    {"source":"http://127.0.0.1:8000/uff/1.0/districts/Albany/schools/010/segments/Course?sendFlatSpecs=true","destination":"Course", "path":"Data.Course", "switches":{"header":false, "append":true}},

    {"source":"http://127.0.0.1:8000/uff/1.0/districts/Albany/schools/010/segments/Section_Staff?sendFlatSpecs=true","destination":"Section_Staff", "path":"Data.Section_Staff", "switches":{"header":false, "append":true}},

    {"source":"http://127.0.0.1:8000/uff/1.0/districts/Albany/schools/010/segments/Section_Student?sendFlatSpecs=true","destination":"Section_Student", "path":"Data.Section_Student", "switches":{"header":false, "append":true}},

    {"source":"http://127.0.0.1:8000/uff/1.0/districts/Albany/schools/010/segments/Section?sendFlatSpecs=true","destination":"Section", "path":"Data.Section", "switches":{"header":false, "append":true}},

    {"source":"http://127.0.0.1:8000/uff/1.0/districts/Albany/schools/010/segments/Student_Base?sendFlatSpecs=true","destination":"Student_Base", "path":"Data.Student_Base", "switches":{"header":false, "append":true}},

    {"source":"http://127.0.0.1:8000/uff/1.0/districts/Albany/schools/010/segments/Student_Enrollment?sendFlatSpecs=true","destination":"Student_Enrollment", "path":"Data.Student_Enrollment", "switches":{"header":false, "append":true}},

    {"source":"http://127.0.0.1:8000/uff/1.0/districts/Albany/schools/010/segments/JMC_User?sendFlatSpecs=true","destination":"JMC_User", "path":"Data.JMC_User", "switches":{"header":false, "append":true}}

],

    "transform": [
    {
        
        "type":"sqlizer2",
		"parameters":{
		"input":[
			{"name":"Address_Contact"},
			{"name":"Course"},
			{"name":"Section_Staff"},
			{"name":"Section_Student"},
			{"name":"Section"},
			{"name":"Student_Base"},
			{"name":"Student_Enrollment"},
			{"name":"JMC_User"}
		],
		"process":[
			{"query":"create table NewCourses as select  c.courseAbbreviation || '_' || ss.lastName as fullName, c.courseAbbreviation as shortName, c.courseNumber || '_' || ss.staffUniqueIdentifier as personId, c.courseDesc as summary, '' as template, c.schoolCode as categoryPath, c.schoolCode as categoryId, c.schoolCode as categoryName, c.schoolCode as categoryDescription    from Course as c left join Section as s on s.courseNumber=c.courseNumber left join Section_Staff as ss on ss.sectionNumber=s.sectionNumber"},
			{"query":"create table Enrollments as select  c.courseNumber || '_' || ss.staffUniqueIdentifier as personId, ss.staffUniqueIdentifier as userId, 'editingTeacher' as role, s.sectionNumber || '_' || s.beginningPeriodNumber as 'classGroup'   from Course as c left join Section_Staff as ss on ss.courseNumber=c.courseNumber left join Section as s on s.sectionNumber=ss.sectionNumber"},
			{"query":"insert into Enrollments select  c.courseNumber || '_' || ss.staffUniqueIdentifier as idNumber, sst.studentUniqueIdentifier as userId, 'student' as role, s.sectionNumber || '_' || s.beginningPeriodNumber as 'classGroup'   from Course as c left join Section_Staff as ss on ss.courseNumber=c.courseNumber left join Section as s on s.sectionNumber=ss.sectionNumber left join Section_Student as sst on sst.sectionNumber=s.sectionNumber"},
			{"query":"create table Users as select  j.staffUniqueIdentifier as personId, j.staffUniqueIdentifier as userName, 'Te$tUs3r' as password, j.firstName as firstName, j.lastName as lastName, j.lastName || '_' || j.firstName || '@emailaddress.edu' as email,  j.schoolCode as schoolCode, 'STAFF' as department  from JMC_User as j  where trim(j.firstName) <> '' and trim(j.lastName) <> '' and trim(j.schoolCode) <> '' and trim(j.districtCode) <> '' and trim(j.staffUniqueIdentifier) <> ''"},
			{"query":"insert into Users select   sb.studentUniqueIdentifier as personId, sb.lastName || '_' || sb.firstName || '_' || substr(sb.studentUniqueIdentifier, 0, 4), sb.lastName as password, sb.firstName as firstName, sb.lastName as lastName, sb.lastName || '_' || sb.firstName || '@emailadr.edu' as email, ac.city as city, ac.address1 as street, ac.contactPhone1 as phone1, ac.contactPhone2 as phone2, sb.gradeLevelLevel as grade, sb.graduationYear as gradYear, sb.schoolCode as schoolCode, 'STUDENT' as department   from Student_Base as sb left join Address_Contact as ac on ac.studentUniqueIdentifier=sb.studentUniqueIdentifier"}
		],
		"export":[
			{"tableName":"NewCourses", "as":"NewCourses.txt"},
			{"tableName":"Enrollments", "as":"Enrollments.txt"},
			{"tableName":"Users", "as":"Users.txt"}
		]
		}

    
    }
    ],

    "output": {
    
    
        "type": "mysql",
        "context": {
            "parentPath": "/Users/tqwhite/testLinkpoint/testDataDest/AlbanyJsonTest/",
            "authParms":{
				"host":"qubuntu.local",
				"port":"3306",
				"user":"cloverleafTest",
				"password":"123123",
				"database":"cloverleafTest"
			}


        },
        
		 "control":{
			"overwrite":[{"tableName":"NewCourses"}, {"tableName":"Enrollments"}],
			"overwrite":"all"
		 }

    
    
        "type": "file",
        "context": {
            "parentPath": "/Users/tqwhite/testLinkpoint/testDataDest/AlbanyJsonTest/",
            "authParms":{
				"host":"qubuntu.local",
				"port":"3306",
				"user":"cloverleafTest",
				"password":"123123",
				"database":"cloverleafTest"
			}


        },
        
        "control": {
            "append": "false",
            "header": "true"
        }
    }
}
