
const ApplicationService = require('../services/ApplicationService');
const ApplicationDTO = require('../dtos/ApplicationDTO');

module.exports = {
  Query: {
    listApplications: async (_, { profileId }) => {
      if (!profileId) return [];
      const apps = await ApplicationService.listByProfile(profileId);
      return apps.map(a => new ApplicationDTO(a));
    },
  },
  Mutation: {
    createApplication: async (_, { resumeId, vacancyId }) => {
      ApplicationDTO.validate({ resumeId, vacancyId });
      const created = await ApplicationService.create({ resumeId, vacancyId });
      return new ApplicationDTO(created);
    },
    updateApplicationStatus: async (_, { id, status }) => {
      const updated = await ApplicationService.updateStatus(id, status);
      return new ApplicationDTO({ id, status: updated.status, updatedAt: updated.updatedAt });
    },
    deleteApplication: async (_, { id }) => ApplicationService.delete(id),
  }
};
