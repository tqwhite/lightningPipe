#!/bin/bash

pushd ~ > /dev/null #cloverleaf JSON parameters are relative to the runtime directory, testing is relative to ~/testLinkPoint but node doesn't do tilde


echo -e "\nStart JSON ==============";
echo -e "\nclearing Albany/";
rm $testDestDir/AlbanyJson/*
#ls -la $testDestDir/Albany;

echo -e "\nexecuting clJson.js";
$cloverleaf -f $clTestScriptsDir/commandLine/clJson.js

echo -e "\n";
ls -la $testDestDir/AlbanyJson;
echo -e "\nDone  ==============\n";


popd > /dev/null