const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = 3000;
let IP;

const localip = false

app.use(cors());

if(localip === true){
    IP = 'localhost';
}else{
    IP = '192.168.1.192';
}

app.get('/ping',
    async (req, res) => {
        const URL = req.query.url;
        try {
            const response = await axios.get(URL, { timeout: 2000 }); // ak MC API odpovedala, tak žije
            return res.json({
                status: "online",
                mcApiResponse: response.data
            });
        } catch (err) {
            // ak MC API neodpovedá → down
            return res.json({
                status: "offline",
                error: err.message
            });
    }
});
app.listen(PORT, IP, () =>
    { console.log('Status API beží na porte', PORT);
});