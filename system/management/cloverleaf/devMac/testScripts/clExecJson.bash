#!/bin/bash

echo "clearing HawleyMinus/StudentBase.txt";
rm $clTestDestDir/HawleyMinus/StudentBase.txt;

echo "execute json";
$cloverleaf -f /Volumes/qubuntuFileServer/cmerdc/lightningPipe/system/management/cloverleaf/devMac/testScripts/testJson.js

ls -la /Volumes/qubuntuFileServer/cmerdc/lightningPipe/testResults/HawleyMinus;