// All filepaths referenced in any loaded modules are relative to the grunt.js directory, recursively, unless absolute
module.exports = function(grunt) {
  'use strict';

  // Task Definitions - ./build/tasks.js
  require('./build/tasks')(grunt);

  // Config - ./build/config.js
  grunt.initConfig(require('./build/config'));

};
