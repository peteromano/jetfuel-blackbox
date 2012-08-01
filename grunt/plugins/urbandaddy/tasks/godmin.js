module.exports = function(grunt) {
    'use strict';

  grunt.registerMultiTask('godmin', 'Uglify all files.', function() {
        var filepaths = grunt.file.expandFiles(this.file.src),
            banner = grunt.task.directive(this.data.banner) || '',
            dest = this.file.dest,
            extension = this.data.extension || '.min.js',
            replace = this.data.replace || '.js',
            verbose = this.data.verbose,
            task = this,
            errorCount;

        grunt.loadTasks('grunt/plugins/urbandaddy/helpers');

        try {

            filepaths.forEach(function(filepath) {
                var newFile;

                grunt.file.write(
                    newFile = grunt.helper('path.to_dest_path', filepath, dest).replace(replace, extension),
                    banner + grunt.helper('uglify', grunt.file.read(filepath), grunt.config('uglify'))
                );

                errorCount |= task.errorCount;

                verbose && grunt.log.writeln('File "' + newFile + '" created.');
            });

        } catch(e) {

            grunt.log.writeln(e);
            return false;

        }

        if (errorCount) return false;
    });

};