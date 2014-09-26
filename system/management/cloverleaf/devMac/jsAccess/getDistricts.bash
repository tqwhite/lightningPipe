#!/bin/sh


export DISTRICTNAME="Wheaton";

rm -r $destDirDemo/$DISTRICTNAME;
cd $destDirDemo/$DISTRICTNAME;
$cloverDemo -f ~/lpDemo/services/system/management/cloverleaf/demo/jsAccess/districtAccessFiles/$DISTRICTNAME.js
