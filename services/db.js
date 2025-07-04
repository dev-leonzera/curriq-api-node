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

const createExperiencesTable = `
CREATE TABLE IF NOT EXISTS experiences (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  profileId INTEGER NOT NULL,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  startDate TEXT NOT NULL,
  endDate TEXT,
  description TEXT,
  FOREIGN KEY(profileId) REFERENCES profiles(id) ON DELETE CASCADE
);
`;

const createEducationTable = `
CREATE TABLE IF NOT EXISTS education (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  profileId INTEGER NOT NULL,
  institution TEXT NOT NULL,
  degree TEXT NOT NULL,
  field TEXT,
  startDate TEXT NOT NULL,
  endDate TEXT,
  description TEXT,
  FOREIGN KEY(profileId) REFERENCES profiles(id) ON DELETE CASCADE
);
`;

db.serialize(() => {
  db.run(createProfilesTable);
  db.run(createExperiencesTable);
  db.run(createEducationTable);
});

module.exports = db;
