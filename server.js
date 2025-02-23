require('dotenv').config();
const express = require('express');
const path = require('path');
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 3124;
const tableName = process.env.TABLE_VUES || 'views';

// Connexion MySQL
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.HOST,
  user: process.env.SEVER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

const promisePool = pool.promise();

// Middleware pour fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Importer et utiliser l'API Discord
const discordRoutes = require('./routes/discord');
app.use('/api/discord', discordRoutes);


// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Le serveur écoute sur le port ${PORT}`);
});
