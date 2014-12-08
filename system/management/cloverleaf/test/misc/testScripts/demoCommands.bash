$cloverleaf http://127.0.0.1:8000/uff/1.0/districts/Albany/schools/030/segments/Student_Enrolled#Data?sendFlatSpecs=true $clTestDestDir/HawleyMinus/Students.txt -ah

curl -i -H "username:mssql" -H "password:123" http://127.0.0.1:8000/uff/1.0/districts/HawleyMinus/schools/030/segments/Student_Enrolled