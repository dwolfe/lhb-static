const { minify } = require('terser');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('./src/content/images');

  eleventyConfig.addTransform('htmlmin', require('./src/utils/minify-html.js'));

  eleventyConfig.addNunjucksAsyncFilter('jsmin', async function (
    code,
    callback
  ) {
    try {
      const minified = await minify(code);
      callback(null, minified.code);
    } catch (err) {
      console.error('Terser error: ', err);
      // Fail gracefully.
      callback(null, code);
    }
  });

  return {
    pathPrefix: '/lhb-static/',
    dir: { input: './src/content', output: 'dist' },
  };
};
