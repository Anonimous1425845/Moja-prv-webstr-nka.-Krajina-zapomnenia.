// Tu si nastav IP a port, ktoré chceš sledovať
const params = new URLSearchParams(window.location.search);
const TARGET_IP = params.get('ip') || 'play.hypixel.net';
const TARGET_PORT = params.get('port') || 25565;

async function updateStatus(ip, port) {
    try {
        // Posielame IP a PORT ako argumenty v URL
        const response = await fetch(`http://localhost:3000/ping?ip=${ip}&port=${port}`);
        const data = await response.json();

        const statusEl = document.getElementById('status-text');
        const playersEl = document.getElementById('player-count');
        const nameEl = document.getElementById('server-name');
        const versionEl = document.getElementById('server-version')

        // Aktualizujeme názov servera v nadpise
        nameEl.innerText = ip;

        if (data.online) {
            statusEl.innerText = "ONLINE";
            statusEl.style.color = "green";
            playersEl.innerText = `${data.players} / ${data.max}`;
            versionEl.innerText = data.version;
        } else {
            statusEl.innerText = "OFFLINE";
            statusEl.style.color = "red";
            playersEl.innerText = "0 / 0";
            versionEl.innerText = "Unknown";
        }
    } catch (error) {
        console.error("Chyba pripojenia k Node.js:", error);
        document.getElementById('status-text').innerText = "CHYBA API";
        document.getElementById('server-name').innerText = "Chyba";
    }
}

// Spustíme s našimi premennými
updateStatus(TARGET_IP, TARGET_PORT);

// Automatická aktualizácia každých 30 sekúnd
setInterval(() => updateStatus(TARGET_IP, TARGET_PORT), 30000);