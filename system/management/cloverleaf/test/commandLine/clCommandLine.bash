#!/bin/bash

# $cloverleaf \
# http://127.0.0.1:8000/uff/1.0/districts/HawleyMinus/schools/011/segments/Guardian#Data?sendFlatSpecs=true \
# $destDirProd/HawleyMinus/Guardians.txt -ah


# $cloverleaf \
# http://127.0.0.1:8000/uff/1.0/districts/HawleyMinus/schools/011/segments/Schedule#Data?sendFlatSpecs=true \
# $destDirProd/HawleyMinus/Schedules.txt -ah

echo -e "\nStart CURL  ==============";

if [[ -z "$1" ]]; then
segment="Student_Enrolled"
else
segment=$1
fi

echo -e "\nclearing HawleyMinus/$segment";
rm $testDestDir/HawleyMinus/$segment.txt;
#ls -la $testDestDir/HawleyMinus;

echo -e "\nExecute cloverleaf";
$cloverleaf \
http://127.0.0.1:8000/uff/1.0/districts/HawleyMinus/schools/030/segments/$segment#Data?sendFlatSpecs=true \
$testDestDir/HawleyMinus/$segment.txt -ah


echo -e "\n"
ls -la $testDestDir/HawleyMinus;



echo -e "\nDone  ==============\n";