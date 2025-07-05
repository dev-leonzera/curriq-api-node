class EducationDTO {
  constructor({ id, profileId, institution, degree, field, startDate, endDate, description }) {
    this.id = id;
    this.profileId = profileId;
    this.institution = institution;
    this.degree = degree;
    this.field = field;
    this.startDate = startDate;
    this.endDate = endDate;
    this.description = description;
  }

  static validate(input) {
    if (!input.institution || !input.degree || !input.startDate) {
      throw new Error('Instituição, grau e data de início são obrigatórios');
    }
  }
}

module.exports = EducationDTO;
