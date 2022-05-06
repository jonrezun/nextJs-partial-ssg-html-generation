module.exports = {
  reactStrictMode: true,
  trailingSlash: true,
  generateBuildId: async () => {
    const id = process.env.BUILD_ID;
    return id;
  },
};
