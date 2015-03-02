{
    "input": [  


{"source":"http://127.0.0.1:8000/uff/1.0/districts/Albany/schools/010/segments/Guardian?sendFlatSpecs=true","destination":"Guardians", "path":"Data"}

],

    "transform": [],

    "output": {
        "type": "file",
        "context": {
            "parentPath": "/Users/tqwhite/testLinkpoint/testDataDest/zztqPlans_Albany/",
            "header":false,
            "fileExtension":".txt",
            
            "databaseName":"zztqPlans_Albany",
			"authParmsFile":"qubuntuMysqlAuth.json"
        },
        
		 "control":{
			"overwriteReminderSelective":[{"tableName":"NewCourses"}, {"tableName":"Enrollments"}],
			"overwriteReminderDoNone":[],
			"overwrite":[]
		 }
    }
}
