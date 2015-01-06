#!/bin/bash

pushd ~ > /dev/null #cloverleaf JSON parameters are relative to the runtime directory, testing is relative to ~/testLinkPoint but node doesn't do tilde


echo -e "\nStart JSON ==============";
echo -e "\nclearing Albany/";
rm $clTestDestDir/AlbanyJson/*
#ls -la $clTestDestDir/Albany;

echo -e "\nexecuting clJson.js";
$cloverleaf -f $clTestScriptsDir/commandLine/clJson.js

echo -e "\n";
ls -la $clTestDestDir/AlbanyJson;
echo -e "\nDone  ==============\n";


popd > /dev/null