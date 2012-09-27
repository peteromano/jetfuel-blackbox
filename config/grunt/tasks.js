module.exports = function(grunt) {
  "use strict";

  var registerTask = grunt.registerTask,
      renameTask = grunt.renameTask;

  // Utility (meant to be used internally)
  registerTask('clocks',      'clean:docs docs');
  registerTask('clopy',       'clopyvendor clean:main copy:main');
  registerTask('clompass',    'clean:sass compass');
  registerTask('clopycat',    'clopy autocat concat');
  registerTask('clopyvendor', 'clean:vendor copy:vendor');
  registerTask('build',       'clopycat automin clompass clocks');
  registerTask('uglify',      'min');

  // jetfuel all
  registerTask('all',         'lint test build deploy');

  // jetfuel dev
  registerTask('dev',         'lint clopycat clompass deploy');
  registerTask('dev:main',    'lint clopycat deploy:main');
  registerTask('dev:sass',    'clompass deploy:sass');

  // jetfuel watch
  renameTask('watch',         'observe');
  registerTask('watch',       'observe:main observe:sass');
  registerTask('watch:main',  'observe:main');
  registerTask('watch:sass',  'observe:sass');
  registerTask('watch:all',   'observe');

  // jetfuel default (grunt)
  registerTask('default',     'all');

  // NPM hooks
  registerTask('test',        'clopyvendor jetrunner:local qunit');
  registerTask('install',     'clopyvendor build deploy');
  registerTask('update',      'clopyvendor build');

  // main -> js - Target aliases
  registerTask('copy:js',     'copy:main');
  registerTask('clean:js',    'clean:main');
  registerTask('deploy:js',   'deploy:main deploy:vendor');
  registerTask('dev:js',      'dev:main');
  registerTask('watch:js',    'watch:main');

  // sass -> css - Target aliases
  registerTask('clean:css',    'clean:sass');
  registerTask('deploy:css',   'deploy:sass');
  registerTask('dev:css',      'dev:sass');
  registerTask('watch:css',    'watch:sass');

};
