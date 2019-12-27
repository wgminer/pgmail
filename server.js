if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;  

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
 
mongoose.set('debug', false);
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
 
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'));
  // Return home page
});

app.get('/:email', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'));
  // Return status of this user
});

app.post('/', (req, res) => {
  // Create user
  // Send validation email
});

app.get('/validate/:id', (req, res) => {
  // Validate email
  // Send confirmation and first article
});

app.get('/unsubscribe/:id', (req, res) => {
  // Validate email
  // Send confirmation and first article
});

app.get('/*', (req, res) => {
  res.send(404)
});

module.exports = app.listen(port, () => {
  console.log('Running on http://localhost:' + port);
});