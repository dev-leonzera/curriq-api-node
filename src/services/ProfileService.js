const db = require('./db');

function serializeSkills(skills) {
  return JSON.stringify(skills || []);
}
function deserializeSkills(skillsStr) {
  try { return JSON.parse(skillsStr || '[]'); } catch { return []; }
}

const ProfileService = {
  async create({ fullName, email, bio, skills }) {
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO profiles (fullName, email, bio, skills) VALUES (?, ?, ?, ?)',
        [fullName, email, bio, serializeSkills(skills)],
        function (err) {
          if (err) return reject(err);
          resolve({ id: this.lastID, fullName, email, bio, skills });
        }
      );
    });
  },

  async update(id, { fullName, email, bio, skills }) {
    return new Promise((resolve, reject) => {
      db.run(
        'UPDATE profiles SET fullName=?, email=?, bio=?, skills=? WHERE id=?',
        [fullName, email, bio, serializeSkills(skills), id],
        function (err) {
          if (err) return reject(err);
          resolve({ id, fullName, email, bio, skills });
        }
      );
    });
  },

  async delete(id) {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM profiles WHERE id=?', [id], function (err) {
        if (err) return reject(err);
        resolve(this.changes > 0);
      });
    });
  },

  async getById(id) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM profiles WHERE id=?', [id], (err, row) => {
        if (err) return reject(err);
        if (!row) return resolve(null);
        row.skills = deserializeSkills(row.skills);
        resolve(row);
      });
    });
  },

  async list() {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM profiles', [], (err, rows) => {
        if (err) return reject(err);
        rows.forEach(r => r.skills = deserializeSkills(r.skills));
        resolve(rows);
      });
    });
  }
};

module.exports = ProfileService;
