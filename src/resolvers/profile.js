const ProfileService = require('../services/ProfileService');

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
    experiences: () => [],
    education: () => [],
  }
};
