#!/bin/bash

echo "clearing HawleyMinus/StudentEnrolled.txt";
rm $clTestDestDir/HawleyMinus/StudentEnrolled.txt;

echo "execute json";
$cloverleaf -f /Volumes/qubuntuFileServer/cmerdc/lightningPipe/system/management/cloverleaf/devDemoUnix//testScripts/testJson.js

ls -la /Volumes/qubuntuFileServer/cmerdc/lightningPipe/testResults/HawleyMinus;