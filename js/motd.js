import { getHostname } from './lil/get-host.js';
let Hostname;
try{
    Hostname = getHostname();
} catch(e) {
    Hostname = e;
};

// Simple dependencie test
if(Hostname){
    console.log('motd requirments satisfied');
} else {
    console.warn('motd requirments not satisfied!\n' + Hostname);
};

async function motd(whereid){
    const goTowindow = document.getElementById(whereid);
    try{
        const thejson = await fetch(`http://${Hostname}:3003/select?t=motd`);
        // const thejson = await fetch('../json/nonupload/dummymotddb.json');
        const data = await thejson.json();

        const idread = data.data.map(item => item.id);
        console.log('What IDs are valid: ', idread);

        const randomid = idread[Math.floor(Math.random() * idread.length)];
        const selected = data.data.find(item => item.id === randomid);

        if (selected){
            let showThis;
            if (selected.creator) {
                showThis = `${selected.motd}   -${selected.creator}`;
            } else {
                showThis = `${selected.motd}   -Unsigined.`;
            };
            goTowindow.textContent = showThis;
            console.log('motd succesfull.');
        }else{
            goTowindow.textContent = 'motd failed at insert';
            console.log('motd failed at insert');
        };
    }catch(err){
        console.error('Motd Failed!\n' + err);
        goTowindow.textContent = 'Motd Failed! Refer to D0n!\n' + err;
    };
};
motd('motd');