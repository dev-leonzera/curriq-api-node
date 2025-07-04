const ResumeService = require('../services/ResumeService');

module.exports = {
  Query: {
    getResume: async (_, { id }) => ResumeService.getById(id),
    listResumes: async (_, { profileId }) => ResumeService.list(profileId),
  },
  Mutation: {
    generateResume: async (_, { input }) => {
      // Geração real será implementada depois; aqui apenas mocka um HTML
      const { profileId, vacancyId } = input;
      const contentHtml = `<h1>Currículo gerado para profile ${profileId}</h1>`;
      return ResumeService.create({ profileId, vacancyId, contentHtml });
    },
    deleteResume: async (_, { id }) => ResumeService.delete(id),
    downloadResume: async () => '', // Implementação futura
  }
};
