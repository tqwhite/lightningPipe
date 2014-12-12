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
rm $testDestDir/"$district"CmdLine/$segment.txt;
#ls -la $testDestDir/HawleyMinus;

echo -e "\nExecute cloverleaf";



if [[ -z "$1" ]]; then



segment="Student_Enrolled"
echo "$district/schools/$school/segments/$segment\n"

$cloverleaf \
http://127.0.0.1:8000/uff/1.0/districts/$district/schools/$school/segments/$segment#Data?sendFlatSpecs=true \
$testDestDir/"$district"CmdLine/$segment.txt -ah

segment="Schedule"
echo "$district/schools/$school/segments/$segment\n"

$cloverleaf \
http://127.0.0.1:8000/uff/1.0/districts/$district/schools/$school/segments/$segment#Data?sendFlatSpecs=true \
$testDestDir/"$district"CmdLine/$segment.txt -ah

segment="Guardian"
echo "$district/schools/$school/segments/$segment\n"

$cloverleaf \
http://127.0.0.1:8000/uff/1.0/districts/$district/schools/$school/segments/$segment#Data?sendFlatSpecs=true \
$testDestDir/"$district"CmdLine/$segment.txt -ah

else


echo "$cloverleaf \
http://127.0.0.1:8000/uff/1.0/districts/$district/schools/$school/segments/$segment#Data?sendFlatSpecs=true \
$testDestDir/"$district"CmdLine/$segment.txt -ah\n"

$cloverleaf \
http://127.0.0.1:8000/uff/1.0/districts/$district/schools/$school/segments/$segment#Data?sendFlatSpecs=true \
$testDestDir/"$district"CmdLine/$segment.txt -ah


fi


echo -e "ls -la $testDestDir/AlbanyCmdLine;\n"
ls -la $testDestDir/AlbanyCmdLine;



echo -e "\nDone  ==============\n";