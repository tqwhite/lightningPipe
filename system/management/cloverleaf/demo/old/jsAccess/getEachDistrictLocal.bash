#!/bin/sh

export DISTRICTNAME='Albany';

rm -r /home/lightningpipe/lpDemo/testResults/$DISTRICTNAME/*;
echo -e "/nStarting $DISTRICTNAME";
$cloverDemo -f ~/lpDemo/services/system/management/cloverleaf/demo/jsAccess/districtAccessFilesLocalDest/$DISTRICTNAME.js
ls -la /home/lightningpipe/lpDemo/testResults/$DISTRICTNAME/

export DISTRICTNAME='Clinton-Graceville';

rm -r /home/lightningpipe/lpDemo/testResults/$DISTRICTNAME/*;
echo -e "/nStarting $DISTRICTNAME";
$cloverDemo -f ~/lpDemo/services/system/management/cloverleaf/demo/jsAccess/districtAccessFilesLocalDest/$DISTRICTNAME.js
ls -la /home/lightningpipe/lpDemo/testResults/$DISTRICTNAME/

export DISTRICTNAME='Hancock';

rm -r /home/lightningpipe/lpDemo/testResults/$DISTRICTNAME/*;
echo -e "/nStarting $DISTRICTNAME";
$cloverDemo -f ~/lpDemo/services/system/management/cloverleaf/demo/jsAccess/districtAccessFilesLocalDest/$DISTRICTNAME.js
ls -la /home/lightningpipe/lpDemo/testResults/$DISTRICTNAME/

export DISTRICTNAME='Morris';

rm -r /home/lightningpipe/lpDemo/testResults/$DISTRICTNAME/*;
echo -e "/nStarting $DISTRICTNAME";
$cloverDemo -f ~/lpDemo/services/system/management/cloverleaf/demo/jsAccess/districtAccessFilesLocalDest/$DISTRICTNAME.js
ls -la /home/lightningpipe/lpDemo/testResults/$DISTRICTNAME/

export DISTRICTNAME='Paynesville';

rm -r /home/lightningpipe/lpDemo/testResults/$DISTRICTNAME/*;
echo -e "/nStarting $DISTRICTNAME";
$cloverDemo -f ~/lpDemo/services/system/management/cloverleaf/demo/jsAccess/districtAccessFilesLocalDest/$DISTRICTNAME.js
ls -la /home/lightningpipe/lpDemo/testResults/$DISTRICTNAME/

export DISTRICTNAME='WCE';

rm -r /home/lightningpipe/lpDemo/testResults/$DISTRICTNAME/*;
echo -e "/nStarting $DISTRICTNAME";
$cloverDemo -f ~/lpDemo/services/system/management/cloverleaf/demo/jsAccess/districtAccessFilesLocalDest/$DISTRICTNAME.js
ls -la /home/lightningpipe/lpDemo/testResults/$DISTRICTNAME/

export DISTRICTNAME='Wheaton';

rm -r /home/lightningpipe/lpDemo/testResults/$DISTRICTNAME/*;
echo -e "/nStarting $DISTRICTNAME";
$cloverDemo -f ~/lpDemo/services/system/management/cloverleaf/demo/jsAccess/districtAccessFilesLocalDest/$DISTRICTNAME.js
ls -la /home/lightningpipe/lpDemo/testResults/$DISTRICTNAME/


