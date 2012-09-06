// All filepaths are relative to the grunt.js directory, recursively, unless absolute
module.exports = function(grunt) {
  "use strict";

  var registerTask = grunt.registerTask,
      renameTask = grunt.renameTask;

  // Utility Tasks ("private")
  registerTask('clocks',      'clean:docs jsdoc');
  registerTask('clopy',       'clopyvendor clean:dist copy:dist');
  registerTask('clompass',    'clean:sass compass');
  registerTask('clopycat',    'clopy autocat concat');
  registerTask('clopyvendor', 'clean:vendor copy:vendor');
  registerTask('build',       'clopycat automin clompass clocks');
  registerTask('uglify',      'min');

  // grunt all [--force] & variants - Command line interface (CLI)
  registerTask('all',         'test build deploy');

  // grunt dev [--force] & variants - Command line interface (CLI)
  registerTask('dev',         'clopycat clompass deploy');
  registerTask('dev:dist',    'clopycat deploy:js');
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
  registerTask('test',        'clopyvendor jasmine');
  registerTask('install',     'clopyvendor build deploy');
  registerTask('update',      'clopyvendor build');

  // ${task}:js = ${task}:dist - Target Aliases
  registerTask('copy:js',     'copy:dist');
  registerTask('clean:js',    'clean:dist');
  registerTask('deploy:js',   'deploy:dist deploy:vendor');
  registerTask('dev:js',      'dev:dist');
  registerTask('watch:js',    'watch:dist');

  // ${task}:css = ${task}:sass - Target Aliases
  registerTask('clean:css',    'clean:sass');
  registerTask('deploy:css',   'deploy:sass');
  registerTask('dev:css',      'dev:sass');
  registerTask('watch:css',    'watch:sass');

};
