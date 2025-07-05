class VacancyDTO {
  constructor({ id, title, description, requirements, createdAt }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.requirements = requirements || [];
    this.createdAt = createdAt;
  }

  static validate(input) {
    if (!input.title || !input.description) {
      throw new Error('Título e descrição são obrigatórios');
    }
    if (!Array.isArray(input.requirements)) {
      throw new Error('Requirements deve ser um array');
    }
  }
}

module.exports = VacancyDTO;
