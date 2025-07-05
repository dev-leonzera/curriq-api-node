
const EducationService = require('../services/EducationService');
const EducationDTO = require('../dtos/EducationDTO');

module.exports = {
  Mutation: {
    addEducation: async (_, { profileId, input }) => {
      EducationDTO.validate(input);
      const created = await EducationService.add(profileId, input);
      return new EducationDTO(created);
    },
    updateEducation: async (_, { id, input }) => {
      EducationDTO.validate(input);
      const updated = await EducationService.update(id, input);
      return new EducationDTO(updated);
    },
    deleteEducation: async (_, { id }) => EducationService.delete(id),
  },
};
