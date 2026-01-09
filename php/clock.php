<?php
// Set timezone (adjust as needed)
date_default_timezone_set('UTC');

// Get current server time in UNIX timestamp
$serverTime = time();
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Real-Time Clock</title>
    <link rel="stylesheet" href="./css/clock.css">
    <link rel="stylesheet" href="../css/style.css">
    <link rel="icon" href="../assets/icons/Linux/Debian.png" type="image/png">
</head>
<body>

<h1>Server Clock Time</h1>
<div id="clock"></div>
<script src="./js/clock.js.php"></script>
</body>
</html>
