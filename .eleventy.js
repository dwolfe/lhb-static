const md = require('markdown-it')();
const { minify } = require("terser");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('src/content/fonts');
  eleventyConfig.addPassthroughCopy('src/content/images');

  eleventyConfig.addWatchTarget('src/styles/style.css');
  eleventyConfig.addPassthroughCopy({ 'src/styles': './styles' });

  eleventyConfig.addWatchTarget('src/scripts/*.js');
  eleventyConfig.addPassthroughCopy({ 'src/scripts': './scripts' });

  eleventyConfig.addFilter('markdown', function (value) {
    if (typeof value === 'string') {
      return module.render(value);
    }

    return value;
  });

  eleventyConfig.addNunjucksAsyncFilter("jsmin", async function (
    code,
    callback
  ) {
    try {
      const minified = await minify(code);
      callback(null, minified.code);
    } catch (err) {
      console.error("Terser error: ", err);
      // Fail gracefully.
      callback(null, code);
    }
  });

  return {
    pathPrefix: '/lhb-static/',
    dir: { input: 'src/content', output: 'dist' }
  };
};
