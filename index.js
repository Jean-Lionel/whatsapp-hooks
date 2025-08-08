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
app.post('/webhook', (req, res) => {
    const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19);
    console.log(`\n\nWebhook received ${timestamp}\n`);
    console.log(JSON.stringify(req.body, null, 2));
    
    let body_parms = req.body;
    
    if (body_parms.object === 'whatsapp_business_account') {
        if(body_parms.entry && body_parms.entry[0].changes[0].value.messages.length > 0) {
            let message = body_parms.entry[0].changes[0].value.messages[0];
            console.log('Message received:', message);
            // contanc  
        }
        // contact
        if(body_parms.entry && body_parms.entry[0].changes[0].value.contacts.length > 0) {
            let contact = body_parms.entry[0].changes[0].value.contacts[0];
            console.log('Contact received:', contact);
        }
        // phone id 
        if(body_parms.entry && body_parms.entry[0].changes[0].value.phone_ids.length > 0) {
            let phone_id = body_parms.entry[0].changes[0].value.phone_ids[0];
            console.log('Phone ID received:', phone_id);
        }
        // business account 
        if(body_parms.entry && body_parms.entry[0].changes[0].value.business_account.length > 0) {
            let business_account = body_parms.entry[0].changes[0].value.business_account[0];
            console.log('Business account received:', business_account);
        }
        // Message from
        let phone_number_id = body_parms.entry[0].changes[0].value.phone_ids[0];
        axios.post(
            'https://graph.facebook.com/v22.0/'+phone_number_id+'/messages',
            {
                "messaging_product": "whatsapp",    
                "recipient_type": "individual",
                "to": "25779614036",
                "type": "text",
                "text": {
                    "preview_url": false,
                    "body": "Bonjour les amis je suis un Milliardaire"
                }
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken
                }
            }
        )
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        });
        
    }
    res.status(200).end();
});
