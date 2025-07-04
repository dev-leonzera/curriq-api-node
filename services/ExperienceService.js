const db = require('./db');

const ExperienceService = {
  async add(profileId, input) {
    const { title, company, startDate, endDate, description } = input;
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO experiences (profileId, title, company, startDate, endDate, description) VALUES (?, ?, ?, ?, ?, ?)',
        [profileId, title, company, startDate, endDate, description],
        function (err) {
          if (err) return reject(err);
          resolve({ id: this.lastID, profileId, ...input });
        }
      );
    });
  },

  async update(id, input) {
    const { title, company, startDate, endDate, description } = input;
    return new Promise((resolve, reject) => {
      db.run(
        'UPDATE experiences SET title=?, company=?, startDate=?, endDate=?, description=? WHERE id=?',
        [title, company, startDate, endDate, description, id],
        function (err) {
          if (err) return reject(err);
          resolve({ id, ...input });
        }
      );
    });
  },

  async delete(id) {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM experiences WHERE id=?', [id], function (err) {
        if (err) return reject(err);
        resolve(this.changes > 0);
      });
    });
  },

  async listByProfile(profileId) {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM experiences WHERE profileId=?', [profileId], (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  },

  async getById(id) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM experiences WHERE id=?', [id], (err, row) => {
        if (err) return reject(err);
        resolve(row);
      });
    });
  }
};

module.exports = ExperienceService;
