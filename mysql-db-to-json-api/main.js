const dbcreadentials = JSON.parse(require('fs').readFileSync('./connect-conf.json', 'utf8'));
const { "pass": configuredpass } = JSON.parse(require('fs').readFileSync('./pass.json', 'utf8'));
const { "pass": pass } = JSON.parse(require('fs').readFileSync('./pass.json', 'utf8'));
const formatedDate = require('../js/lil/date');
const mysql = require('mysql2/promise');
const express = require('express');
const cors = require('cors');
const app = express();
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
        console.log('Got select request')
        const table = req.query.t;
        const Time = formatedDate();
        let connection;
        try{
            connection = await mysql.createConnection(dbcreadentials);
            console.log('Connector: Got 2 Database!');

            const [rows] = await connection.execute(`SELECT * FROM ${table}`);
            console.log('READER: Readed Data from table:',table);

            res.json({
                succes: true,
                data: rows,
                time: Time
            });
            console.log('SENDER: Data Send!');
            
            console.log('EXIT CODE: 0');

        }catch(err){
            res.json({
                succes: false,
                data: 'err',
                time: Time
            })
            console.error('ERR: ', err.message);
            console.log('EXIT CODE: 1');
        } finally {
            await connection.end();
        }
    }
);

app.get('/insert',
    // Use like this api/insert?t='table'&colums='columtofill,secondone'&values='values representing your colums selection'
    // YOU NEWER NEED TO USE '' IN REQUEST UNLESS VALUES ONE! UNDERSTAND?!
    async (req, res) => {
        console.log('New Request!');
        const passhead = req.headers['pass'];
        const password = req.query.pass;
        const TABLE = req.query.t;
        const COLUMS = req.query.colums;
        const VALUES = req.query.values;
        const Time = formatedDate();
        if(password === configuredpass || passhead === configuredpass){
            let connection;
            try{
                connection = await mysql.createConnection(dbcreadentials);
                if(!TABLE){return};
                if(!COLUMS){return};
                if(!VALUES){return};
                console.log('Connector: Got 2 Database!');

                await connection.execute(`INSERT INTO ${TABLE} (${COLUMS}) VALUES (${VALUES})`);
                console.log(`WRITER: Wrote new data to table: ${TABLE}, colum: ${COLUMS}, and wrote values: ${VALUES}!`);

                res.json({
                succes: true,
                CODE: 200
                });
                console.log('STAT Data Send via json!');
                console.log('SUCCES!');
                console.log('EXIT Code 0');
            } catch(error) {
                res.json({
                    succes: false,
                    message: 'Internal Server ERROR',
                    CODE: 500
                });
                console.log('Yup i failed');
                console.log('EXIT Code 1');
            } finally {
                await connection.end();
            }
        } else {
            res.json({
                succes: false,
                message: 'Ey You need to enter a key!!!',
                CODE: 401
            });
            console.log('Hey you got a alicense for that?');
            console.log('You newer take me alive "trumpet sound"');
        }
    }
)

app.listen(PORT, () =>
    { console.log(`Status: API beží na porte: ${PORT}!`);
});