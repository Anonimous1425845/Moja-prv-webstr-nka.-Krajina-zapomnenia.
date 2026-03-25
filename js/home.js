// Video handler
function NCSvideo(what){
    const id = document.getElementById('NCS');

    if(what === 'play'){
        id.play();
    }else if(what === 'pause'){
        id.pause();
    }else if(what === 'stop'){
        id.pause();
        id.currentTime = 0;
        id.load();
    }else if(what === 'download'){
        const down = document.createElement("a");
        down.href = '../assets/videos/sg/Mo-Falk-&-MADZI---Lets-Go-NCS-Remade.mp4';
        down.download = 'Mo Falk & MADZI - Lets Go [NCS Remade].mp4'
        down.click();
    }else{
        console.warn('did not get value so noting happend!');
    }
}

// slider functions - MUST be defined BEFORE initialization
function functionForOn() {
    console.log('[functionForOn] executing...');
    document.body.style.backgroundColor = 'rgb(190, 190, 190)';
    document.body.style.color = 'rgb(99, 99, 99)';
    document.getElementById('NCS').poster = "./assets/pictures/2021-dodge-charger.jpg";
    console.log('[functionForOn] styles applied');
}
function functionForOff() {
    console.log('[functionForOff] executing...');
    document.body.style.backgroundColor = 'rgb(32, 32, 32)';
    document.body.style.color = 'rgb(190, 190, 190)';
    document.getElementById('NCS').poster = "./assets/pictures/2021-dodge-challenger.jpg";
    console.log('[functionForOff] styles applied');
}

// Initialize slider to use theme toggle handlers.
// Must run IMMEDIATELY (before DOMContentLoaded auto-init) to set handlers
if(typeof createSlider === 'function'){
    console.log('[home] createSlider calling immediately');
    createSlider('myToggle', {
        showStateText: false,
        enableDoubleClick: false,
        on: functionForOn,
        off: functionForOff
    });
} else {
    // fallback: expose global function names for older slider implementations
    console.log('[home] createSlider not available yet, setting fallback');
    document.addEventListener('DOMContentLoaded', function(){
        if(typeof createSlider === 'function'){
            // attach theme handlers to slider with id 'myToggle'
            createSlider('myToggle', {
                showStateText: false,
                enableDoubleClick: false,
                on: functionForOn,
                off: functionForOff
            });
        }
        window.functionForOn = functionForOn;
        window.functionForOff = functionForOff;
    });
};


//api ping
const pingapi = 'http://192.168.1.192:3000/ping';
const ping = document.getElementById('ping-stat');
const mcping = document.getElementById('mcping-stat');
const yt_dlp = document.getElementById('yt-dlp-stat');

async function pinging(write,where,com,timeout){
    const to = write
    let goto
    try{
        if(timeout){
            goto = pingapi + '&timeout=' + timeout + '?url=' + where;
        } else {
            goto = pingapi + '?url=' + where;
        }
        const response = await fetch(goto);
        const data = await response.json();

        if(data.status === 'online'){
            to.innerText = com + ' ' + 'Okiee :)'
        }else{
            to.innerText = com + ' ' + 'Down :('
        }
    }catch (error){
        console.log('pripojenie k node.js nebolo možné pre ping tool');
        to.innerText = 'API down! Check F12'
    }
}

const serveradress = 'http://192.168.1.192:'

pinging(ping,pingapi,'main')
pinging(mcping,serveradress + '3001/ping','mc api')
pinging(yt_dlp,serveradress + '3002/yt-dlp','yt-dlp api',)