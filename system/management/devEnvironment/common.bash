#!/bin/bash
echo "CLOVERLEAF AND LIGHTNINGPIPE ALIASES ETC (editlpscripts)";

export lpClTestInfo="\
----------------------------------\n\
TESTING COMMANDS\n\n\
runLpTestServer - start LightningPipe server\n\
pingLp - ping LP test server\n\
curlm - acccess LP as mssql user\n\
curlj - access LP as jmc user\n\\n\
clSingle - Run Cloverleaf with specific parameters\n\
clCommands - Run Cloverleaf from shell script file\n\
   (\$clTestParametersDir/testCommandsDemo.bash)\n\\n\
clJson - Run Cloverleaf against parameter file\n\
   (\$clTestParametersDir/testJsonDemo.js)\n\\n\
cljmcUser - set Cloverleaf user to jmc\n\
clmssqlUser - set Cloverleaf usr to mssql\n\n\
'cloverleaf -p' - gives you info about it's current setup\n\

lpdir - cd to LP server code\n\
cldir - cd to Cloverleaf code\n\n\
lpInfo - repeat this information\n\n\
viewLog - look at all log info\n\n\
tailLog - look at recent log info\n\n\
editlpscripts - edit this file\n\
----------------------------------\n\
";

if [ ! -e "$lpClProjectBase/logFiles" ]
then
  echo -e "\ncreating $lpClProjectBase/logFiles\n"
  mkdir "$lpClProjectBase/logFilesx"
fi

if [ ! -e "$lpClProjectBase/testResults" ]
then
  echo -e "\ncreating $lpClProjectBase/testResults\n"
  mkdir "$lpClProjectBase/testResults"
fi

if [ ! -e "$lpClProjectBase/system/config" ]
then
  echo -e "\nWARNING: $lpClProjectBase/config IS MISSING\n"
fi


echo -e "$lpClTestInfo";
alias lpInfo=' echo -e "$lpClTestInfo"'

export PATH=$PATH:"$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )": #include other executable scripts in this directory

echo -e "\ncd lpClProjectBase ======"; cd $lpClProjectBase; pwd; #note: this is a synonym of lprepo, repo is different in some other projects

# === symbolic link allows paths fixed in control files to be redirected for various test purposes ===
rm -r $testLinkDir
mkdir $testLinkDir

ln -s $lpClProjectBase $homeDir/testLinkpoint/lightningPipeHome

ln -s $homeDir/testLinkpoint/lightningPipeHome/testDataFiles/ $homeDir/testLinkpoint/testDataSource; #for use in json files
ln -s $homeDir/testLinkpoint/lightningPipeHome/testResults/ $homeDir/testLinkpoint/testDataDest; #for use in json files



# create environment variables for important locations ================================
export lpClSystemDir="$homeDir/testLinkpoint/lightningPipeHome/system"
export lightningPipeDir="$homeDir/testLinkpoint/lightningPipeHome/system/responder"
export cloverleafDir="$homeDir/testLinkpoint/lightningPipeHome/system/cloverleaf"
export lpClLogginDir="$homeDir/testLinkpoint/lightningPipeHome/logFiles"

export clTestScriptsDir="$lpClSystemDir/management/devEnvironment/"
export clTestParametersDir="$lpClSystemDir/management/devEnvironment/parameterFiles"

export testSourceDir="$homeDir/testLinkpoint/testDataSource"; #for use in bash files
export testDestDir="$homeDir/testLinkpoint/testDataDest"; #for use in bash files



# === UTILITY AND NAVIGATION aliases ===========================================
alias lprepo="cd $lpClProjectBase; pwd; git status;";
alias editlpscripts="edit $clTestScriptsDir/common.bash"

alias cldir="cd $cloverleafDir; echo -e '\n'; ls -la; pwd;"
alias lpdir="cd $lightningPipeDir; echo -e '\n'; ls -la; pwd;"


# === BASIC OPERATION aliases/variables ===========================================
export cloverleaf="node $cloverleafDir/cloverleaf.js" #this seems to work better inside of scripts than an alias
alias cloverleaf="node $cloverleafDir/cloverleaf.js" #this is good on the command line so you don't have to type $

alias lpserve="clear; nodemon -w $homeDir/testLinkpoint/lightningPipeHome $homeDir/testLinkpoint/lightningPipeHome/system/responder/server.js";


# === TEST RUNNING ===========================================
alias pingLp="curl http://127.0.0.1:8000/ping"

alias execCloverleaf="execCloverleaf.bash"
alias cljsontest="$cloverleaf -f $clTestParametersDir/testJsonDemo.js"

#these have been turned into scripts
# alias curlj="curl -i -H "username:jmcPlans1" -H "password:123" ";
# alias curlm="curl -i -H "username:mssql" -H "password:123" "

#change cloverleaf configuration to set user
alias cljmcUser="cp $lpClSystemDir/config/cloverleafJmc.js $lpClSystemDir/config/cloverleaf.js; echo 'SET JMC';"
alias clmssqlUser="cp $lpClSystemDir/config/cloverleafMssql.js $lpClSystemDir/config/cloverleaf.js; echo 'SET MSSQL';"

if [ "$serverContext" == "qbook" ]; then
alias viewLog="cat $lpClLogginDir/lightningClover.log | bunyan | tail -c -10000; echo 'ANY FATAL?'; cat $lpClLogginDir/lightningClover.log | bunyan -l fatal; echo 'done';"
else
alias viewLog="cat $lpClLogginDir/lightningClover.log | bunyan | tail --lines=133; echo 'ANY FATAL?'; cat $lpClLogginDir/lightningClover.log | bunyan -l fatal; echo 'done';"

fi

alias tailLog="tail -f $lpClLogginDir/lightningClover.log | bunyan"
alias killLog="rm $lpClLogginDir/lightningClover.log"


# === NOT SURE ===========================================
alias clparms="$clTestScriptsDir/commandLine/clCommandLine.bash"

alias clcmdtest="$clTestScriptsDir/commandLine/clCommandLine.bash  StudentEnrolled 030 Albany"
alias lp1test="clcurl.bash j Albany/schools/030/segments/Student_Base"




