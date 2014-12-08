export homeDir="/Users/tqwhite"
export linkDir="/Users/tqwhite/testLinkpoint"
export lightningPipeBase="/Volumes/qubuntuFileServer/cmerdc/lightningPipe/"

echo -e "\nLocations initialized: $homeDir"

#cloverleaf and lightningpath aliases and stuff
if [ -f /Volumes/qubuntuFileServer/cmerdc/lightningPipe/system/management/utility/tqScripting/bash_alias_cloverleaf ]; then
source /Volumes/qubuntuFileServer/cmerdc/lightningPipe/system/management/utility/tqScripting/bash_alias_cloverleaf
fi