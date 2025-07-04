module.exports = {
  Query: {
    getProfile: () => null,
    listProfiles: () => [],
  },
  Mutation: {
    createProfile: () => null,
    updateProfile: () => null,
    deleteProfile: () => true,
  },
  Profile: {
    experiences: () => [],
    education: () => [],
  }
};
