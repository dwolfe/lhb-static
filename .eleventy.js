const md = require('markdown-it')();

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

  return {
    dir: { input: 'src/content', output: 'dist' }
  };
};
