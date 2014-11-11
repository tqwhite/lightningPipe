#!/bin/sh


districtNames[0]='Albany';
districtNames[1]='Clinton-Graceville';
districtNames[2]='Hancock';
districtNames[3]='Morris';
districtNames[4]='Paynesville';
districtNames[5]='WCE';
districtNames[6]='Wheaton';


shopt -s extglob

cloverProd="node /home/lightningpipe/lpProd/services/system/cloverleaf/cloverleaf.js"
TARGETDIR="/home/lightningpipe/mountPoint/destDirProd"

echo -e "\n\n"`date` " Starting Run ============================";


for DISTRICTNAME in ${districtNames[*]}; do
	targetPath="$TARGETDIR/$DISTRICTNAME/";
	[ -d $targetPath ] && cd $targetPath && rm !(Staff.txt)
	echo -e `date` " Executing $DISTRICTNAME ($targetPath)";
	$cloverProd -fq ~/lpProd/services/system/management/cloverleaf/prod/jsAccess/districtAccessFiles/$DISTRICTNAME.js
done
        
        
echo -e `date` " Ending Run ============================\n\n";