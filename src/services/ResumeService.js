const db = require('../../services/db');

const ResumeService = {
  async create({ profileId, vacancyId, contentHtml, downloadUrl }) {
    const createdAt = new Date().toISOString();
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO resumes (profileId, vacancyId, contentHtml, downloadUrl, createdAt) VALUES (?, ?, ?, ?, ?)',
        [profileId, vacancyId, contentHtml, downloadUrl, createdAt],
        function (err) {
          if (err) return reject(err);
          resolve({ id: this.lastID, profileId, vacancyId, contentHtml, downloadUrl, createdAt });
        }
      );
    });
  },

  async delete(id) {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM resumes WHERE id=?', [id], function (err) {
        if (err) return reject(err);
        resolve(this.changes > 0);
      });
    });
  },

  async getById(id) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM resumes WHERE id=?', [id], (err, row) => {
        if (err) return reject(err);
        resolve(row);
      });
    });
  },

  async list(profileId) {
    return new Promise((resolve, reject) => {
      let query = 'SELECT * FROM resumes';
      let params = [];
      if (profileId) {
        query += ' WHERE profileId=?';
        params.push(profileId);
      }
      db.all(query, params, (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  }
};

module.exports = ResumeService;
