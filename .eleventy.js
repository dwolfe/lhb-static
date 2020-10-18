const { minify } = require("terser");
const pluginSass = require("eleventy-plugin-sass");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('./src/content/images');

  eleventyConfig.addPlugin(pluginSass, {
    outputDir: './dist/styles'
  });

  eleventyConfig.addTransform("htmlmin", require("./src/utils/minify-html.js"));

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
    dir: { input: './src/content', output: 'dist' }
  };
};
