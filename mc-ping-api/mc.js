const express = require('express');
const mc = require('mc-server-status');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/ping', (req, res) => {
    // Získame IP a PORT z adresy, ak tam nie sú, použijeme predvolené
    const serverIP = req.query.ip;
    const serverPort = parseInt(req.query.port) || 25565;

    if (!serverIP) {
        return res.json({ online: false, message: "Musíš zadať IP adresu (?ip=...)" });
    }

    mc.getStatus(serverIP, serverPort)
        .then(result => {
            res.json({
                online: true,
                server: serverIP,
                players: result.players.online,
                max: result.players.max,
                version: result.version.name
            });
        })
        .catch(err => {
            res.json({ online: false, message: "Server nedostupný" });
        });
});

app.listen(3000, () => {
    console.log('--- Minecraft Ping Status ---');
    console.log('Súbor: mc.js');
    console.log('API beží na http://localhost:3000/ping');
    console.log('Zavrieš ma pomocou CTRL+C');
});