const ProfileService = require('../src/services/ProfileServiceice');

module.exports = {
  Query: {
    getProfile: async (_, { id }) => ProfileService.getById(id),
    listProfiles: async () => ProfileService.list(),
  },
  Mutation: {
    createProfile: async (_, { input }) => ProfileService.create(input),
    updateProfile: async (_, { id, input }) => ProfileService.update(id, input),
    deleteProfile: async (_, { id }) => ProfileService.delete(id),
  },
  Profile: {
    experiences: async (parent) => {
      const ExperienceService = require('../services/ExperienceService');
      return ExperienceService.listByProfile(parent.id);
    },
    education: async (parent) => {
      const EducationService = require('../services/EducationService');
      return EducationService.listByProfile(parent.id);
    },
  }
};
