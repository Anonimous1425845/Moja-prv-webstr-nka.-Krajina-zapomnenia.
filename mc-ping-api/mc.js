const express = require('express');
const mc = require('mc-server-status');
const cors = require('cors');
const app = express();
// This is version one of mc-ping api using mc-server-status libary.

app.use(cors());

app.get('/ping', (req, res) => {
    console.log('------------------------')
    // Získame IP a PORT z adresy, ak tam nie sú, použijeme predvolené
    const serverIP = req.query.ip;
    const serverPort = parseInt(req.query.port) || 25565;

    console.log(`[${serverIP}] Ping of server on ${serverIP}:${serverPort} just been requested!`);
    if (!serverIP) {
        console.log(`[${serverIP}] User requested request wihnout an IP! What a dumass!`);
        return res.json({ online: false, message: "Musíš zadať IP adresu (?ip=...)" });
    }
    // log all ips and if them been succesfull
    console.log(`[${serverIP}] Server ${serverIP} passed request validity test.`)

    mc.getStatus(serverIP, serverPort)
        .then(result => {
            res.json({
                online: true,
                server: serverIP,
                icon: result.favicon || null,  // Vrátia null ak nemá ikonu
                players: result.players.online,
                max: result.players.max,
                version: result.version.name,
                motd: result.description.text || result.description,
                playerList: result.players.sample ? result.players.sample.map(p => p.name) : []
            });
            console.log(`[${serverIP}] Request under ${serverIP} Just suceeded!`);
        })
        .catch(err => {
            res.json({ online: false, message: "Server nedostupný" });
            console.warn(`[${serverIP}] API just failed to get data from ${serverIP}, this can be human error or error in the api.`);
            console.warn(`[${serverIP}] Or the server is just unreachable!`);
        });
});

app.listen(3001, () => {
    console.log('--- Minecraft Ping Status ---');
    console.log('Súbor: mc.js');
    console.log('API beží na http://localhost:3001/ping');
    console.log('Zavrieš ma pomocou CTRL+C');
});