const path = require(`path`);

module.exports = {
  webpack: {
    alias: {
      components: path.resolve(__dirname, "src/components"),
      api: path.resolve(__dirname, "src/api"),
      hooks: path.resolve(__dirname, "src/hooks"),
      helpers: path.resolve(__dirname, "src/helpers"),
      config: path.resolve(__dirname, "src/config"),
      assets: path.resolve(__dirname, "src/assets"),
      pages: path.resolve(__dirname, "src/pages"),
    },
  },
};
