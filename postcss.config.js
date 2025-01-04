// postcss.config.js
module.exports = {
  plugins: [
    require('postcss-import'), // To handle @import statements in your CSS
    require('cssnano')({
      preset: 'default', // Minify the CSS
    }),
  ],
};
