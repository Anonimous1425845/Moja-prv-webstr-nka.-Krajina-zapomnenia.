if (!navigator.userAgent.toLowerCase().includes("firefox")) {
    alert("Táto stránka je stavaná na Firefoxe. Za bugy na iných prehliadačoch neručím!!!");
}

import { getHostname } from '../js/lil/get-host.js';
const hostipadd = getHostname();

async function tododata(whereid,who){
    const goTowindow = document.getElementById(whereid);
    try{
        const raw = await fetch(`http://${hostipadd}:3003/select?t=todo${who}`);
        const data = await raw.json();

        data.data.forEach(item => {
            const block = document.createElement("div");
            const ggtime = item.timeadd.replace('-', '.').replace('-', '.').replace('T', ' ').replace('Z', ' ');

            block.innerHTML = `
                <p>${item.id}: ${item.todo}</p>
                <p>Pridané ${ggtime}</p>
                <p>--------------------</p>
            `;

            document.getElementById(whereid).appendChild(block);
        });
    }catch(err){
        console.error('fatal at data function');
        goTowindow = 'fatal at data function';
    }
}

tododata('eli','eli');
tododata('domi','domi');