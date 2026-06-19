function prompt { "> " }
clear
echo FINE!
echo --------------------------------------------------
cd ping-api
start node .
cd ..
echo --------------------------------------------------
cd mc-ping-api
start node .
cd ..
echo --------------------------------------------------
cd yt-dlp-downloader/api
start node .
cd ../..
echo --------------------------------------------------
cd mysql-db-to-json-api
start node .
cd ..
echo --------------------------------------------------
cd chat/api
start node .
cd ../..
echo --------------------------------------------------
start php -S 0.0.0.0:8080
echo OK