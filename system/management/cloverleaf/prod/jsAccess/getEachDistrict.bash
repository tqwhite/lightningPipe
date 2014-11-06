#!/bin/bash

shopt -s extglob

cloverProd="node /home/lightningpipe/lpProd/services/system/cloverleaf/cloverleaf.js"
TARGETDIR="/home/lightningpipe/mountPoint/destDirProd"

echo -e "\n\n"`date` " Starting Run ============================";

DISTRICTNAME='Albany';

targetPath="$TARGETDIR/$DISTRICTNAME";
[ -d $targetPath ] && cd $targetPath && rm !(Staff.txt)
echo -e `date` " Executing $DISTRICTNAME ($targetPath)";
$cloverProd -fq ~/lpProd/services/system/management/cloverleaf/prod/jsAccess/districtAccessFiles/$DISTRICTNAME.js
#ls -la $TARGETDIR/$DISTRICTNAME/

DISTRICTNAME='Clinton-Graceville';

targetPath="$TARGETDIR/$DISTRICTNAME/";
[ -d $targetPath ] && cd $targetPath && rm !(Staff.txt)
echo -e `date` " Executing $DISTRICTNAME ($targetPath)";
$cloverProd -fq ~/lpProd/services/system/management/cloverleaf/prod/jsAccess/districtAccessFiles/$DISTRICTNAME.js
#ls -la $TARGETDIR/$DISTRICTNAME/

DISTRICTNAME='Hancock';

targetPath="$TARGETDIR/$DISTRICTNAME/";
[ -d $targetPath ] && cd $targetPath && rm !(Staff.txt)
echo -e `date` " Executing $DISTRICTNAME ($targetPath)";
$cloverProd -fq ~/lpProd/services/system/management/cloverleaf/prod/jsAccess/districtAccessFiles/$DISTRICTNAME.js
#ls -la $TARGETDIR/$DISTRICTNAME/

DISTRICTNAME='Morris';

targetPath="$TARGETDIR/$DISTRICTNAME/";
[ -d $targetPath ] && cd $targetPath && rm !(Staff.txt)
echo -e `date` " Executing $DISTRICTNAME ($targetPath)";
$cloverProd -fq ~/lpProd/services/system/management/cloverleaf/prod/jsAccess/districtAccessFiles/$DISTRICTNAME.js
#ls -la $TARGETDIR/$DISTRICTNAME/

DISTRICTNAME='Paynesville';

targetPath="$TARGETDIR/$DISTRICTNAME/";
[ -d $targetPath ] && cd $targetPath && rm !(Staff.txt)
echo -e `date` " Executing $DISTRICTNAME ($targetPath)";
$cloverProd -fq ~/lpProd/services/system/management/cloverleaf/prod/jsAccess/districtAccessFiles/$DISTRICTNAME.js
#ls -la $TARGETDIR/$DISTRICTNAME/

DISTRICTNAME='WCE';

targetPath="$TARGETDIR/$DISTRICTNAME/";
[ -d $targetPath ] && cd $targetPath && rm !(Staff.txt)
echo -e `date` " Executing $DISTRICTNAME ($targetPath)";
$cloverProd -fq ~/lpProd/services/system/management/cloverleaf/prod/jsAccess/districtAccessFiles/$DISTRICTNAME.js
#ls -la $TARGETDIR/$DISTRICTNAME/

DISTRICTNAME='Wheaton';

targetPath="$TARGETDIR/$DISTRICTNAME/";
[ -d $targetPath ] && cd $targetPath && rm !(Staff.txt)
echo -e `date` " Executing $DISTRICTNAME ($targetPath)";
$cloverProd -fq ~/lpProd/services/system/management/cloverleaf/prod/jsAccess/districtAccessFiles/$DISTRICTNAME.js
#ls -la $TARGETDIR/$DISTRICTNAME/


echo -e `date` " Ending Run ============================\n\n";

