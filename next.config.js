module.exports = {
  env: {
    ANALYTICS: process.env.ANALYTICS,
  },
  webpack: function(config) {
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    });
    return config;
  },
};
