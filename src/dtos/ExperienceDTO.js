class ExperienceDTO {
  constructor({ id, profileId, title, company, startDate, endDate, description }) {
    this.id = id;
    this.profileId = profileId;
    this.title = title;
    this.company = company;
    this.startDate = startDate;
    this.endDate = endDate;
    this.description = description;
  }

  static validate(input) {
    if (!input.title || !input.company || !input.startDate) {
      throw new Error('Título, empresa e data de início são obrigatórios');
    }
  }
}

module.exports = ExperienceDTO;
