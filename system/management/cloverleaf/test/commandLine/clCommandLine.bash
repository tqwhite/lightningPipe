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

if [[ -z "$2" ]]; then
district="Albany"
else
district=$2
fi

if [[ -z "$3" ]]; then
school="030"
else
school=$3
fi

echo -e "\nclearing $district/$segment (for school $school)";
rm $testDestDir/$district/$segment.txt;
#ls -la $testDestDir/HawleyMinus;

echo -e "\nExecute cloverleaf";
echo "$cloverleaf \
http://127.0.0.1:8000/uff/1.0/districts/$district/schools/$school/segments/$segment#Data?sendFlatSpecs=true \
$testDestDir/$district/$segment.txt -ah\n"

$cloverleaf \
http://127.0.0.1:8000/uff/1.0/districts/$district/schools/$school/segments/$segment#Data?sendFlatSpecs=true \
$testDestDir/HawleyMinus/$segment.txt -ah


echo -e "\n"
ls -la $testDestDir/HawleyMinus;



echo -e "\nDone  ==============\n";