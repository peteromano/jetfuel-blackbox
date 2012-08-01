// All filepaths are relative to the grunt.js directory, recursively, unless absolute
module.exports = function(grunt) {
  "use strict";

  // External Tasks & Helpers
  grunt.loadTasks('grunt/plugins/urbandaddy/tasks');
  grunt.loadTasks('grunt/plugins/grunt-compass/tasks');

  // Private/Utility Tasks
  grunt.registerTask('clocks',      'clean:docs jsdoc');
  grunt.registerTask('copy:lib',    'copy:jquery copy:espresso copy:qunit');
  grunt.registerTask('clopy',       'clopylib clean:dist copy:dist');
  grunt.registerTask('clompass',    'clean:sass compass');
  grunt.registerTask('clopycat',    'clopy godcat concat');
  grunt.registerTask('clopylib',    'clean:lib copy:lib');
  grunt.registerTask('build',       'clopycat godmin clompass clocks');

  // grunt all [--force] & variants - Command line interface (CLI)
  grunt.registerTask('all',         'test build deploy');

  // grunt dev [--force] & variants - Command line interface (CLI)
  grunt.registerTask('dev',         'clopycat clompass deploy:ci');
  grunt.registerTask('dev:dist',    'clopycat deploy:dist');
  grunt.registerTask('dev:sass',    'clompass deploy:sass');

  // grunt docs [--force] - Command line interface (CLI)
  grunt.registerTask('docs',        'clocks');

  // grunt watch [--force] & variants - Command line interface (CLI)
  grunt.renameTask('watch',         'observe');
  grunt.registerTask('watch',       'observe:dist observe:sass');
  grunt.registerTask('watch:dist',  'observe:dist');
  grunt.registerTask('watch:sass',  'observe:sass');
  grunt.registerTask('watch:all',   'observe');

  // grunt default (grunt) [--force] - Command line interface (CLI)
  grunt.registerTask('default',     'all');

  // npm up, npm update, npm install, npm test - Node Package Manager (package.json) Scripts
  grunt.registerTask('test',        'clopylib qunit');
  grunt.registerTask('install',     'clean:lib copy:lib build deploy');
  grunt.registerTask('update',      'clean:lib copy:lib build');

  // ${task}:js = ${task}:dist - Target Aliases
  grunt.registerTask('copy:js',     'copy:dist');
  grunt.registerTask('clean:js',    'clean:dist');
  grunt.registerTask('deploy:js',   'deploy:dist');
  grunt.registerTask('dev:js',      'dev:dist');
  grunt.registerTask('watch:js',    'watch:dist');

  // ${task}:css = ${task}:sass - Target Aliases
  grunt.registerTask('clean:css',    'clean:sass');
  grunt.registerTask('deploy:css',   'deploy:sass');
  grunt.registerTask('dev:css',      'dev:sass');
  grunt.registerTask('watch:css',    'watch:sass');

};