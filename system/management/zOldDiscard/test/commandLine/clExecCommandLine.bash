#!/bin/bash

# $cloverleaf \
# http://127.0.0.1:8000/uff/1.0/districts/HawleyMinus/schools/011/segments/Guardian#Data?sendFlatSpecs=true \
# $destDirProd/HawleyMinus/Guardians.txt -ah


# $cloverleaf \
# http://127.0.0.1:8000/uff/1.0/districts/HawleyMinus/schools/011/segments/Schedule#Data?sendFlatSpecs=true \
# $destDirProd/HawleyMinus/Schedules.txt -ah

pushd ~ > /dev/null

if [ $segment=="" ]; then
segment="Student_Base"
fi

echo -e "\nclearing HawleyMinus/$segment.txt\n";
rm $clTestDestDir/HawleyMinus/$segment.txt;

echo -e "\nexecute cloverleaf";
$cloverleaf \
http://127.0.0.1:8000/uff/1.0/districts/HawleyMinus/schools/030/segments/$segment#Data?sendFlatSpecs=true \
$clTestDestDir/HawleyMinus/$segment.txt -ah
echo '---';

popd  > /dev/null