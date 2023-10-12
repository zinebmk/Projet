const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('data/productionDB.sqlite');
const fs = require('fs');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer')

// Lire le contenu du fichier HTML
const htmlContent = fs.readFileSync('index.html', 'utf-8');
// Charger la page HTML dans Cheerio
const $ = cheerio.load(htmlContent);

module.exports = {
    getDescriptionVehicule: (vehicule, callback) => {
      db.all('SELECT vehicule_desc FROM vehicule WHERE vehicule_id=' + vehicule, (err, rows) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, rows[0].vehicule_desc);
          res.send('Description du véhicule :', rows);
        }
      });
    },
    getDescriptionPoste: (poste, callback) => {
      db.all('SELECT poste_desc FROM poste WHERE poste_id=' + poste, (err, rows) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, rows[0].poste_desc);
        }
      });
    },
    getIncidentsCount: (vehicule, callback) => {
      db.all('SELECT COUNT(i.ordre) as NB FROM incident i INNER JOIN ordre o ON i.ordre = o.ordre_id INNER JOIN vehicule v ON o.vehicule=v.vehicule_id WHERE v.vehicule_id= ' + vehicule, (err, rows) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, rows[0].NB);
        }
      });
    },
    getIncidents: (vehicule, callback) => {
      db.all('SELECT i.incident_id, i.incident_desc, i.etat FROM incident i INNER JOIN ordre o ON i.ordre = o.ordre_id INNER JOIN vehicule v ON o.vehicule=v.vehicule_id WHERE v.vehicule_id= ' + vehicule, (err, rows) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, rows);
        }
      });
    },
    getIncidentsForPoste: (poste, callback) => {
      db.all('SELECT i.incident_id, i.ordre FROM incident i INNER JOIN ordre o ON i.ordre = o.ordre_id WHERE o.poste= ' + poste, (err, rows) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, rows);
        }
      });
    }
  };


 /*

  //Execution des requêtes
  requete.getDescriptionVehicule(vehicule, (err, descriptionVehicule) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('Description du véhicule :', descriptionVehicule);
    }
  });

  requete.getDescriptionPoste(poste, (err, descriptionPoste) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('Description du poste de travail :', descriptionPoste);
    }
  });

  requete.getIncidentsCount(vehicule, (err, incidentsCount) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log("Le nombre d'incidents déclarés sur le véhicule " + vehicule + ": " + incidentsCount);
    }
  });

  requete.getIncidents(vehicule, (err, incidents) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('Résultats de la requête d\'incidents :', incidents);
    }
  });

  requete.getIncidentsForPoste(poste, (err, posteIncidents) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('Liste des incidents et ordres de travail pour le poste :', posteIncidents);
    }
  });
});*/