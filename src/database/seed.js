const db = require('../services/db');

db.serialize(() => {
  db.run('DELETE FROM profiles');
  db.run(
    'INSERT INTO profiles (fullName, email, bio, skills) VALUES (?, ?, ?, ?)',
    [
      'Usuário Exemplo',
      'exemplo@curriq.com',
      'Bio de exemplo',
      JSON.stringify(['GraphQL', 'Node.js', 'SQL'])
    ]
  );
});

console.log('Seed executado com sucesso!');
process.exit(0);
