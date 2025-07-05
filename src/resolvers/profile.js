
const ProfileService = require('../services/ProfileService');
const ProfileDTO = require('../dtos/ProfileDTO');

module.exports = {
  Query: {
    getProfile: async (_, { id }) => {
      const profile = await ProfileService.getById(id);
      return profile ? new ProfileDTO(profile) : null;
    },
    listProfiles: async () => {
      const profiles = await ProfileService.list();
      return profiles.map(p => new ProfileDTO(p));
    },
  },
  Mutation: {
    createProfile: async (_, { input }) => {
      ProfileDTO.validate(input);
      const created = await ProfileService.create(input);
      return new ProfileDTO(created);
    },
    updateProfile: async (_, { id, input }) => {
      ProfileDTO.validate(input);
      const updated = await ProfileService.update(id, input);
      return new ProfileDTO(updated);
    },
    deleteProfile: async (_, { id }) => ProfileService.delete(id),
  },
  Profile: {
    experiences: async (parent) => {
      const ExperienceService = require('../src/services/ExperienceService');
      return ExperienceService.listByProfile(parent.id);
    },
    education: async (parent) => {
      const EducationService = require('../src/services/EducationService');
      return EducationService.listByProfile(parent.id);
    },
  }
};
