#!/bin/bash

destDirProd=/Volumes/qubuntuFileServer/cmerdc/lightningPipe/testResults

$cloverleaf http://localhost:8081/uff/1.0/districts/Albany/schools/010/segments/Guardian#Data?sendFlatSpecs=true $destDirProd/Albany/Guardians.txt -ah
$cloverleaf http://localhost:8081/uff/1.0/districts/Albany/schools/010/segments/Schedule#Data?sendFlatSpecs=true $destDirProd/Albany/Schedules.txt -ah
$cloverleaf http://localhost:8081/uff/1.0/districts/Albany/schools/010/segments/Student_Enrolled#Data?sendFlatSpecs=true $destDirProd/Albany/Students.txt -ah
