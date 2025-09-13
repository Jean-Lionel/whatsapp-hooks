const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const sqlite3 = require('sqlite3').verbose();
require('dotenv').config();
const db = require('./config/db');

const app = express()
.use(bodyParser.json())
    ;

const accessToken = process.env.ACCESS_TOKEN;
const verifyToken = process.env.VERIFY_TOKEN;
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


app.get('/users', (req, res) => {
   db.all(`SELECT * FROM users`, (err, rows) => {
    if (err) {
        console.error('Erreur lors de la requête :', err.message);
    } else {
        console.log('Utilisateurs récupérés ✅');
       // console.log(rows);
       res.send(rows);
    }
});
});

app.get('/', (req, res) => {
    console.log('BONJOUR JEAN LIONEL NININAHAZWE !');
    console.log(req.query);
    res.send('BONJOUR JEAN LIONEL NININAHAZWE !');
});

app.get('/webhook', async (req, res) => {
    const { 'hub.mode': mode, 'hub.challenge': challenge, 'hub.verify_token': token } = req.query;
    console.log("=============CALLED API ===============");
    console.log(mode, challenge, token);
    console.log("============================");
    if (mode === 'subscribe' && token === verifyToken) {
        console.log('WEBHOOK VERIFIED',challenge );
        try {
            const response = await axios.post('https://api-whatsapp.advanceditb.com/api/webhook', {
                name: 'John Doe',
                data: challenge
            });

            console.log(response.data);
           // res.json(response.data); // retourne les données reçues à ton frontend
          } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Erreur lors de la récupération des données' });
        }
        console.log("=============END API ===============");
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

    try {
            const response = await axios.post('https://api-whatsapp.advanceditb.com/api/webhook', {
                name: 'John Doe',
                data: challenge
            });
            console.log("=============CALLED API ===============");
        console.log(response.data);
        console.log("=============END API ===============");
           // res.json(response.data); // retourne les données reçues à ton frontend
          } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: 'Erreur lors de la récupération des données' });
        }
        console.log("=============END API ===============");
 
    
    res.status(200).end();
});
