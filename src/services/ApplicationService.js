const db = require('../../services/db');

const ApplicationService = {
  async create({ resumeId, vacancyId, status }) {
    const now = new Date().toISOString();
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO applications (resumeId, vacancyId, status, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)',
        [resumeId, vacancyId, status || 'pending', now, now],
        function (err) {
          if (err) return reject(err);
          resolve({ id: this.lastID, resumeId, vacancyId, status: status || 'pending', createdAt: now, updatedAt: now });
        }
      );
    });
  },

  async updateStatus(id, status) {
    const now = new Date().toISOString();
    return new Promise((resolve, reject) => {
      db.run(
        'UPDATE applications SET status=?, updatedAt=? WHERE id=?',
        [status, now, id],
        function (err) {
          if (err) return reject(err);
          resolve({ id, status, updatedAt: now });
        }
      );
    });
  },

  async delete(id) {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM applications WHERE id=?', [id], function (err) {
        if (err) return reject(err);
        resolve(this.changes > 0);
      });
    });
  },

  async getById(id) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM applications WHERE id=?', [id], (err, row) => {
        if (err) return reject(err);
        resolve(row);
      });
    });
  },

  async listByProfile(profileId) {
    // Para listar por profile, seria necessário join com resumes
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT a.* FROM applications a
         JOIN resumes r ON a.resumeId = r.id
         WHERE r.profileId = ?`,
        [profileId],
        (err, rows) => {
          if (err) return reject(err);
          resolve(rows);
        }
      );
    });
  }
};

module.exports = ApplicationService;
