// Tu sa nastavý IP a port, ktoré budú zobrazené
const params = new URLSearchParams(window.location.search);
const TARGET_IP = params.get('ip') || 'play.hypixel.net';
const TARGET_PORT = params.get('port') || 25565;

// Toggle localhost api
const DebugAPIConnect = false
// Toggle localhost icoip
const icoipdebug = false

// Dont change
let icoip;
if (icoipdebug === false) {
    icoip = "http://192.168.1.192/mc-ping/default.png"
} else {
    icoip = './default.png'
}


// Úprava motd color formatings
// nevirobené mnou
// musí biť tu aby sa spusťila funkcia správne

function parseMinecraftMotd(motd) {
    if (!motd) return "";

    const colorMap = {
        'black': '#000000', 'dark_blue': '#0000AA', 'dark_green': '#00AA00', 'dark_aqua': '#00AAAA',
        'dark_red': '#AA0000', 'dark_purple': '#AA00AA', 'gold': '#FFAA00', 'gray': '#AAAAAA',
        'dark_gray': '#555555', 'blue': '#5555FF', 'green': '#55FF55', 'aqua': '#55FFFF',
        'red': '#FF5555', 'light_purple': '#FF55FF', 'yellow': '#FFFF55', 'white': '#FFFFFF',
        // Klasické kódy pre istotu (ak by boli v texte)
        '0': '#000000', '1': '#0000AA', '2': '#00AA00', '3': '#00AAAA',
        '4': '#AA0000', '5': '#AA00AA', '6': '#FFAA00', '7': '#AAAAAA',
        '8': '#555555', '9': '#5555FF', 'a': '#55FF55', 'b': '#55FFFF',
        'c': '#FF5555', 'd': '#FF55FF', 'e': '#FFFF55', 'f': '#FFFFFF'
    };

    // Pomocná funkcia na spracovanie jednej časti JSONu
    function processPart(part) {
        if (typeof part === 'string') {
            return `<span>${part}</span>`;
        }

        let text = part.text || "";
        let style = "";

        // Priradenie farby
        if (part.color) {
            const hex = colorMap[part.color.toLowerCase()] || part.color;
            style += `color: ${hex};`;
        }

        // Štýly písma
        if (part.bold) style += "font-weight: bold;";
        if (part.italic) style += "font-style: italic;";
        if (part.underlined) style += "text-decoration: underline;";
        if (part.strikethrough) style += "text-decoration: line-through;";

        let html = `<span style="${style}">${text}</span>`;

        // Ak má časť v sebe ďalšie časti (extra)
        if (part.extra && Array.isArray(part.extra)) {
            part.extra.forEach(extraPart => {
                html += processPart(extraPart);
            });
        }

        return html;
    }

    // Ak je to už hotový objekt (JSON)
    if (typeof motd === 'object') {
        return processPart(motd);
    }

    // Fallback: Ak je to starý formát so znakom § (String)
    let parts = motd.split('§');
    let result = "";
    let currentColor = "#7e7e7e";

    parts.forEach((part, index) => {
        if (index === 0 && !motd.startsWith('§')) {
            result += `<span>${part}</span>`;
            return;
        }
        let code = part.charAt(0).toLowerCase();
        let content = part.substring(1);
        if (colorMap[code]) currentColor = colorMap[code];
        
        let style = `color: ${currentColor};`;
        if (code === 'l') style += "font-weight: bold;";
        if (code === 'r') { currentColor = "#7e7e7e"; style = ""; }

        result += `<span style="${style}">${content}</span>`;
    });

    return result;
}

// actual code
async function updateStatus(ip, port) {
    try {
        // Posielame IP a PORT ako argumenty v URL
        let response;
        if (DebugAPIConnect === false) {
            response = await fetch(`http://192.168.1.192:3001/ping?ip=${ip}&port=${port}`);
        }else{
            response = await fetch(`http://localhost:3001/ping?ip=${ip}&port=${port}`);
        }
        const data = await response.json();

        const cardEL = document.getElementById('mc-status-card');
        const statusEl = document.getElementById('status-text');
        const playersEl = document.getElementById('player-count');
        const nameEl = document.getElementById('server-name');
        const versionEl = document.getElementById('server-version');
        const motdEL = document.getElementById('server-motd');
        const listEL = document.getElementById('player-list');
        const iconEl = document.getElementById('server-icon');
        // Aktualizujeme názov servera v nadpise
        nameEl.innerText = ip;
        
        // image Stuff
            iconEl.src = icoip // Default placeholder
            cardEL.style.backgroundImage = `url('${icoip}')`;
            // fallback ak obrázok neexistuje / zlyhá načítanie
            iconEl.onerror = () => {
                iconEl.src = icoip;
                cardEL.style.backgroundImage = `url('${icoip}')`;
            };
            // nastavý default na actual icon (ak nijaký je)
            if (data.icon && data.icon.length > 100) {
                iconEl.src = data.icon;
                cardEL.style.backgroundImage = `url('${data.icon}')`;
            }
        // end of image stuff

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
            motdEL.innerHTML = parseMinecraftMotd(data.motd);
            playersEl.innerText = `${data.players} / ${data.max}`;
            if (data.playerList.length > 0) {
                //zmazať starý zoznam
                listEL.innerHTML = "";
                // každé meno má <li>
                data.playerList.forEach(playerName => {
                    const li = document.createElement('li');
                    li.innerHTML = parseMinecraftMotd(playerName);
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

// Automatická aktualizácia každých 15 sekúnd
setInterval(() => updateStatus(TARGET_IP, TARGET_PORT), 15000);
