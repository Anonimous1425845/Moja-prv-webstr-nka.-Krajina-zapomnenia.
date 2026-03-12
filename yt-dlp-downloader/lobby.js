// Quick example integration using createSlider()
// This runs after slider.js and lobby.js; it overrides FINE() with a safe implementation.
if (typeof createSlider === 'function') {
    createSlider('myToggle', {
        showStateText: true,
        on: () => console.log('Slider: ON (download)'),
        off: () => console.log('Slider: OFF (stream)')
    });
}

let downloadMode;

// Simple FINE() implementation (overrides any broken one in lobby.js)
function FINE(){
    const input = document.getElementById('in');
    const toggle = document.getElementById('myToggle');
    if(!input){ msg('Chýba input #in'); return; }
    const url = input.value.trim();
    if(!url){ msg('Vložte YouTube odkaz.'); return; }
    downloadMode = toggle ? !!toggle.checked : false;
    if(downloadMode){
        // Download file version
        const goto = './download.html?url=' + url;
        window.location.href = goto;
    } else {
        // Stream link find mode
        const goip = './FINE.html?url=' + url;
        window.location.href = goip;
    }
}

// Enter key tweak
window.addEventListener('keydown', (enter) => {
    if (enter.key === 'Enter') {
        FINE();
    }
});