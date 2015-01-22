{
    "input": [
{"source":"http://127.0.0.1:8000/uff/1.0/districts/Albany/schools/010/segments/Guardian?sendFlatSpecs=true","destination":"Guardians.txt", "path":"Data", "switches":{"header":false, "append":true}},
{"source":"http://127.0.0.1:8000/uff/1.0/districts/Albany/schools/010/segments/Schedule?sendFlatSpecs=true","destination":"Schedules.txt", "path":"Data", "switches":{"header":false, "append":true}},
{"source":"http://127.0.0.1:8000/uff/1.0/districts/Albany/schools/010/segments/Student_Enrolled?sendFlatSpecs=true","destination":"Students.txt", "path":"Data", "switches":{"header":false, "append":true}},

{"source":"http://127.0.0.1:8000/uff/1.0/districts/Albany/schools/030/segments/Guardian?sendFlatSpecs=true","destination":"Guardians.txt", "path":"Data", "switches":{"header":false, "append":true}},
{"source":"http://127.0.0.1:8000/uff/1.0/districts/Albany/schools/030/segments/Schedule?sendFlatSpecs=true","destination":"Schedules.txt", "path":"Data", "switches":{"header":false, "append":true}},
{"source":"http://127.0.0.1:8000/uff/1.0/districts/Albany/schools/030/segments/Student_Enrolled?sendFlatSpecs=true","destination":"Students.txt", "path":"Data", "switches":{"header":false, "append":true}},

{"source":"http://127.0.0.1:8000/uff/1.0/districts/Albany/schools/035/segments/Guardian?sendFlatSpecs=true","destination":"Guardians.txt", "path":"Data", "switches":{"header":false, "append":true}},
{"source":"http://127.0.0.1:8000/uff/1.0/districts/Albany/schools/035/segments/Schedule?sendFlatSpecs=true","destination":"Schedules.txt", "path":"Data", "switches":{"header":false, "append":true}},
{"source":"http://127.0.0.1:8000/uff/1.0/districts/Albany/schools/035/segments/Student_Enrolled?sendFlatSpecs=true","destination":"Students.txt", "path":"Data", "switches":{"header":false, "append":true}},

{"source":"http://127.0.0.1:8000/uff/1.0/districts/Albany/schools/050/segments/Guardian?sendFlatSpecs=true","destination":"Guardians.txt", "path":"Data", "switches":{"header":false, "append":true}},
{"source":"http://127.0.0.1:8000/uff/1.0/districts/Albany/schools/050/segments/Schedule?sendFlatSpecs=true","destination":"Schedules.txt", "path":"Data", "switches":{"header":false, "append":true}},
{"source":"http://127.0.0.1:8000/uff/1.0/districts/Albany/schools/050/segments/Student_Enrolled?sendFlatSpecs=true","destination":"Students.txt", "path":"Data", "switches":{"header":false, "append":true}},

{"source":"http://127.0.0.1:8000/uff/1.0/districts/Albany/schools/060/segments/Guardian?sendFlatSpecs=true","destination":"Guardians.txt", "path":"Data", "switches":{"header":false, "append":true}},
{"source":"http://127.0.0.1:8000/uff/1.0/districts/Albany/schools/060/segments/Schedule?sendFlatSpecs=true","destination":"Schedules.txt", "path":"Data", "switches":{"header":false, "append":true}},
{"source":"http://127.0.0.1:8000/uff/1.0/districts/Albany/schools/060/segments/Student_Enrolled?sendFlatSpecs=true","destination":"Students.txt", "path":"Data", "switches":{"header":false, "append":true}},

{"source":"http://127.0.0.1:8000/uff/1.0/districts/Albany/schools/099/segments/Guardian?sendFlatSpecs=true","destination":"Guardians.txt", "path":"Data", "switches":{"header":false, "append":true}},
{"source":"http://127.0.0.1:8000/uff/1.0/districts/Albany/schools/099/segments/Schedule?sendFlatSpecs=true","destination":"Schedules.txt", "path":"Data", "switches":{"header":false, "append":true}},
{"source":"http://127.0.0.1:8000/uff/1.0/districts/Albany/schools/099/segments/Student_Enrolled?sendFlatSpecs=true","destination":"Students.txt", "path":"Data", "switches":{"header":false, "append":true}}
],

    "transform": [
    {
        "type": "passThrough"
    }
    ],

    "output": {
        "type": "file",
        "context": {
            "parentPath": "/Users/tqwhite/testLinkpoint/testDataDest/AlbanyJsonTest/"
        },
        "control": {
            "append": "false",
            "header": "false"
        }
    }
}
