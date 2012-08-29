// All filepaths are relative to the grunt.js directory, recursively, unless absolute
module.exports = function(grunt) {
  "use strict";

  var registerTask = grunt.registerTask,
      loadNpmTasks = grunt.loadNpmTasks,
      renameTask = grunt.renameTask;

  // Vendor NPM Tasks
  loadNpmTasks('espresso-framework-core');
  loadNpmTasks('espresso-framework-grunt-compass');
  loadNpmTasks('grunt-jasmine-task');

  // Private/Utility Tasks
  registerTask('clocks',      'clean:docs jsdoc');
  registerTask('copy:lib',    'copy:jquery copy:espresso copy:qunit');
  registerTask('clopy',       'clopylib clean:dist copy:dist');
  registerTask('clompass',    'clean:sass compass');
  registerTask('clopycat',    'clopy godcat concat');
  registerTask('clopylib',    'clean:lib copy:lib');
  registerTask('build',       'clopycat godmin clompass clocks');

  // grunt all [--force] & variants - Command line interface (CLI)
  registerTask('all',         'test build deploy');

  // grunt dev [--force] & variants - Command line interface (CLI)
  registerTask('dev',         'clopycat clompass deploy');
  registerTask('dev:dist',    'clopycat deploy:dist');
  registerTask('dev:sass',    'clompass deploy:sass');

  // grunt docs [--force] - Command line interface (CLI)
  registerTask('docs',        'clocks');

  // grunt watch [--force] & variants - Command line interface (CLI)
  renameTask('watch',         'observe');
  registerTask('watch',       'observe:dist observe:sass');
  registerTask('watch:dist',  'observe:dist');
  registerTask('watch:sass',  'observe:sass');
  registerTask('watch:all',   'observe');

  // grunt default (grunt) [--force] - Command line interface (CLI)
  registerTask('default',     'all');

  // npm up, npm update, npm install, npm test - Node Package Manager (package.json) Scripts
  registerTask('test',        'clopylib jasmine');
  registerTask('install',     'clean:lib copy:lib build deploy');
  registerTask('update',      'clean:lib copy:lib build');

  // ${task}:js = ${task}:dist - Target Aliases
  registerTask('copy:js',     'copy:dist');
  registerTask('clean:js',    'clean:dist');
  registerTask('deploy:js',   'deploy:dist');
  registerTask('dev:js',      'dev:dist');
  registerTask('watch:js',    'watch:dist');

  // ${task}:css = ${task}:sass - Target Aliases
  registerTask('clean:css',    'clean:sass');
  registerTask('deploy:css',   'deploy:sass');
  registerTask('dev:css',      'dev:sass');
  registerTask('watch:css',    'watch:sass');

};
