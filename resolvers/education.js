const EducationService = require('../services/EducationService');

module.exports = {
  Mutation: {
    addEducation: async (_, { profileId, input }) => EducationService.add(profileId, input),
    updateEducation: async (_, { id, input }) => EducationService.update(id, input),
    deleteEducation: async (_, { id }) => EducationService.delete(id),
  },
};
