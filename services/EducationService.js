const db = require('./db');

const EducationService = {
  async add(profileId, input) {
    const { institution, degree, field, startDate, endDate, description } = input;
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO education (profileId, institution, degree, field, startDate, endDate, description) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [profileId, institution, degree, field, startDate, endDate, description],
        function (err) {
          if (err) return reject(err);
          resolve({ id: this.lastID, profileId, ...input });
        }
      );
    });
  },

  async update(id, input) {
    const { institution, degree, field, startDate, endDate, description } = input;
    return new Promise((resolve, reject) => {
      db.run(
        'UPDATE education SET institution=?, degree=?, field=?, startDate=?, endDate=?, description=? WHERE id=?',
        [institution, degree, field, startDate, endDate, description, id],
        function (err) {
          if (err) return reject(err);
          resolve({ id, ...input });
        }
      );
    });
  },

  async delete(id) {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM education WHERE id=?', [id], function (err) {
        if (err) return reject(err);
        resolve(this.changes > 0);
      });
    });
  },

  async listByProfile(profileId) {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM education WHERE profileId=?', [profileId], (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  },

  async getById(id) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM education WHERE id=?', [id], (err, row) => {
        if (err) return reject(err);
        resolve(row);
      });
    });
  }
};

module.exports = EducationService;
