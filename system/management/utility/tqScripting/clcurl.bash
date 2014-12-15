#!/bin/bash

if [[ "j" == "$1" ]]; then


echo -e "\n\ncurl -i -H "username:jmcPlans1" -H "password:123" http://127.0.0.1:8000/uff/1.0/districts/$2\n\n"
curl -i -H "username:jmcPlans1" -H "password:123" http://127.0.0.1:8000/uff/1.0/districts/$2


elif [[ "m" == "$1" ]]; then


echo -e "\n\ncurl -i -H "username:mssql" -H "password:123" http://127.0.0.1:8000/uff/1.0/districts/$2\n\n"

curl -i -H "username:jmcPlans1" -H "password:123" http://127.0.0.1:8000/uff/1.0/districts/$2

else

echo -e "\nUsage:\n\
clcurl [j|m] DISTRICTNAME/schools/SCHOOLNAME/segments/SEGMENTNAME\
"

fi