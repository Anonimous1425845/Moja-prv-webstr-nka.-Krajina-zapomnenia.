// Websocket chat api to avoid dirrect connection and IP Fishing
// Runs on 4000 and uses json to comunicate
const wss = require('ws');
const formatedDate = require('../../js/lil/date');
// import { formatedDateJSON } from '../../js/lil/date'
const WS = new wss.Server({ port: 4000 });

// connection
WS.on('connection', (ws, req) => {
    //const idr = Math.floor(Math.random * 100000000) + 1;
    //let id = `ID: ${idr}`;
    let id = req.socket.remoteAddress
    console.log(`[Connector] Someonee connected from: ${id}.`);
    // reciver
    ws.on('message', (messageraw) => {
        try {
            const message = messageraw.toString();
            const data = JSON.parse(message);

            if (data.type === 'ping') {
                if (data.ping === 'ping') {
                    ws.send(
                        JSON.stringify({
                            type: 'pong',
                            pong: 'pong',
                            time: formatedDate()
                        })
                    );
                };
                if (data.ping === 'health') {
                    ws.send(
                        JSON.stringify({
                            online: true,
                            time: formatedDate()
                        })
                    );
                };
            };

            if (data.type === 'setnick') {
                // setter
                ws.nickname = data.nick;
                id = data.nick;
                
                // Welcome to the internet!
                WS.clients.forEach((client) => {
                    if (client.readyState === 1) {
                        // sender-all joined
                        client.send(JSON.stringify({
                            type: 'sobytiye',
                            msg: `${id} Joined the chat!`,
                            time: formatedDate()
                        }));
                    }
                });

                // sender
                ws.send(JSON.stringify({
                    type: 'response',
                    msg: 'Nickname has been set to ' + ws.nickname + '. And you are inside chat now!',
                    time: formatedDate()
                }));
            }

            // Only handle real chat messages (type === 'msg').
            // Avoid treating other message types (like 'setnick') as chat messages,
            // which previously caused broadcasts with `msg: undefined`.
            if (data.type === 'msg') {
                const nickToUse = ws.nickname || id;
                // GPT-5 mini helped fix this bug
                const text = typeof data.msg === 'undefined' ? '' : data.msg;
                console.log(`[${nickToUse}] ${text}`);
                WS.clients.forEach((client) => {
                    // sender-all
                    if (client.readyState === 1) {
                        // sender (master message handler)
                        client.send(JSON.stringify({
                            type: 'msg',
                            nick: nickToUse,
                            msg: text,
                            time: formatedDate()
                        }));
                    }
                });
            }
        } catch (error) {
            // womp womp
            console.log(`[${id}] Got invalid JSON ${error}`);
            try {   
                ws.send(JSON.stringify({
                    type: 'ERROR',
                    msg: 'You send invalid request'
                }))
            } catch (e) {}
        }
    })
    // he left did you seen him?!
    ws.on('close', () => {
        console.log(`[${id}] Has left the chat!`)
        WS.clients.forEach((client) => {
            if (client.readyState === 1) {
                // sender-all left
                client.send(JSON.stringify({
                    type: 'sobytiye',
                    msg: `${id} Has left the chat!`,
                    time: formatedDate()
                }));
            }
        });
    });
});

/*
WS.on('message', (message) => {
    const data = JSON.prase(message);
    console.log(data)
})
*/

console.log("Runnin' Chat Web Socket API on :4000");;