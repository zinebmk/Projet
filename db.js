const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('data/productionDB.sqlite');
 
//ordre(1, 5), poste(1,3), vehicule(1,4)
let ordre = 2, poste = 1, vehicule = 2;
db.serialize(()=>{
 
    db.all('SELECT vehicule_desc FROM vehicule WHERE vehicule_id=' + vehicule, (err, rows) => {
        if (err){
            console.error(err.message);
        }else{
            console.log('Description du véhicule: ', rows[0].vehicule_desc);
        }
    });
 
    db.all('SELECT poste_desc FROM poste WHERE poste_id=' + poste, (err, rows) => {
        if (err){
            console.error(err.message);
        }else{
            console.log('Description du poste de travail: ', rows[0].poste_desc);
        }
    });
    
    db.all('SELECT COUNT(ordre) as NB FROM incident i INNER JOIN ordre o ON i.ordre = o.ordre_id INNER JOIN vehicule v ON o.vehicule=v.vehicule_id WHERE v.vehicule_id= '+ vehicule, (err, rows) => {
        if (err){
            console.error(err.message);
        }else{
            // console.log('Résultats de la requête de jointure : ', rows);
            for (i=0; i<rows.length;i++){
                console.log("Le nombre d'incidents déclarés sur le véhicule "+ vehicule + ": " + rows[i].NB);
            };
        }
    });
});
 
db.close();