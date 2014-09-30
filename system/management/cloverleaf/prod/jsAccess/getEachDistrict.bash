#!/bin/sh

export DISTRICTNAME='Albany';

rm -r /home/lightningpipe/mountPoint/destDirProd/$DISTRICTNAME/*;
echo -e "/nStarting $DISTRICTNAME";
$cloverProd -f ~/lpProd/services/system/management/cloverleaf/prod/jsAccess/districtAccessFiles/$DISTRICTNAME.js
ls -la /home/lightningpipe/mountPoint/destDirProd/$DISTRICTNAME/

export DISTRICTNAME='Clinton-Graceville';

rm -r /home/lightningpipe/mountPoint/destDirProd/$DISTRICTNAME/*;
echo -e "/nStarting $DISTRICTNAME";
$cloverProd -f ~/lpProd/services/system/management/cloverleaf/prod/jsAccess/districtAccessFiles/$DISTRICTNAME.js
ls -la /home/lightningpipe/mountPoint/destDirProd/$DISTRICTNAME/

export DISTRICTNAME='Hancock';

rm -r /home/lightningpipe/mountPoint/destDirProd/$DISTRICTNAME/*;
echo -e "/nStarting $DISTRICTNAME";
$cloverProd -f ~/lpProd/services/system/management/cloverleaf/prod/jsAccess/districtAccessFiles/$DISTRICTNAME.js
ls -la /home/lightningpipe/mountPoint/destDirProd/$DISTRICTNAME/

export DISTRICTNAME='Morris';

rm -r /home/lightningpipe/mountPoint/destDirProd/$DISTRICTNAME/*;
echo -e "/nStarting $DISTRICTNAME";
$cloverProd -f ~/lpProd/services/system/management/cloverleaf/prod/jsAccess/districtAccessFiles/$DISTRICTNAME.js
ls -la /home/lightningpipe/mountPoint/destDirProd/$DISTRICTNAME/

export DISTRICTNAME='Paynesville';

rm -r /home/lightningpipe/mountPoint/destDirProd/$DISTRICTNAME/*;
echo -e "/nStarting $DISTRICTNAME";
$cloverProd -f ~/lpProd/services/system/management/cloverleaf/prod/jsAccess/districtAccessFiles/$DISTRICTNAME.js
ls -la /home/lightningpipe/mountPoint/destDirProd/$DISTRICTNAME/

export DISTRICTNAME='WCE';

rm -r /home/lightningpipe/mountPoint/destDirProd/$DISTRICTNAME/*;
echo -e "/nStarting $DISTRICTNAME";
$cloverProd -f ~/lpProd/services/system/management/cloverleaf/prod/jsAccess/districtAccessFiles/$DISTRICTNAME.js
ls -la /home/lightningpipe/mountPoint/destDirProd/$DISTRICTNAME/

export DISTRICTNAME='Wheaton';

rm -r /home/lightningpipe/mountPoint/destDirProd/$DISTRICTNAME/*;
echo -e "/nStarting $DISTRICTNAME";
$cloverProd -f ~/lpProd/services/system/management/cloverleaf/prod/jsAccess/districtAccessFiles/$DISTRICTNAME.js
ls -la /home/lightningpipe/mountPoint/destDirProd/$DISTRICTNAME/


