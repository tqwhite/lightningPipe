#!/bin/bash

pushd ~ > /dev/null #cloverleaf JSON parameters are relative to the runtime directory, testing is relative to ~/testLinkPoint but node doesn't do tilde


echo -e "\nStart JSON ==============";
echo -e "\nclearing HawleyMinus/";
rm $testDestDir/HawleyMinus/*
#ls -la $testDestDir/HawleyMinus;

echo -e "\nexecuting clJson.js";
$cloverleaf -f $clTestScriptsDir/commandLine/clJson.js

echo -e "\n";
ls -la $testDestDir/HawleyMinus;
echo -e "\nDone  ==============\n";


popd > /dev/null