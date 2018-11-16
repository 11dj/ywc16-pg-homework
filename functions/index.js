const functions = require('firebase-functions');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/timestamp', (request, response) => {
  response.send(`${ new Date() }`)
})
app.use('/skyscanner', require('./services/skyscanner'))
app.use('/ip', require('./services/ip-api'))

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.api = functions.https.onRequest(app);
