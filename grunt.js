// All filepaths referenced in any loaded modules are relative to the grunt.js directory, recursively, unless absolute
module.exports = function(grunt) {
    'use strict';

    var CONFIG = './config';

    require(CONFIG + '/tasks')(grunt);

    grunt.initConfig(
        grunt.utils._.extend({
            pkg: require('./package.json'),
            meta: require(CONFIG + '/meta.json'),
            concat: require(CONFIG + '/concat.json')
        }, require(CONFIG + '/targets.json'))
    );

};