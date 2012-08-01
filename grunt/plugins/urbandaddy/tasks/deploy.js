module.exports = function(grunt) {
    'use strict';

    grunt.registerMultiTask('deploy', 'Deploy dest directory to deploy directory.', function() {
        var dest = this.file.dest,
            args = this.data.rsync.args;

        grunt.loadTasks('grunt/plugins/urbandaddy/helpers');
        
        try {

            this.file.src.forEach(function(filepath){
                grunt.helper('fs.rsync', filepath, dest, args);
            });

        } catch(e) {

            grunt.log.writeln(e);
            return false;

        }
    });

};