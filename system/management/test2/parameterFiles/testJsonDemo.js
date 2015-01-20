{
    "input": [{
            "source": "http://127.0.0.1:8000/uff/1.0/districts/Albany/schools/010/segments/Guardian?sendFlatSpecs=true",
            "destination": "Guardians.txt",
            "path": "Data",
            "switches": {
                "header": false
            }
        },

        {
            "source": "http://127.0.0.1:8000/uff/1.0/districts/Albany/schools/010/segments/Guardian?sendFlatSpecs=true",
            "destination": "Guardians2.txt",
            "path": "Data",
            "switches": {
                "header": false
            }
        }
    ],

    "process": {
        "type": "passThrough"
    },

    "output": {
        "type": "file",
        "context": {
            "parentPath": "/Users/tqwhite/testLinkpoint/testDataDest/AlbanyJsonTest/"
        },
        "control": {
            "append": "true",
            "header": "false"
        }
    }
}
