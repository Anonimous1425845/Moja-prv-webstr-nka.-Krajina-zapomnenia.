const { spawn, execSync } = require('child_process');
const express = require('express');
const cors = require('cors');
const util = require('node:util');
const { log } = require('node:console');
const exec = util.promisify(require('node:child_process').exec);

const app = express();
const PORT = 3002;

app.use(cors());

// shared code
// start processing

const getF = (fraw) => {
    // 0. Spracovanie f flagu
    // ak je audio
    if (fraw === '0' || fraw === undefined) return 'bestaudio';
    if (fraw === '1') return 'best';
    return null;
}


// Endpoint zavoláš takto: http://localhost:3002/yt-dlp?video=1or0&url=SEM_DAJ_YOUTUBE_LINK
app.get('/yt-dlp', async (req, res) => {
    const fraw = req.query.video;
    const videoUrl = req.query.url;
    const f = getF(fraw);

    if(videoUrl !== undefined){
        console.log('stream: a new stream has started to be seached.');

        if(!f){
            console.log('stream: video request just been f_ked up!');
            return res.status(400).json({ success: false, error: "Parameter 'audio' must be 0 or 1 or don't define it!" });
        }; // Ak je f null, pošle sa json error msg a už sa nepokračuje

        // 1. Základná kontrola, či používateľ poslal URL
        // if (!videoUrl) {
        //     return res.status(400).json({ success: false, error: "Parameter 'url' missing" });
        // }

        try {
            console.log('stream: started search for the stream');
            // 2. Vykonanie príkazu
            // Používame double quotes a escapovanie pre základnú bezpečnosť
            const { stdout, stderr } = await exec(`yt-dlp -f ${f} -g "${videoUrl.replace(/"/g, '')}"`);

            if (stderr) {
                console.warn('stream: yt-dlp stderr:', stderr);
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
            console.log('stream: this api just failed!!!');
        }
    } else {
        res.json({
            succes: false,
            error: 'url is not defined'
        })
        console.log('all: ping of this api accured!');
    }
});

//sekcia pre file download
// Endpoint zavoláš takto: http://localhost:3002/yt-dlp/download?video=1or0&url=SEM_DAJ_YOUTUBE_LINK
app.get('/yt-dlp/download', async (req, res) => {
    console.log('download: new request.');
    const fraw = req.query.video;
    const videoUrl = req.query.url;
    const recodetipe = req.query.recode;
    const f = getF(fraw);

    if(!recodetipe){
        console.log('download: video request has been f_ked up!');
    }
    if(!f){
        console.log('download: video request has been f_ked up!');
        return res.status(400).json({ success: false, error: "Parameter 'video' must be 0 or 1 or don't define it!" });
    }; // Ak je f null, pošle sa json error msg a už sa nepokračuje

    try{
        console.log('download: start of download accured.');

        // Získanie informácií v JSON formáte
        const info = JSON.parse(execSync(`yt-dlp --dump-json -f "${f}" "${videoUrl.replace(/"/g, '')}"`));

        // ziskavanie nazvu súboru
        const fName = info.title;
        const extension = info.ext; // napr. 'webm', 'mkv', 'mp4'
        const mimeType = (f === 'best') ? `video/${extension}` : `audio/${extension}`;

        // Nastavovanie hlavičiek pre stiahnutie a názov
        const rawName = fName.replace(/[/\\?%*:|"<>]/g, "_");

        // ASCII fallback (bez diakritiky)
        const safeAscii = rawName
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");

        // UTF‑8 verzia
        const utf8Name = encodeURIComponent(rawName);
        
        res.setHeader("Access-Control-Expose-Headers", "Content-Disposition");
        res.setHeader(
          "Content-Disposition",
          `attachment; filename="${safeAscii}.${extension}"; filename*=UTF-8''${utf8Name}.${extension}`
        );

        console.log('download: streaming file for download called',rawName,'.',extension);

        // RUN
        const ytdlp = spawn('yt-dlp', ['-f', f, '-o', '-', videoUrl]);
        ytdlp.stdout.pipe(res);
        console.log('download: Done');

        // Dobrý zvyk: ošetriť ukončenie spawn procesu
        ytdlp.on('error', (err) => console.error("download: Spawn error:", err));

    } catch(error) {

        // 1. Zalógovanie chyby do konzoly servera (aby si vedel, čo sa deje)
        console.error("download: YT-DLP Error:", error.message);

        // 2. Kontrola, či už náhodou neboli odoslané hlavičky (prevencia pádu Node.js)
        if (res.headersSent) {
            return res.end();
        }

        // 3. Rozlíšenie typu chyby a odpoveď klientovi
        if (error.message.includes('Incomplete YouTube ID') || error.message.includes('Video unavailable')) {
            return res.status(400).json({ 
             success: false, 
                error: "Neplatná URL alebo video nie je dostupné (súkromné/zmazané)." 
            });
        }

        // Všeobecná chyba (napr. problém s FFmpeg alebo sieťou)
        res.status(500).json({ 
            success: false, 
            error: "Server momentálne nedokáže spracovať toto video. Skúste to neskôr." 
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server beží na http://localhost:${PORT}`);
});