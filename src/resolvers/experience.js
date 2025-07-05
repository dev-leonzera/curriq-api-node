
const ExperienceService = require('../services/ExperienceService');
const ExperienceDTO = require('../dtos/ExperienceDTO');

module.exports = {
  Mutation: {
    addExperience: async (_, { profileId, input }) => {
      ExperienceDTO.validate(input);
      const created = await ExperienceService.add(profileId, input);
      return new ExperienceDTO(created);
    },
    updateExperience: async (_, { id, input }) => {
      ExperienceDTO.validate(input);
      const updated = await ExperienceService.update(id, input);
      return new ExperienceDTO(updated);
    },
    deleteExperience: async (_, { id }) => ExperienceService.delete(id),
  },
};
