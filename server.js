  import userRouter from './routes/userRoutes.js'
  import express from 'express';
  import http from 'http';
  import mongoose from 'mongoose';
  import bodyParser from 'body-parser';

  const app = express();
  const server = http.createServer(app);
  const dbUrl = 'mongodb+srv://baptistelegat:goazhGwnxdkv5N5h@cluster0.roje9yx.mongodb.net/';
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
