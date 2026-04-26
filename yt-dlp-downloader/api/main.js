const { spawn, execSync } = require('child_process');
const express = require('express');
const cors = require('cors');
const util = require('node:util');
const { log } = require('node:console');
const { spawnSync } = require('node:child_process');
const exec = util.promisify(require('node:child_process').exec);

const app = express();
const PORT = 3002;

app.use(cors());

// shared code
// start processing
// OLD (Legacy)
const getF = (fraw) => {
    // 0. Spracovanie f flagu
    // ak je audio
    if (fraw === '0' || fraw === undefined) return 'bestaudio';
    if (fraw === '1') return 'best';
    return null;
}

app.get('/yt-dlp/old', async (req, res) => {
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

app.get('/yt-dlp/old/download', async (req, res) => {
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

// NEW
// Endpoint zavoláš takto: http://localhost:3002/yt-dlp?video=1or0&url=SEM_DAJ_YOUTUBE_LINK
app.get('/yt-dlp', async (req, res) => {
    const fraw = req.query.video;
    const videoUrl = req.query.url;
    let f = getF(fraw);
    if(f === 'best'){
        f = 'best[ext=mp4][url!*=.m3u8]';
    }else if(f === 'bestaudio'){
        f = 'ba';
    } else {
        res.status(500).json({
            success: false,
            message: 'Error at the f processing at endpoint'
        });
    }

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
            const { stdout, stderr } = await exec(`yt-dlp --js-runtimes deno --force-overwrites --no-playlist --prefer-free-formats -f ${f} -g "${videoUrl.replace(/"/g, '')}"`);

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
    let f = getF(fraw);

    let yt_dlp_args = [
        "--js-runtimes", "deno", "--extractor-args"
    ];
    
    let extension;
    if(f === 'best'){
        yt_dlp_args.push("youtube:player_client=web", "-f", "best[ext=mp4]", "-o", "-");
        extension = 'mp4';
        console.log('this time video');
    }
    else if(f === 'bestaudio'){
        yt_dlp_args.push("youtube:player_client=web", "-f", "bestaudio[ext=m4a]/bestaudio[ext=webm]/bestaudio/best", "-o", "-");
        extension = 'mp3';
        console.log('this time audio');
    }
    else {
        return res.status(500).json({
            success: false,
            message: 'Error at the f processing at endpoint'
        });
    }

    if(!f){
        console.log('download: video request has been f_ked up!');
        return res.status(400).json({ success: false, error: "Parameter 'video' must be 0 or 1 or don't define it!" });
    }; // Ak je f invalid, pošle sa json error msg a už sa nepokračuje

    try{
        console.log('download: start of download accured.');

        // Získanie informácií v JSON formáte (samostatný dump, bez extra args)
        let fName = 'download'; // default
        let origExt = null;
        try {
            const info = JSON.parse(execSync(`yt-dlp --dump-json "${videoUrl.replace(/"/g, '')}"`));
            fName = info.title || fName;
            origExt = info.ext || null;
        } catch (infoError) {
            console.warn('download: failed to get info, using default filename:', infoError.message);
        }

        // const extension = info.ext; // napr. 'webm', 'mkv', 'mp4'
        // const mimeType = (f === 'best') ? `video/${extension}` : `audio/${extension}`;

        // If extension wasn't determined earlier, pick sensible default
        if (!extension) {
            if (f === 'best') extension = origExt || 'mp4';
            else if (f === 'bestaudio') extension = 'mp3';
            else extension = origExt || 'bin';
        }

        // Nastavovanie hlavičiek pre stiahnutie a názov
        const rawName = fName.replace(/[/\\?%*:|"<>]/g, "_");

        // ASCII fallback (bez diakritiky)
        const safeAscii = rawName
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");

        // UTF‑8 verzia
        const utf8Name = encodeURIComponent(rawName);
        
                res.setHeader("Access-Control-Expose-Headers", "Content-Disposition");
                // správny Content-Type podľa prípony
                const contentType = (extension === 'mp3') ? 'audio/mpeg' : (extension === 'mp4' ? 'video/mp4' : 'application/octet-stream');
                res.setHeader('Content-Type', contentType);
                res.setHeader(
                    "Content-Disposition",
                    `attachment; filename="${safeAscii}.${extension}"; filename*=UTF-8''${utf8Name}.${extension}`
                );

        console.log('download: streaming file for download called',rawName,'.',extension);

        // RUN
        if (f === 'best') {
            yt_dlp_args.push(videoUrl);
            console.log('spawning yt-dlp (video):', yt_dlp_args);
            const ytdlp = spawn("yt-dlp", yt_dlp_args);
            ytdlp.stderr.on('data', (data) => console.log('yt-dlp stderr:', data.toString()));
            ytdlp.stdout.pipe(res);

            ytdlp.on("close", code => {
                console.log("download: yt-dlp finished with code:", code);
                res.end();
            });

        } else if (f === 'bestaudio') {
            // For audio: stream best audio from yt-dlp to ffmpeg for conversion to mp3
            // Build yt-dlp args to output raw audio bytes to stdout
            yt_dlp_args.push(videoUrl);
            console.log('spawning yt-dlp (audio):', yt_dlp_args);
            const ytdlp = spawn('yt-dlp', yt_dlp_args);

            // Spawn ffmpeg to convert incoming stream to mp3
            const ffmpegArgs = [
                "-hide_banner",
                "-loglevel", "error",
                "-i", "pipe:0",
                "-vn",
                "-c:a", "libmp3lame",
                "-b:a", "192k",
                '-f', 'mp3',
                "pipe:1"
            ];
            console.log('spawning ffmpeg:', ffmpegArgs);
            const ff = spawn('ffmpeg', ffmpegArgs);

            let ytFailed = false;
            ytdlp.stderr.on('data', (d) => {
                const msg = d.toString();
                console.log('yt,dlp stderr:', msg);

                if (msg.includes("Requested format is not available")) {
                    ytFailed = true;

                    console.log("yt-dlp failed → killing ffmpeg");

                    try { ytdlp.kill(); } catch {}
                    try { ff.kill(); } catch {}

                    if (!res.headersSent) {
                        res.status(500).end("No audio stream available");
                    }
                }
            });

            // Pipe yt-dlp stdout into ffmpeg stdin, then ffmpeg stdout to response
            ytdlp.stdout.pipe(ff.stdin);
            ff.stdout.pipe(res);

            ff.stderr.on('data', (d) => console.log('ffmpeg stderr:', d.toString()));

            ff.on('close', (code) => {
                console.log('ffmpeg finished with code:', code);
                if (!ytFailed) res.end();
            });

            ytdlp.on('error', (err) => console.error('yt-dlp spawn error:', err));
            ff.on('error', (err) => console.error('ffmpeg spawn error:', err));
        }

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
        return res.status(500).json({ 
            success: false, 
            error: "Server momentálne nedokáže spracovať toto video. Skúste to neskôr.!!!!"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server beží na http://localhost:${PORT}`);
});