module.exports = function(grunt) {
    'use strict';

    grunt.registerMultiTask('clean', 'Clean dest directory.', function() {
        grunt.loadTasks('grunt/plugins/urbandaddy/helpers');

        try {

            grunt.file.expandDirs(this.file.src).reverse().forEach(function(dirpath){
                grunt.helper('fs.rmdir', dirpath);
            });

        } catch(e) {

            grunt.log.writeln(e);
            return false;

        }
    });

};