
export serverContext="lpdemo"


export homeDir="/Users/tqwhite"
export testLinkDir="/Users/tqwhite/testLinkpoint"
export lightningPipeBase="/Volumes/qubuntuFileServer/cmerdc/lightningPipe/"


export testScriptsDir=$(dirname ${BASH_SOURCE[0]})/../

# initialize the common stuff
if [ -f $testScriptsDir/common.bash ]; then
echo 'found common'
source $testScriptsDir/common.bash
fi