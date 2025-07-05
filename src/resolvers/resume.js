
const ResumeService = require('../services/ResumeService');
const ResumeDTO = require('../dtos/ResumeDTO');

module.exports = {
  Query: {
    getResume: async (_, { id }) => {
      const resume = await ResumeService.getById(id);
      return resume ? new ResumeDTO(resume) : null;
    },
    listResumes: async (_, { profileId }) => {
      const resumes = await ResumeService.list(profileId);
      return resumes.map(r => new ResumeDTO(r));
    },
  },
  Mutation: {
    generateResume: async (_, { input }) => {
      const ResumeGeneratorService = require('../services/ResumeGeneratorService');
      const { profile, vacancy, contentHtml } = await ResumeGeneratorService.generate(input);
      // Salva no banco
      const resume = await ResumeService.create({
        profileId: profile.id,
        vacancyId: vacancy ? vacancy.id : null,
        contentHtml
      });
      return new ResumeDTO(resume);
    },
    deleteResume: async (_, { id }) => ResumeService.delete(id),
    downloadResume: async () => '', // Implementação futura
  }
};
