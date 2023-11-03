const userRouter = require('./routes/userRoutes.js');
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const dbUrl = process.env.DATABASE_URL;
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connexion à la base de données MongoDB Atlas établie');
  })
  .catch((err) => {
    console.error('Erreur de connexion à la base de données :', err);
});

app.get('/api', (req, res) => {
  res.send('Bienvenue sur l\'API RESTful !');
});

app.post('/api', (req, res) => {
  res.send('Création d\'une ressource via l\'API RESTful');
});

// body-parser pour analyser les données JSON
app.use(bodyParser.json());
// body-parser pour analyser les données URL encodées
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', userRouter);

const port = process.env.PORT || 8080;

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
