
const VacancyService = require('../services/VacancyService');
const VacancyDTO = require('../dtos/VacancyDTO');

module.exports = {
  Query: {
    getVacancy: async (_, { id }) => {
      const vacancy = await VacancyService.getById(id);
      return vacancy ? new VacancyDTO(vacancy) : null;
    },
    listVacancies: async () => {
      const vacancies = await VacancyService.list();
      return vacancies.map(v => new VacancyDTO(v));
    },
  },
  Mutation: {
    createVacancy: async (_, { input }) => {
      VacancyDTO.validate(input);
      const created = await VacancyService.create(input);
      return new VacancyDTO(created);
    },
    updateVacancy: async (_, { id, input }) => {
      VacancyDTO.validate(input);
      const updated = await VacancyService.update(id, input);
      return new VacancyDTO(updated);
    },
    deleteVacancy: async (_, { id }) => VacancyService.delete(id),
  }
};
