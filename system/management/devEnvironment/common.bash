#!/bin/bash
echo "CLOVERLEAF AND LIGHTNINGPIPE ALIASES ETC (editlpscripts)";

export lpTestInfo="\
----------------------------------\n\
TESTING COMMANDS\n\n\
runLpTestServer - start LightningPipe server\n\
pingLp - ping LP test server\n\
curlm - acccess LP as mssql user\n\
curlj - access LP as jmc user\n\\n\


lpdir - cd to LP server code\n\
lpInfo - repeat this information\n\n\
viewLog - look at all log info\n\n\
tailLog - look at recent log info\n\n\
editlpscripts - edit this file\n\
----------------------------------\n\
";

if [ ! -e "$lpProjectBase/logFiles" ]
then
  echo -e "\ncreating $lpProjectBase/logFiles\n"
  mkdir "$lpProjectBase/logFiles"
fi

if [ ! -e "$lpProjectBase/testResults" ]
then
  echo -e "\ncreating $lpProjectBase/testResults\n"
  mkdir "$lpProjectBase/testResults"
fi

if [ ! -e "$lpProjectBase/testData" ]
then
  echo -e "\nWARNING: $lpProjectBase/testData IS MISSING\n"
fi

if [ ! -e "$lpProjectBase/system/config" ]
then
  echo -e "\nWARNING: $lpProjectBase/config IS MISSING\n"
fi


echo -e "$lpTestInfo";
alias lpInfo=' echo -e "$lpTestInfo"'

export PATH=$PATH:"$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )": #include other executable scripts in this directory

echo -e "\ncd lpProjectBase ======"; cd $lpProjectBase; pwd; #note: this is a synonym of lprepo, repo is different in some other projects

# === symbolic link allows paths fixed in control files to be redirected for various test purposes ===
rm -r $testLinkDir
mkdir $testLinkDir

ln -s $lpProjectBase $homeDir/testLinkpoint/lightningPipeHome

ln -s $homeDir/testLinkpoint/lightningPipeHome/testDataFiles/ $homeDir/testLinkpoint/testDataSource; #for use in json files
ln -s $homeDir/testLinkpoint/lightningPipeHome/testResults/ $homeDir/testLinkpoint/testDataDest; #for use in json files



# create environment variables for important locations ================================
export lpSystemDir="$homeDir/testLinkpoint/lightningPipeHome/system"
export lightningPipeDir="$homeDir/testLinkpoint/lightningPipeHome/system/responder"
export cloverleafDir="$homeDir/testLinkpoint/lightningPipeHome/system/cloverleaf"
export lpLogginDir="$homeDir/testLinkpoint/lightningPipeHome/logFiles"

export lpTestScriptsDir="$lpSystemDir/management/devEnvironment/"

export testSourceDir="$homeDir/testLinkpoint/testDataSource"; #for use in bash files
export testDestDir="$homeDir/testLinkpoint/testDataDest"; #for use in bash files



# === UTILITY AND NAVIGATION aliases ===========================================
alias lprepo="cd $lpProjectBase; pwd; git status;";
alias editlpscripts="edit $lpTestScriptsDir/common.bash"

alias lpdir="cd $lightningPipeDir; echo -e '\n'; ls -la; pwd;"


# === BASIC OPERATION aliases/variables ===========================================
export cloverleaf="node $cloverleafDir/cloverleaf.js" #this seems to work better inside of scripts than an alias
alias cloverleaf="node $cloverleafDir/cloverleaf.js" #this is good on the command line so you don't have to type $

alias lpserve="clear; nodemon -w $homeDir/testLinkpoint/lightningPipeHome $homeDir/testLinkpoint/lightningPipeHome/system/responder/server.js";


# === TEST RUNNING ===========================================
alias pingLp="curl http://127.0.0.1:8000/ping"

#these have been turned into scripts
# alias curlj="curl -i -H "username:jmcPlans1" -H "password:123" ";
# alias curlm="curl -i -H "username:mssql" -H "password:123" "

if [ "$serverContext" == "qbook" ]; then
alias viewLog="cat $lpLogginDir/lightningClover.log | bunyan | tail -c -10000; echo 'ANY FATAL?'; cat $lpLogginDir/lightningClover.log | bunyan -l fatal; echo 'done';"
else
alias viewLog="cat $lpLogginDir/lightningClover.log | bunyan | tail --lines=133; echo 'ANY FATAL?'; cat $lpLogginDir/lightningClover.log | bunyan -l fatal; echo 'done';"

fi

alias tailLog="tail -f $lpLogginDir/lightningClover.log | bunyan"
alias killLog="rm $lpLogginDir/lightningClover.log"



