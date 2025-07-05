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
  db.run('DELETE FROM vacancies');
  db.run(
    'INSERT INTO vacancies (title, description, requirements, createdAt) VALUES (?, ?, ?, ?)',
    [
      'Desenvolvedor Backend',
      'Vaga para desenvolvedor backend com experiência em Node.js e GraphQL.',
      JSON.stringify(['Node.js', 'GraphQL', 'SQL']),
      new Date().toISOString()
    ]
  );
  db.run('DELETE FROM resumes');
  db.run(
    'INSERT INTO resumes (profileId, title, summary, skills, createdAt) VALUES (?, ?, ?, ?, ?)',
    [
      1, // Profile ID do usuário exemplo
      'Currículo de Exemplo',
      'Resumo do currículo de exemplo',
      JSON.stringify(['Node.js', 'GraphQL', 'SQL']),
      new Date().toISOString()
    ]
  );
  db.run('DELETE FROM applications');
  db.run(
    'INSERT INTO applications (resumeId, vacancyId, status, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)',
    [
      1, // Resume ID do currículo de exemplo
      1, // Vacancy ID da vaga de exemplo
      'pending',
      new Date().toISOString(),
      new Date().toISOString()
    ]
  );
  db.run('DELETE FROM experiences');
  db.run(
    'INSERT INTO experiences (profileId, title, company, startDate, endDate, description) VALUES (?, ?, ?, ?, ?, ?)',
    [
      1, // Profile ID do usuário exemplo
      'Desenvolvedor Backend',
      'Empresa Exemplo',
      '2022-01-01',
      '2023-01-01',
      'Descrição da experiência de exemplo'
    ]
  );
  db.run('DELETE FROM education');
  db.run(
    'INSERT INTO education (profileId, institution, degree, field, startDate, endDate, description) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [
      1, // Profile ID do usuário exemplo
      'Universidade Exemplo',
      'Bacharelado',
      'Ciência da Computação',
      '2018-01-01',
      '2022-01-01',
      'Descrição da educação de exemplo'
    ]
  );
  db.run('DELETE FROM resumes');
  db.run(
    'INSERT INTO resumes (profileId, contentHtml, downloadUrl, createdAt) VALUES (?, ?, ?, ?)',
    [
      1, // Profile ID do usuário exemplo
      '<h1>Currículo de Exemplo</h1><p>Resumo do currículo de exemplo</p>',
      'https://example.com/curriculo-exemplo.pdf',
      new Date().toISOString()
    ]
  );
});

console.log('Seed executado com sucesso!');
process.exit(0);
