// Charger les variables d'environnement
require('dotenv').config();

const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const app = express();
const PORT = process.env.PORT || 3000;
const tableName = process.env.TABLE_VUES || 'views';

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.HOST,
  user: process.env.SEVER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

const promisePool = pool.promise();

// Middleware pour servir les fichiers statiques du dossier 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Le serveur écoute sur le port ${PORT}`);
});
