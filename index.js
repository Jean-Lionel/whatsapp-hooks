const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
require('dotenv').config();

const app = express()
.use(bodyParser.json())
    ;

const accessToken = process.env.ACCESS_TOKEN;
const verifyToken = process.env.VERIFY_TOKEN;
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
    console.log('BONJOUR JEAN LIONEL NININAHAZWE !');
    console.log(req.query);
    res.send('BONJOUR JEAN LIONEL NININAHAZWE !');
});

app.get('/webhook', (req, res) => {
    const { 'hub.mode': mode, 'hub.challenge': challenge, 'hub.verify_token': token } = req.query;
    console.log(mode, challenge, token);
    if (mode === 'subscribe' && token === verifyToken) {
        console.log('WEBHOOK VERIFIED',challenge );
        res.status(200).send(challenge);
    } else {
        res.status(403).end();
    }
});

// Route for POST requests
app.post('/webhook', async (req, res) => {
    const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19);
    console.log(`\n\nWebhook received ${timestamp}\n`);
    console.log(JSON.stringify(req.body, null, 2));

    console.log("\n--------------------BRUCE NDAMWERETSE--------------------------------\n")
    
    res.status(200).end();
});
