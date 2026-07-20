// Registers id for spam element for title
let titleEL;
function RegisterTitleEL(ID) {
    titleEL = document.getElementById(ID);
    title_Run();
};

async function Radio_Run() {
    try {
        const RadioEL = document.createElement('audio');
        RadioEL.id = 'radioEL';
        RadioEL.autoplay = true;
        RadioEL.src = `http://${window.location.hostname}:8000/rus?cb=${new Date().getTime()}`;
        document.body.append(RadioEL);
    } catch (err) {
        if (typeof msg === 'function') {
            msg(err);
        } else {
            alert(err);
        };
    };
};
async function Radio_Stop() {
    try {
        document.getElementById('radioEL').remove();
    } catch (err) {
        if (typeof msg === 'function') {
            msg(err);
        } else {
            alert(err);
        }
    }
}
async function title_Run() {
    if (!titleEL) {return};
    // NOW ONLY SINGLE SOURCE
    const data = await fetch('http://localhost:8000/status-json.xsl');
    const prased = await data.json();
    titleEL.innerText = prased.icestats.source.metadata.x_icy_title;
}
setInterval(async () =>  {
    title_Run();
}, 5000);
