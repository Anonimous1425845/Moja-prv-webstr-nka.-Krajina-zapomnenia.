function getHostname(){return window.location.host;}
function getFilenameFromDisposition(disposition) {
    if (!disposition) return null;

    // 1) filename*=UTF-8''nazov
    const utf8 = disposition.match(/filename\*\=UTF-8''([^;]+)/i);
    if (utf8) return decodeURIComponent(utf8[1]);

    // 2) filename="nazov"
    const ascii = disposition.match(/filename="([^"]+)"/i);
    if (ascii) return ascii[1];

    return null;
}

async function Start() {
//    const api = 'http://192.168.1.192:3002';
    const host = getHostname();
    const api = `http://${host}:3002`;
    const parms = new URLSearchParams(window.location.search);
    const videoUrl = parms.get('url');
    const videoType = parms.get('video');

    console.log(host, api, parms, videoUrl, videoType);
    
    const url = videoType
        ? `${api}/yt-dlp/download?video=${videoType}&url=${encodeURIComponent(videoUrl)}`
        : `${api}/yt-dlp/download?url=${encodeURIComponent(videoUrl)}`;

    const response = await fetch(url);

    console.log(url);
    console.log(response);
    
    if (!response.ok) {
        const err = await response.json().catch(() => null);
        console.error("Chyba:", err);
        alert(err?.error || "Nepodarilo sa stiahnuť súbor.");
        return;
    }

    // Získanie názvu súboru z Content-Disposition
    const disposition = response.headers.get("Content-Disposition");
    let filename = getFilenameFromDisposition(disposition) || `video.webm`;

    // Prevod streamu na blob
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    // Vytvorenie download linku
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();

    // Upratanie
    a.remove();
    window.URL.revokeObjectURL(blobUrl);
}
