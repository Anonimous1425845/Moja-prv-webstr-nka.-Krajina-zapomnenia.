// slider functions
function functionForOn() {
    document.body.style.backgroundColor = 'rgb(190, 190, 190)';
    document.body.style.color = 'rgb(32, 32, 32)'
}
function functionForOff() {
    document.body.style.backgroundColor = 'rgb(32, 32, 32)'
    document.body.style.color = 'rgb(190, 190, 190)'
}

//api ping
const pingapi = 'http://192.168.1.192:3000/ping'
const ping = document.getElementById('ping-stat')
const mcping = document.getElementById('mcping-stat')

async function pinging(write,where,com){
    const to = write
    try{
        const response = await fetch(pingapi + '?url=' + where);
        const data = await response.json();

        if(data.status === 'online'){
            to.innerText = com + ' ' + 'Okiee :)'
        }else{
            to.innerText = com + ' ' + 'Down :('
        }
    }catch (error){
        console.log('pripojenie k node.js nebolo možné pre ping tool');
        to.innerText = com + ' down! Check F12'
    }
}

pinging(ping,pingapi,'main')
pinging(mcping,'http://192.168.1.192:3001/ping','mc api')