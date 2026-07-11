// client side sender and reciever
const port = 4000;
const hostt = "vs.runner.net";
const Nick = new URLSearchParams(window.location.search).get('nick');
let WS = new WebSocket(`ws://${hostt}:${port}`);

const msgEL = document.getElementById('msg');
const openEL = document.getElementById('isopen');
const pingEL = document.getElementById('pingEL');
const pongEL = document.getElementById('pongEL');
const mayDontDeleteEL = document.getElementById('mayDontDelete');

function FINEopen(what) {
    if (what === true) {
        openEL.style.color = 'rgb(0, 255, 0)';
        openEL.innerText = 'true';
        return 0;
    }
    if (what === false) {
        openEL.style.color = 'red';
        openEL.innerText = 'false';
        return 0;
    }
    console.error("FINEopen didnot catch this parameter " + what);
    return 1;
};

function PingSTAT(what) {
    pingEL.style.color = what;
    return;
}
function PongSTAT(what) {
    pongEL.style.color = what;
    return;
}

function PingPong() {
    if(pingEL.style.color !== 'blue'){
        PingSTAT('blue');
        WS.send(
            JSON.stringify({
                type: 'ping',
                ping: 'ping'
            })
        );
        PongSTAT('blue');
    } else {
        PingSTAT('red');
        FINEopen(false);
        PongSTAT('red');
        
    }
    return 0;
};

// for reconnect this to 107 needs to be in function with new WS(..) as well
WS.onopen = () => {
    console.log("Connected to WebSocket");
    PingPong();
    FINEopen(true);
    WS.send(JSON.stringify({
        type: 'setnick',
        nick: Nick
    }));
    console.log('Nick Set');
}

// Inbound messages processor
WS.onmessage = (event) => {
    FINEopen(true);
    const data = JSON.parse(event.data);
    if(data.type === 'pong') {
        PingSTAT('rgb(0, 255, 0)');
        FINEopen(true);
        PongSTAT('rgb(0, 255, 0)');
    };

    if(data.type === 'response') {
        alert(data.msg + ' ' + data.time);
        return;
    };

    if(data.type === 'sobytiye') {
        msgEL.insertAdjacentHTML("beforeend", `
            <p>${data.msg} at ${data.time}</p>
            <p>-------------------</p>
        `);
        return;
    };

    if(data.type === 'msg') {
        msgEL.insertAdjacentHTML("beforeend", `
            <div class="messageclass" >
            <p style="text-align: right; text-decoration: underline;">${data.time}
            <p>${data.nick} :  ${data.msg}</p>
            </div>
            <p>-------------------</p>
        `);
        return;
    };

    if(data.type === 'ERROR') {
        alert('ERROR: ' + data.msg);
        console.error(data.msg);
        return;
    };
};

// Outbound Messeges Sender Functions
function SendMSG(msgIN) {
    console.log('sending', msgIN)
    if(WS && WS.readyState === 1) {
        console.log('sendin')
        WS.send(JSON.stringify({
            type: 'msg',
            msg: msgIN
        }));
        FINEopen(true);
        if(!mayDontDeleteEL.checked){
            document.getElementById('messageinput').value = '';
        }
    } else {
        console.error('Socket not open');
        FINEopen(false)
    }
};

setInterval(() => {
    PingPong();
}, 3000);

// priviat moscow
// znaajece zlak sje hutory što russia nezprobuje songy 
// ale oni maju fajne songy debili