<?php
header("Content-Type: application/javascript");

// Get server time from PHP
$serverTime = time();
$serverTimeMs = $serverTime * 1000;
?>

// Get server time from PHP
let serverTimestamp = <?php echo json_encode($serverTimeMs); ?>; // in milliseconds

// Function to update the clock display in JS
function updateClock() {
    // Create a Date object using the server time
    let date = new Date(serverTimestamp);

    // Format the time as HH:MM:SS
    let hours = String(date.getHours()).padStart(2, '0');
    let minutes = String(date.getMinutes()).padStart(2, '0');
    let seconds = String(date.getSeconds()).padStart(2, '0');

    // Update the clock element on the page
    document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;

    // Increase server time by 1 second
    serverTimestamp += 1000;
}

// Start the clock and update it every second
updateClock();
setInterval(updateClock, 1000);