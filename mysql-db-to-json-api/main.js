const dbcreadentials = require('./conect-conf');
const formatedDate = require('../js/lil/date');
const mysql = require('mysql2/promise');
const express = require('express');
const cors = require('cors');
const app = express();
exports.app = app;
const PORT = 3003;

app.use(cors());

// Ping response =D
app.get('/',
    async (req, res) => {
        res.json({
            online: true
        })
        console.log('Ping Handler: Ping Accured!')
    }
);

app.get('/select',
    async (req, res) => {
        const table = req.query.t;
        const Time = formatedDate();
        try{
            const connection = await mysql.createConnection(dbcreadentials);
            console.log('Connector: Got 2 Database!');

            const [rows] = await connection.execute(`SELECT * FROM ${table}`);
            console.log('READER: Readed Data from table:',table);

            res.json({
                succes: true,
                data: rows,
                time: Time
            });
            console.log('SENDER: Data Send!');
            await connection.end();
            console.log('EXIT CODE: 0');

        }catch(err){
            res.json({
                succes: false,
                data: 'err',
                time: Time
            })
            console.error('ERR: ', err.message);
            console.log('EXIT CODE: 1');
        }
    }
);

app.listen(PORT, () =>
    { console.log(`Status: API beží na porte: ${PORT}!`);
});