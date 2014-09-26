#!/bin/sh

export DISTRICTNAME='WCE';

rm -r /home/mountPoint/destDirDemo/$DISTRICTNAME/*;
$cloverDemo -f ~/lpDemo/services/system/management/cloverleaf/demo/jsAccess/districtAccessFiles/$DISTRICTNAME.js


