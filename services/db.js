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

const createVacanciesTable = `
CREATE TABLE IF NOT EXISTS vacancies (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  requirements TEXT NOT NULL,
  createdAt TEXT NOT NULL
);
`;

const createApplicationsTable = `
CREATE TABLE IF NOT EXISTS applications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  resumeId INTEGER NOT NULL,
  vacancyId INTEGER NOT NULL,
  status TEXT NOT NULL,
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL
);
`;

const createResumesTable = `
CREATE TABLE IF NOT EXISTS resumes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  profileId INTEGER NOT NULL,
  vacancyId INTEGER,
  contentHtml TEXT NOT NULL,
  downloadUrl TEXT,
  createdAt TEXT NOT NULL,
  FOREIGN KEY(profileId) REFERENCES profiles(id) ON DELETE CASCADE,
  FOREIGN KEY(vacancyId) REFERENCES vacancies(id) ON DELETE SET NULL
);
`;

db.serialize(() => {
  db.run(createProfilesTable);
  db.run(createExperiencesTable);
  db.run(createEducationTable);
  db.run(createVacanciesTable);
  db.run(createApplicationsTable);
  db.run(createResumesTable);
});

module.exports = db;
