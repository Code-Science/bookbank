const webpackConfig = require('./webpack.config.js');

module.exports = function (config) {
  config.set({
    files: ['src/**/*.js', 'src/index.html', 'test/**/*.js'],
    browsers: ['Chrome'],
    plugins: [
      'karma-mocha',
      'karma-webpack',
      'karma-chai',
      'karma-sinon',
      'karma-mocha-reporter',
      'karma-chrome-launcher',
      'karma-html2js-preprocessor',
    ],
    preprocessors: {
      'src/**/*.js': ['webpack'],
      'src/**/*.html': ['html2js'],
      'test/**/*.js': ['webpack'],
    },
    webpack: webpackConfig,
    frameworks: ['mocha', 'chai', 'sinon'],
    reporters: ['mocha'],
    exclude: [],
    port: 9876,
    colors: true,
  });
};
