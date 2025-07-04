const ResumeService = require('../services/ResumeService');

module.exports = {
  Query: {
    getResume: async (_, { id }) => ResumeService.getById(id),
    listResumes: async (_, { profileId }) => ResumeService.list(profileId),
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
      return resume;
    },
    deleteResume: async (_, { id }) => ResumeService.delete(id),
    downloadResume: async () => '', // Implementação futura
  }
};
