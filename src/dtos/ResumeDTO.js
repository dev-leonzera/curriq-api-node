class ResumeDTO {
  constructor({ id, profileId, vacancyId, contentHtml, downloadUrl, createdAt }) {
    this.id = id;
    this.profileId = profileId;
    this.vacancyId = vacancyId;
    this.contentHtml = contentHtml;
    this.downloadUrl = downloadUrl;
    this.createdAt = createdAt;
  }
}

module.exports = ResumeDTO;
