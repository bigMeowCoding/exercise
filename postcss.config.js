const tailwindcss = require("tailwindcss"),
  autofix = require("autoprefixer");

module.exports = {
  plugins: ["postcss-preset-env", autofix, tailwindcss],
};
