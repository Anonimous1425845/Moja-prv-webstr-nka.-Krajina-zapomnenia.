const express = require('express');
const cors = require('cors');
const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);

const app = express();
const PORT = 3002;

app.use(cors());

// Endpoint zavoláš takto: http://localhost:3002/yt-dlp?url=SEM_DAJ_YOUTUBE_LINK
app.get('/yt-dlp', async (req, res) => {
    const fraw = req.query.video;
    const videoUrl = req.query.url;
    let f;

    // 0. Spracovanie f flagu
    // ak je audio
    if (fraw === '0' || fraw === undefined) {
        f = 'bestaudio';
    } else if (fraw === '1') {
        f = 'best';
    } else {
        return res.status(400).json({ success: false, error: "Parameter 'audio' must be 0 or 1 or don't define it!" });
    }

    // 1. Základná kontrola, či používateľ poslal URL
    // if (!videoUrl) {
    //     return res.status(400).json({ success: false, error: "Parameter 'url' missing" });
    // }

    if(videoUrl !== undefined){
        try {
            // 2. Vykonanie príkazu
            // Používame double quotes a escapovanie pre základnú bezpečnosť
            const { stdout, stderr } = await exec(`yt-dlp -f ${f} -g "${videoUrl.replace(/"/g, '')}"`);

            if (stderr) {
                console.warn('yt-dlp stderr:', stderr);
            }

            // 3. Odoslanie úspešnej odpovede
            res.json({
                success: true,
                url: stdout.trim()
            });
        }   catch (error) {
            // 4. Odoslanie chyby (napr. ak video neexistuje alebo yt-dlp zlyhá)
            res.status(500).json({
                success: false,
                error: error.message
            });
        }
    } else {
        res.json({
            succes: false,
            error: 'url is not defined'
        })
    }
});

app.listen(PORT, () => {
    console.log(`Server beží na http://localhost:${PORT}`);
});