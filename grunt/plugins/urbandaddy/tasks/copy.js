module.exports = function(grunt) {
    'use strict';

    grunt.registerMultiTask('copy', 'Copy src files to dest directory.', function() {
        var dest = this.file.dest;

        grunt.loadTasks('grunt/plugins/urbandaddy/helpers');

        try {

            grunt.file.expandFiles(this.file.src).forEach(function(filepath){
              grunt.file.copy(filepath, grunt.helper('path.to_dest_path', filepath, dest));
            });

        } catch(e) {

            grunt.log.writeln(e);
            return false;

        }
    });

};