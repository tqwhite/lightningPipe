#!/bin/bash
echo -e "\nthis is set to -q (quiet)\n\n";

export DISTRICTNAME='Albany';

rm -r /home/lightningpipe/mountPoint/destDirDemo/$DISTRICTNAME/*;
echo -e "/nStarting $DISTRICTNAME";
$cloverDemo -fq ~/lpDemo/services/system/management/cloverleaf/demo/jsAccess/districtAccessFiles/$DISTRICTNAME.js
ls -la /home/lightningpipe/mountPoint/destDirDemo/$DISTRICTNAME/

export DISTRICTNAME='Clinton-Graceville';

rm -r /home/lightningpipe/mountPoint/destDirDemo/$DISTRICTNAME/*;
echo -e "/nStarting $DISTRICTNAME";
$cloverDemo -fq ~/lpDemo/services/system/management/cloverleaf/demo/jsAccess/districtAccessFiles/$DISTRICTNAME.js
ls -la /home/lightningpipe/mountPoint/destDirDemo/$DISTRICTNAME/

export DISTRICTNAME='Hancock';

rm -r /home/lightningpipe/mountPoint/destDirDemo/$DISTRICTNAME/*;
echo -e "/nStarting $DISTRICTNAME";
$cloverDemo -fq ~/lpDemo/services/system/management/cloverleaf/demo/jsAccess/districtAccessFiles/$DISTRICTNAME.js
ls -la /home/lightningpipe/mountPoint/destDirDemo/$DISTRICTNAME/

export DISTRICTNAME='Morris';

rm -r /home/lightningpipe/mountPoint/destDirDemo/$DISTRICTNAME/*;
echo -e "/nStarting $DISTRICTNAME";
$cloverDemo -fq ~/lpDemo/services/system/management/cloverleaf/demo/jsAccess/districtAccessFiles/$DISTRICTNAME.js
ls -la /home/lightningpipe/mountPoint/destDirDemo/$DISTRICTNAME/

export DISTRICTNAME='Paynesville';

rm -r /home/lightningpipe/mountPoint/destDirDemo/$DISTRICTNAME/*;
echo -e "/nStarting $DISTRICTNAME";
$cloverDemo -fq ~/lpDemo/services/system/management/cloverleaf/demo/jsAccess/districtAccessFiles/$DISTRICTNAME.js
ls -la /home/lightningpipe/mountPoint/destDirDemo/$DISTRICTNAME/

export DISTRICTNAME='WCE';

rm -r /home/lightningpipe/mountPoint/destDirDemo/$DISTRICTNAME/*;
echo -e "/nStarting $DISTRICTNAME";
$cloverDemo -fq ~/lpDemo/services/system/management/cloverleaf/demo/jsAccess/districtAccessFiles/$DISTRICTNAME.js
ls -la /home/lightningpipe/mountPoint/destDirDemo/$DISTRICTNAME/

export DISTRICTNAME='Wheaton';

rm -r /home/lightningpipe/mountPoint/destDirDemo/$DISTRICTNAME/*;
echo -e "/nStarting $DISTRICTNAME";
$cloverDemo -fq ~/lpDemo/services/system/management/cloverleaf/demo/jsAccess/districtAccessFiles/$DISTRICTNAME.js
ls -la /home/lightningpipe/mountPoint/destDirDemo/$DISTRICTNAME/


