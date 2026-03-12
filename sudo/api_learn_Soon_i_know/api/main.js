const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 2999;

app.use(cors());

app.get("/", (req,res) => {
    res.status(200).json({
        running: true
    })

    const time = new Date();
    const seconds = time.getSeconds();
    const minutes = time.getMinutes();
    const hours = time.getHours();
    const logtime = hours + ':' + minutes + ':' + seconds + '; '
    console.log(logtime + 'Someone cared about me!')
})

app.listen(PORT, () => {
    console.log(`Running at ${PORT}`)
})