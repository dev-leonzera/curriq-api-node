class ProfileDTO {
  constructor({ id, fullName, email, bio, skills, experiences, education }) {
    this.id = id;
    this.fullName = fullName;
    this.email = email;
    this.bio = bio;
    this.skills = skills || [];
    this.experiences = experiences || [];
    this.education = education || [];
  }

  static validate(input) {
    if (!input.fullName || !input.email) {
      throw new Error('Nome completo e email são obrigatórios');
    }
    if (!Array.isArray(input.skills)) {
      throw new Error('Skills deve ser um array');
    }
    // Outras validações podem ser adicionadas aqui
  }
}

module.exports = ProfileDTO;
