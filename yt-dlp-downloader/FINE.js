const parms = new URLSearchParams(window.location.search);
const display = document.getElementById('stream');
const rwurl = parms.get('url');
const hostname = getHostname();

const DebugAPIConnect = false

async function go(url) {
    try{
    const response = await fetch(`http://${hostname}:3002/yt-dlp?url=${url}`);
//    let response;
//    if (DebugAPIConnect === false) {
//        response = await fetch(`http://192.168.1.192:3002/yt-dlp?url=${url}`);
//    }else{
//        response = await fetch(`http://localhost:3002/yt-dlp?url=${url}`);
//    }

    const data = await response.json();
    const result = data['url'];
    display.textContent = result
    msg('Link arrived')

    }catch(error){
        display.textContent = 'API Error'
    }
}

go(rwurl)

// copies the current text of the #stream element to the clipboard
// call from a button: <button onclick="copyStream()">Copy</button>
function copyLink() {
    // grab the element that contains the result text
    const el = document.getElementById('stream');
    if (!el) {
        console.warn('copyStream: #stream element not found');
        return;
    }
    // use textContent (paragraph) instead of .value (inputs only)
    const text = el.textContent || '';
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            alert('Text bol skopírovaný!');
        }).catch(err => {
            console.error('Chyba pri kopírovaní: ', err);
        });
    } else {
        // fallback for insecure contexts or older browsers
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        try {
            document.execCommand('copy');
            alert('Text bol skopírovaný!');
        } catch (err) {
            console.error('Fallback copy failed:', err);
            alert('Kopírovanie nie je podporované');
        }
        document.body.removeChild(ta);
    }
}