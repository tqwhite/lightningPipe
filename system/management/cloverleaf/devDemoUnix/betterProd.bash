#!/bin/sh

districtNames[0]='Albany';
districtNames[1]='Clinton-Graceville';
districtNames[2]='Hancock';
districtNames[3]='Morris';
districtNames[4]='Paynesville';
districtNames[5]='WCE';
districtNames[6]='Wheaton';



districtNumbers[0]='0745';
districtNumbers[1]='Clinton-Graceville';
districtNumbers[2]='Hancock';
districtNumbers[3]='Morris';
districtNumbers[4]='Paynesville';
districtNumbers[5]='WCE';
districtNumbers[6]='Wheaton';


        for DISTRICTNAME in ${districtNames[*]}; do

[ -d $targetPath ] && cd $targetPath && rm !(Staff.txt)
echo -e `date` " Executing $DISTRICTNAME ($targetPath)";
$cloverProd -fq ~/lpProd/services/system/management/cloverleaf/prod/jsAccess/districtAccessFiles/$DISTRICTNAME.js

        done