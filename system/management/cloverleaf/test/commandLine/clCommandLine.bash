#!/bin/bash

# $cloverleaf \
# http://127.0.0.1:8000/uff/1.0/districts/HawleyMinus/schools/011/segments/Guardian#Data?sendFlatSpecs=true \
# $destDirProd/HawleyMinus/Guardians.txt -ah


# $cloverleaf \
# http://127.0.0.1:8000/uff/1.0/districts/HawleyMinus/schools/011/segments/Schedule#Data?sendFlatSpecs=true \
# $destDirProd/HawleyMinus/Schedules.txt -ah

if [[ -z "$1" ]]; then
segment="Student_Enrolled"
else
segment=$1
fi

if [[ -z "$2" ]]; then
school="030"
else
school=$2
fi

if [[ -z "$3" ]]; then
district="Albany"
else
district=$3
fi


if [[ -z "$1" ]]; then

echo -e "\nUsage:\n\
clcmdtest segmentName schoolName districtName\n\
default: cltest StudentEnrolled 030 Albany\n\
"

else

echo -e "\nStart Cloverleaf run  ==============";


echo -e "\nclearing $district/$segment (for school $school)";
rm $clTestDestDir/"$district"CmdLine/$segment.txt;
#ls -la $clTestDestDir/HawleyMinus;

segment="Student_Enrolled"
echo -e "\ncloverleaf $district/schools/$school/segments/$segment\n"

$cloverleaf \
http://127.0.0.1:8000/uff/1.0/districts/$district/schools/$school/segments/$segment#Data?sendFlatSpecs=true \
$clTestDestDir/"$district"CmdLine/$segment.txt -ah

segment="Schedule"
echo -e "\ncloverleaf $district/schools/$school/segments/$segment\n"

$cloverleaf \
http://127.0.0.1:8000/uff/1.0/districts/$district/schools/$school/segments/$segment#Data?sendFlatSpecs=true \
$clTestDestDir/"$district"CmdLine/$segment.txt -ah

segment="Guardian"
echo -e "\ncloverleaf $district/schools/$school/segments/$segment\n"

$cloverleaf \
http://127.0.0.1:8000/uff/1.0/districts/$district/schools/$school/segments/$segment#Data?sendFlatSpecs=true \
$clTestDestDir/"$district"CmdLine/$segment.txt -ah

echo -e "\nls -la $clTestDestDir/AlbanyCmdLine;\n"
ls -la $clTestDestDir/AlbanyCmdLine;

echo -e "\nDone  ==============\n";

fi



