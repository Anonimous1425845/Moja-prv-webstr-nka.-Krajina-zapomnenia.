// Tu si nastav IP a port, ktoré chceš sledovať
const params = new URLSearchParams(window.location.search);
const TARGET_IP = params.get('ip') || 'play.hypixel.net';
const TARGET_PORT = params.get('port') || 25565;

// Toggle localhost api
const DebugAPIConnect = false
// Toggle localhost icoip
const icoipdebug = true

// Dont change
let icoip;
if (icoipdebug === true) {
    icoip = "http://192.168.1.192/mc-ping/default.png"
} else {
    icoip = './default.png'
}

async function updateStatus(ip, port) {
    try {
        // Posielame IP a PORT ako argumenty v URL
        let response;
        if (DebugAPIConnect === true) {
            response = await fetch(`http://192.168.1.192:3000/ping?ip=${ip}&port=${port}`);
        }else{
            response = await fetch(`http://localhost:3000/ping?ip=${ip}&port=${port}`);
        }
        const data = await response.json();

        const statusEl = document.getElementById('status-text');
        const playersEl = document.getElementById('player-count');
        const nameEl = document.getElementById('server-name');
        const versionEl = document.getElementById('server-version');
        const motdEL = document.getElementById('server-motd');
        const listEL = document.getElementById('player-list');

        // Aktualizujeme názov servera v nadpise
        nameEl.innerText = ip;

        if (data.online) {
            // debuh lol
            // console.log("Data z API:", data); // Pozri si v console, čo sa vracia
            // console.log("Icon:", data.icon);
            
            // if (data.icon) {
            //     document.getElementById('server-icon').src = `data:image/png;base64,${data.icon}`;
            // } else {
            //     console.log("Icon je null/undefined");
            // }
            //debug lol end
            statusEl.innerText = "ONLINE";
            statusEl.style.color = "green";
            playersEl.innerText = `${data.players} / ${data.max}`;
            versionEl.innerText = data.version;
            motdEL.innerText = data.motd;
            // image Stuff
            const iconEl = document.getElementById('server-icon');
            iconEl.src = icoip // Default placeholder
            // fallback ak obrázok neexistuje / zlyhá načítanie
            iconEl.onerror = () => {
                iconEl.src = icoip;
            };
            // nastavý default na actual icon (ak nijaký je)
            if (data.icon && data.icon.length > 100) {
                iconEl.src = data.icon;
            }
            playersEl.innerText = `${data.players} / ${data.max}`;
            // end if image stuff
            if (data.playerList.length > 0) {
                //zmazať starý zoznam
                listEL.innerHTML = "";
                // každé meno má <li>
                data.playerList.forEach(playerName => {
                    const li = document.createElement('li');
                    li.innerText = playerName;
                    listEL.appendChild(li);
                });
            } else {
                listEL.innerHTML = "<li>Žiadny hráči online (alebo skrytí)</li>";
            }
        } else {
            statusEl.innerText = "OFFLINE";
            statusEl.style.color = "red";
            playersEl.innerText = "0 / 0";
            versionEl.innerText = "Unknown";
            motdEL.innerText = "Server OFFLINE";
            listEL.innerText = "OFFLINE"
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