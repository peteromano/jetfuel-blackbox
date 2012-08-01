module.exports = function(grunt) {
    'use strict';

    grunt.registerHelper('path.to_dest_path', function(filepath, dest) {
        return filepath.replace(/^([^/]*)/, dest);
    });

};