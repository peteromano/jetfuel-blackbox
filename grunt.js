// All filepaths referenced in any loaded modules are relative to the grunt.js directory, recursively, unless absolute
module.exports = function(grunt) {
    'use strict';

    var CONFIG = './config/grunt';

    require(CONFIG + '/tasks')(grunt);

    grunt.initConfig(
        grunt.utils._.extend(require(CONFIG + '/targets'), {
            pkg: '<json:package.json>',
            meta: require(CONFIG + '/meta'),
            concat: require(CONFIG + '/concat')
        })
    );

};
