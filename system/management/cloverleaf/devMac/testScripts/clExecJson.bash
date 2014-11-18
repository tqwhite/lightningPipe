#!/bin/bash

echo "clearing HawleyMinus/Students.txt";
rm $clTestDestDir/HawleyMinus/Students.txt;

echo "execute json";
$cloverleaf -fq /Volumes/qubuntuFileServer/cmerdc/lightningPipe/system/management/cloverleaf/devMac/testScripts/testJson.js

ls -la /Volumes/qubuntuFileServer/cmerdc/lightningPipe/testResults/HawleyMinus;