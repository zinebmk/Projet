//Imports
const express = require('express'); // Web Framework
const sqlite3 = require("sqlite3");
const requete = require('./db.js');

//Instanciation du serveur
const server = express();
const port = 3000;

// Connexion à la base de donnée SQlite
const db = new sqlite3.Database('data/productionDB.sqlite', err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connexion réussie à la base de données");
});

// Middleware pour traiter les données du formulaire
server.use(express.urlencoded({ extended: true }));

// Afficher le formulaire HTML
server.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Gérer la requête POST
server.post('/submit', (req, res) => {
  // Récupérer les données du formulaire
  const nom = req.body.nom;
  const email = req.body.email;

  // Traiter les données (exemple : les afficher)
  console.log('Nom :', nom);
  console.log('Email :', email);

  // Répondre au client avec un message de confirmation
  res.send('Données reçues avec succès');
});

//Launch server
server.listen(port, function() {
    console.log(`Serveur en écoute sur le port: ${port}`);
});

