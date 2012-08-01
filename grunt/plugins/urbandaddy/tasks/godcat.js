module.exports = function(grunt) {
    'use strict';

    grunt.registerMultiTask('godcat', 'Concatenate all "package" files.', function() {
        var dest = this.file.dest,
            filters = this.data.filters,
            banner = grunt.task.directive(this.data.banner) || '',
            separator = this.data.separator || ';',
            extension = this.data.extension || '.js';
            
        grunt.loadTasks('grunt/plugins/urbandaddy/helpers');

        try {

            grunt.file.expandDirs(this.file.src).reverse().forEach(function(dirpath){
                grunt.file.write(
                    grunt.helper('path.to_dest_path', dirpath, dest).replace(/\/$/, extension),
                    banner + grunt.helper('concat', grunt.file.expandFiles(
                        filters.map(function(filter) { return dirpath+filter; })
                    ), { separator: separator })
                );
            });

        } catch(e) {

            grunt.log.writeln(e);
            return false;

        }
    });

};