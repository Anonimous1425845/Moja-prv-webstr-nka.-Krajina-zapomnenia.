// basic
const host = window.location.hostname;
// fetche
// dwd = dynmap world json
async function GETDWJ(world){
    const dwjrw = await fetch(`http://${host}/map-api/up/world/${world}/${Date.now()}`);
    const dwj = await dwjrw.json();
    return dwj;
}
function VipocitajCas(tick){
    // Sprecujeme ticky na in-game čas
    // pridať 6000 tickov lebo 0 tickov je 6:00 ráno
    let finetick = (tick + 6000) % 24000;
    // 1h = 1000 tickov
    let hodiny = Math.floor(finetick / 1000);
    // 1m = 50 tickov
    let minuty = Math.floor((finetick % 1000) / 50);
    // vraťi fajnovy čas
    return `${hodiny}:${minuty.toString().padStart(2, '0')}`;
}
// stat
const statusEL = document.getElementById('stat');
// casy
const worldTimeEL = document.getElementById('worldtime');
const netherTimeEL = document.getElementById('nethertime');
const endTimeEL = document.getElementById('endtime');
// pocasie
const pocasieEL = document.getElementById('pocasi');
// online let's
let data;
// globalne časy
let wtimerw;
let ntimerw;
let etimerw;
// globalne pocasie
let pocasie = 'Jasné, miestami oblačno';
let pocasiefarba = '#68bfdc';
async function FINE(debug) {
    // fetchneme si api čo robi mc handshake či server vôbec beží a ešťe nijaké data
    const datarw = await fetch(`http://${host}:3001/ping?ip=${host}&port=25565`);
    data = await datarw.json();
    //let data = {};
    //if(debug){
    //    data.online = debug;
    //}
    if(data.online){
        // už vieme že server ide teraz získam dáta o čase a počasí
        let wdwj = await GETDWJ('world');
        let ndwj = await GETDWJ('DIM-1');
        let edwj = await GETDWJ('DIM1');
        // dobre mame data začnime vkladať
        statusEL.innerText = 'ONLINE! :D';
        statusEL.style.color = 'green';
        // casy
        wtimerw = wdwj.servertime;
        ntimerw = ndwj.servertime;
        etimerw = edwj.servertime;
        const wtime = VipocitajCas(wtimerw);
        const ntime = VipocitajCas(ntimerw);
        const etime = VipocitajCas(etimerw);
        worldTimeEL.innerText = wtime;
        netherTimeEL.innerText = ntime;
        endTimeEL.innerText = etime;
        // pocasie
        if(wdwj.hasStorm){
            pocasie = 'Prší | Sňeží';
            pocasiefarba = '#3778ad';
        }
        if(wdwj.isThundering) {
            pocasie = 'Búrka';
            pocasiefarba = '#022d52';
        }
        pocasieEL.innerText = pocasie;
        pocasieEL.style.color = pocasiefarba;
        // logging
        console.log(VipocitajCas(wdwj.servertime),VipocitajCas(ndwj.servertime),VipocitajCas(edwj.servertime));
        console.log(wdwj,ndwj,edwj);
    } else {
        statusEL.innerText = 'OFFLINE D:';
        statusEL.style.color = 'red';
        // casy
        worldTimeEL.innerText = 'off';
        worldTimeEL.style.color = 'red';
        netherTimeEL.innerText = 'off';
        netherTimeEL.style.color = 'red';
        endTimeEL.innerText = 'off';
        endTimeEL.style.color = 'red';
        // este pocasie sak je off ne?
        pocasieEL.innerText = 'off';
        pocasieEL.style.color = 'red';
    }
};
FINE();
setInterval(async () => {
    if(data.online) {
        // add
        wtimerw += 50;
        ntimerw += 50;
        etimerw += 50;
        // calc
        wtime = VipocitajCas(wtimerw);
        ntime = VipocitajCas(ntimerw);
        etime = VipocitajCas(etimerw);
        // write
        worldTimeEL.innerText = wtime;
        netherTimeEL.innerText = ntime;
        endTimeEL.innerText = etime;
    }
}, 2500);
setInterval(async () => {
    const datarw = await fetch(`http://${host}:3001/ping?ip=${host}&port=25565`);
    data = await datarw.json();
    if(data.online){
        pocasie = 'Jasné, miestami oblačno';
        pocasiefarba = '#68bfdc';
        // fresh jsonik
        const wdwj = await GETDWJ('world');
        // pocasie
        if(wdwj.hasStorm) {
            pocasie = 'Prší | Sňeží';
            pocasiefarba = '#3778ad';
        } else if(wdwj.isThundering) {
            pocasie = 'Búrka';
            pocasiefarba = '#022d52';
        }
        pocasieEL.innerText = pocasie;
        pocasieEL.style.color = pocasiefarba;
    } else {
        statusEL.innerText = 'OFFLINE D:';
        statusEL.style.color = 'red';
        // casy dame že už neplaťia
        worldTimeEL.innerText = 'off';
        worldTimeEL.style.color = 'red';
        netherTimeEL.innerText = 'off';
        netherTimeEL.style.color = 'red';
        endTimeEL.innerText = 'off';
        endTimeEL.style.color = 'red';
        // este pocasie sak je off ne?
        pocasieEL.innerText = 'off';
        pocasieEL.style.color = 'red';
    }
}, 15000);