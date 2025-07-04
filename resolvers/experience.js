const ExperienceService = require('../services/ExperienceService');

module.exports = {
  Mutation: {
    addExperience: async (_, { profileId, input }) => ExperienceService.add(profileId, input),
    updateExperience: async (_, { id, input }) => ExperienceService.update(id, input),
    deleteExperience: async (_, { id }) => ExperienceService.delete(id),
  },
};
