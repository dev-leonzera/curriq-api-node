class ApplicationDTO {
  constructor({ id, resumeId, vacancyId, status, createdAt, updatedAt }) {
    this.id = id;
    this.resumeId = resumeId;
    this.vacancyId = vacancyId;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static validate(input) {
    if (!input.resumeId || !input.vacancyId) {
      throw new Error('resumeId e vacancyId são obrigatórios');
    }
  }
}

module.exports = ApplicationDTO;
