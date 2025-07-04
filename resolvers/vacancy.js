const VacancyService = require('../services/VacancyService');

module.exports = {
  Query: {
    getVacancy: async (_, { id }) => VacancyService.getById(id),
    listVacancies: async () => VacancyService.list(),
  },
  Mutation: {
    createVacancy: async (_, { input }) => VacancyService.create(input),
    updateVacancy: async (_, { id, input }) => VacancyService.update(id, input),
    deleteVacancy: async (_, { id }) => VacancyService.delete(id),
  }
};
