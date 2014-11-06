#!/bin/bash

cloverProd="node /home/lightningpipe/lpProd/services/system/cloverleaf/cloverleaf.js"
<<<<<<< HEAD
destDirProd="/home/lightningpipe/mountPoint/destDirProd"
=======
TARGETDIR="/home/lightningpipe/mountPoint/destDirProd"
>>>>>>> bfb45b628e05c9c22bb903cd30d59d67455533dd

echo -e "\n\n"`date` " Starting Run ============================";

DISTRICTNAME='Albany';

<<<<<<< HEAD
targetPath="/home/lightningpipe/mountPoint/destDirProd/$DISTRICTNAME";
[ -d $targetPath ] && rm -rf $targetPath/*;
echo -e `date` " Executing $DISTRICTNAME ($targetPath)";
$cloverProd -fq ~/lpProd/services/system/management/cloverleaf/prod/jsAccess/districtAccessFiles/$DISTRICTNAME.js
#ls -la /home/lightningpipe/mountPoint/destDirProd/$DISTRICTNAME/

DISTRICTNAME='Clinton-Graceville';

targetPath="/home/lightningpipe/mountPoint/destDirProd/$DISTRICTNAME/";
[ -d $targetPath ] && rm -rf $targetPath/*;
echo -e `date` " Executing $DISTRICTNAME ($targetPath)";
$cloverProd -fq ~/lpProd/services/system/management/cloverleaf/prod/jsAccess/districtAccessFiles/$DISTRICTNAME.js
#ls -la /home/lightningpipe/mountPoint/destDirProd/$DISTRICTNAME/

DISTRICTNAME='Hancock';

targetPath="/home/lightningpipe/mountPoint/destDirProd/$DISTRICTNAME/";
[ -d $targetPath ] && rm -rf $targetPath/*;
echo -e `date` " Executing $DISTRICTNAME ($targetPath)";
$cloverProd -fq ~/lpProd/services/system/management/cloverleaf/prod/jsAccess/districtAccessFiles/$DISTRICTNAME.js
#ls -la /home/lightningpipe/mountPoint/destDirProd/$DISTRICTNAME/

DISTRICTNAME='Morris';

targetPath="/home/lightningpipe/mountPoint/destDirProd/$DISTRICTNAME/";
[ -d $targetPath ] && rm -rf $targetPath/*;
echo -e `date` " Executing $DISTRICTNAME ($targetPath)";
$cloverProd -fq ~/lpProd/services/system/management/cloverleaf/prod/jsAccess/districtAccessFiles/$DISTRICTNAME.js
#ls -la /home/lightningpipe/mountPoint/destDirProd/$DISTRICTNAME/

DISTRICTNAME='Paynesville';

targetPath="/home/lightningpipe/mountPoint/destDirProd/$DISTRICTNAME/";
[ -d $targetPath ] && rm -rf $targetPath/*;
echo -e `date` " Executing $DISTRICTNAME ($targetPath)";
$cloverProd -fq ~/lpProd/services/system/management/cloverleaf/prod/jsAccess/districtAccessFiles/$DISTRICTNAME.js
#ls -la /home/lightningpipe/mountPoint/destDirProd/$DISTRICTNAME/

DISTRICTNAME='WCE';

targetPath="/home/lightningpipe/mountPoint/destDirProd/$DISTRICTNAME/";
[ -d $targetPath ] && rm -rf $targetPath/*;
echo -e `date` " Executing $DISTRICTNAME ($targetPath)";
$cloverProd -fq ~/lpProd/services/system/management/cloverleaf/prod/jsAccess/districtAccessFiles/$DISTRICTNAME.js
#ls -la /home/lightningpipe/mountPoint/destDirProd/$DISTRICTNAME/

DISTRICTNAME='Wheaton';

targetPath="/home/lightningpipe/mountPoint/destDirProd/$DISTRICTNAME/";
[ -d $targetPath ] && rm -rf $targetPath/*;
echo -e `date` " Executing $DISTRICTNAME ($targetPath)";
$cloverProd -fq ~/lpProd/services/system/management/cloverleaf/prod/jsAccess/districtAccessFiles/$DISTRICTNAME.js
#ls -la /home/lightningpipe/mountPoint/destDirProd/$DISTRICTNAME/
=======
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
>>>>>>> bfb45b628e05c9c22bb903cd30d59d67455533dd


echo -e `date` " Ending Run ============================\n\n";

