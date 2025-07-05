const ProfileService = require('../../services/ProfileService');
const ExperienceService = require('./ExperienceService');
const EducationService = require('./EducationService');
const VacancyService = require('./VacancyService');

function extractKeywords(text) {
  if (!text) return [];
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 3);
}

function highlightMatches(text, keywords) {
  if (!text) return '';
  let result = text;
  keywords.forEach(k => {
    const re = new RegExp(`(${k})`, 'gi');
    result = result.replace(re, '<b>$1</b>');
  });
  return result;
}

async function generate({ profileId, vacancyId, template }) {
  const profile = await ProfileService.getById(profileId);
  if (!profile) throw new Error('Profile not found');
  const experiences = await ExperienceService.listByProfile(profileId);
  const education = await EducationService.listByProfile(profileId);
  let vacancy = null;
  let keywords = [];
  if (vacancyId) {
    vacancy = await VacancyService.getById(vacancyId);
    if (vacancy) {
      keywords = [
        ...extractKeywords(vacancy.title),
        ...vacancy.requirements.map(r => r.toLowerCase()),
        ...extractKeywords(vacancy.description)
      ];
    }
  }
  // Priorização: experiências e skills que batem com keywords
  const relevantExperiences = experiences.filter(exp => {
    const text = `${exp.title} ${exp.company} ${exp.description}`.toLowerCase();
    return keywords.some(k => text.includes(k));
  });
  const otherExperiences = experiences.filter(exp => !relevantExperiences.includes(exp));
  const allExperiences = [...relevantExperiences, ...otherExperiences];
  const relevantSkills = profile.skills.filter(skill =>
    keywords.some(k => skill.toLowerCase().includes(k))
  );
  const otherSkills = profile.skills.filter(skill => !relevantSkills.includes(skill));
  // Geração de HTML simples
  const html = `
    <h1>${profile.fullName}</h1>
    <p><b>Email:</b> ${profile.email}</p>
    <p><b>Bio:</b> ${highlightMatches(profile.bio, keywords)}</p>
    <p><b>Skills:</b> ${[...relevantSkills, ...otherSkills].map(s => highlightMatches(s, keywords)).join(', ')}</p>
    <h2>Experiências</h2>
    <ul>
      ${allExperiences.map(exp => `<li><b>${highlightMatches(exp.title, keywords)}</b> em ${highlightMatches(exp.company, keywords)}<br>${highlightMatches(exp.description, keywords)}</li>`).join('')}
    </ul>
    <h2>Formação</h2>
    <ul>
      ${education.map(edu => `<li><b>${edu.degree}</b> em ${edu.institution} (${edu.startDate} - ${edu.endDate || 'Atual'})</li>`).join('')}
    </ul>
    ${vacancy ? `<h2>Vaga Alvo</h2><p><b>${vacancy.title}</b><br>${vacancy.description}</p>` : ''}
  `;
  return { profile, vacancy, contentHtml: html };
}

module.exports = { generate };
