#!/bin/bash

# $cloverleaf \
# http://127.0.0.1:8000/uff/1.0/districts/HawleyMinus/schools/011/segments/Guardian#Data?sendFlatSpecs=true \
# $destDirProd/HawleyMinus/Guardians.txt -ah


# $cloverleaf \
# http://127.0.0.1:8000/uff/1.0/districts/HawleyMinus/schools/011/segments/Schedule#Data?sendFlatSpecs=true \
# $destDirProd/HawleyMinus/Schedules.txt -ah

echo -e "\nStart CURL  ==============";

echo -e "\nclearing HawleyMinus/";
rm $testDestDir/HawleyMinus/*;
ls -la $testDestDir/HawleyMinus;

echo -e "\nxeecute cloverleaf";
$cloverleaf \
http://127.0.0.1:8000/uff/1.0/districts/HawleyMinus/schools/011/segments/Student_Enrolled#Data?sendFlatSpecs=true \
$testDestDir/HawleyMinus/Students.txt -ah


echo -e "\n"
ls -la $testDestDir/HawleyMinus;



echo -e "\nDone  ==============\n";