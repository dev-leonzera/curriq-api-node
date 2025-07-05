const db = require('../../services/db');

function serializeRequirements(reqs) {
  return JSON.stringify(reqs || []);
}
function deserializeRequirements(reqsStr) {
  try { return JSON.parse(reqsStr || '[]'); } catch { return []; }
}

const VacancyService = {
  async create(input) {
    const { title, description, requirements } = input;
    const createdAt = new Date().toISOString();
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO vacancies (title, description, requirements, createdAt) VALUES (?, ?, ?, ?)',
        [title, description, serializeRequirements(requirements), createdAt],
        function (err) {
          if (err) return reject(err);
          resolve({ id: this.lastID, title, description, requirements, createdAt });
        }
      );
    });
  },

  async update(id, input) {
    const { title, description, requirements } = input;
    return new Promise((resolve, reject) => {
      db.run(
        'UPDATE vacancies SET title=?, description=?, requirements=? WHERE id=?',
        [title, description, serializeRequirements(requirements), id],
        function (err) {
          if (err) return reject(err);
          resolve({ id, title, description, requirements });
        }
      );
    });
  },

  async delete(id) {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM vacancies WHERE id=?', [id], function (err) {
        if (err) return reject(err);
        resolve(this.changes > 0);
      });
    });
  },

  async getById(id) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM vacancies WHERE id=?', [id], (err, row) => {
        if (err) return reject(err);
        if (!row) return resolve(null);
        row.requirements = deserializeRequirements(row.requirements);
        resolve(row);
      });
    });
  },

  async list() {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM vacancies', [], (err, rows) => {
        if (err) return reject(err);
        rows.forEach(r => r.requirements = deserializeRequirements(r.requirements));
        resolve(rows);
      });
    });
  }
};

module.exports = VacancyService;
