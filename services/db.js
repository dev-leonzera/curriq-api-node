const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.resolve(__dirname, '../database.sqlite'));

// Criação da tabela profiles se não existir
const createProfilesTable = `
CREATE TABLE IF NOT EXISTS profiles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  fullName TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  bio TEXT,
  skills TEXT
);
`;

db.serialize(() => {
  db.run(createProfilesTable);
});

module.exports = db;
