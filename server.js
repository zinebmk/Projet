//Imports
const express = require('express'); // Web Framework
const sqlite3 = require("sqlite3");
const requete = require('./db.js');
//const db = require('./db.js');

//Instanciation du serveur
const server = express();

// Connexion à la base de donnée SQlite
const db = new sqlite3.Database('data/productionDB.sqlite', err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connexion réussie à la base de données");
});

//Configuration des routes
server.get('/', function (req,res) {
    //res.setHeader('Content-Type', 'text/html');
    res.send("Bonjour le monde...");
    //res.status(200).send('<h1>Bonjour sur mon serveur</h1>');
});

//Launch server
server.listen(8080, function() {
    console.log('Serveur en écoute');
});