#use: source /blah/../siteVariations/this.bash

export serverContext="lpdemo"

export homeDir="/home/cloverleafDemo"
export testLinkDir="$homeDir/testLinkpoint"
export lpProjectBase="/home/cloverleafDemo/services/"


export testScriptsDir=$(dirname ${BASH_SOURCE[0]})/../

# initialize the common stuff
if [ -f $testScriptsDir/common.bash ]; then
echo 'found common'
source $testScriptsDir/common.bash
fi