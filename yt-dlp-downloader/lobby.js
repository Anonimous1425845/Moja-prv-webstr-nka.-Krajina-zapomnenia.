//api ping
const hostip = window.location.hostname;
const pingapi = `http://${hostip}:3000/ping`;
const ststustext = document.getElementById('status');

async function Updatestatus(){
    const to = ststustext;
    try{
        const where = hostip + ':3002/yt-dlp';
        const goto = pingapi + '?url=http://' + where;

        const response = await fetch(goto);
        const data = await response.json();

        if(data.status === 'online'){
            to.innerText = 'yt-dlp Online :)'
        }else{
            to.innerText = 'yt-dlp Down :('
        }
    }catch (error){
        console.log('pripojenie k node.js nebolo možné pre ping tool');
        to.innerText = 'API down! Check F12'
    }
}

Updatestatus()

// Quick example integration using createSlider()
// This runs after slider.js and lobby.js; it overrides FINE() with a safe implementation.
if (typeof createSlider === 'function') {
    createSlider('myToggle', {
        showStateText: true,
        on: () => console.log('Slider: ON (download)'),
        off: () => console.log('Slider: OFF (stream)')
    });
    createSlider('myToggle-video', {
        showStateText: true,
        on: () => console.log('video slider on'),
        off: () => console.log('video slider off')
    });
}

let downloadMode;

// Simple FINE() implementation (overrides any broken one in lobby.js)
function FINE(Legacy){
    const input = document.getElementById('in');
    const legacyinput = document.getElementById('normalin');
    const toggle = document.getElementById('myToggle');
    if(!Legacy){if(!input){ msg('Chýba input #in'); return; }}else{
    if(!legacyinput){ msg('Chíba input #normalin/legacy'); return; }}
    const url = input.value.trim();
    const legacyurl = legacyinput.value.trim();
    if(!Legacy){if(!url){ msg('Vložte YouTube odkaz.'); return; }}else{
    if(!legacyurl){ msg('Vložťe odkaz Podporovaný yt-dlp'); return; }}
    downloadMode = toggle ? !!toggle.checked : false;
    let goto = undefined;
    if(downloadMode){
        // Download file version
        if(Legacy !== undefined){
            goto = './download.html?url=' + url;
        } else {
            goto = './download.html?url=' + url + '&legacy=true';
        }
        window.location.href = goto;
    } else {
        // Stream link find mode
        if(Legacy !== undefined){
            goto = './FINE.html?url=' + url;
        } else {
            goto = './FINE.html?url=' + url + '&legacy=true';
        }
        window.location.href = goip;
    }
}

// Enter key tweak
window.addEventListener('keydown', (enter) => {
    if (enter.key === 'Enter') {
        FINE();
    }
});