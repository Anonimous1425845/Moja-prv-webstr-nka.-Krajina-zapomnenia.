const Hostname = getHostname();
if(Hostname){
    console.log('motd requirments satisfied');
} else {
    console.warn('motd requirments not satisfied!');
}
async function motd(whereid){
    const goTowindow = document.getElementById(`${whereid}`);
    try{
        const thejson = await fetch(`http://${Hostname}:3003/select?t=motd`);
        const data = await thejson.json();

        const idread = data.data.map(item => item.id);
        console.log('What IDs are valid: ',idread);

        const randomid = idread[Math.floor(Math.random() * idread.length)];
        const selected = data.data.find(item => item.id === randomid);

        if (selected){
            const showThis = `${selected.motd}   -${selected.creator}`
            goTowindow.textContent = showThis;
            console.log('motd succesfull.');
        }else{
            goTowindow.textContent = 'motd failed at insert';
            console.log('motd failed at insert');
        }
    }catch(err){
        console.error('Motd Failed!');
        goTowindow.textContent = 'Motd Failed! Refer to D0n!';
    }
}
motd('motd');