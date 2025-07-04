const ApplicationService = require('../services/ApplicationService');

module.exports = {
  Query: {
    listApplications: async (_, { profileId }) => profileId ? ApplicationService.listByProfile(profileId) : [],
  },
  Mutation: {
    createApplication: async (_, { resumeId, vacancyId }) => ApplicationService.create({ resumeId, vacancyId }),
    updateApplicationStatus: async (_, { id, status }) => ApplicationService.updateStatus(id, status),
    deleteApplication: async (_, { id }) => ApplicationService.delete(id),
  }
};
