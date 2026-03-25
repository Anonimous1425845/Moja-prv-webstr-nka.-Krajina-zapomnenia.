function prompt { "> " }
clear
echo FINE!
echo --------------------------------------------------
cd ping-api
start node main.js
cd ..
echo --------------------------------------------------
cd mc-ping-api
start node mc.js
cd ..
echo --------------------------------------------------
cd yt-dlp-downloader
cd api
start node main.js
cd ..
cd ..
echo --------------------------------------------------
cd mysql-db-to-json-api
start node .
cd ..
echo --------------------------------------------------
echo OK
php -S 192.168.1.192:80