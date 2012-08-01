module.exports = function(grunt) {
    'use strict';

    var GRUNT_FILE = 'grunt.js';

    /**
     * Clean directories.
     *
     * If `GRUNT_FILE` file is not found in any of `dirpath`'s parent directories, abort task.
     *
     * TODO This is to guard against deleteing folders outside of the grunt project, but it's still not
     *      an ideal security precaution
    */
    grunt.registerHelper('fs.rmdir', function(dirpath) {
        var fs = require('fs');

        if(!grunt.file.findup(dirpath, GRUNT_FILE)) throw Error('Directory "' + dirpath + '" is outside the grunt project.');
        else {
            grunt.file.expandFiles(dirpath+'*').forEach(function(filename) {
                fs.unlinkSync(filename);
            });

            fs.rmdirSync(dirpath);

            grunt.log.writeln('Directory "' + dirpath + '" deleted.');
        }
    });

    grunt.registerHelper('fs.rsync', function(src, dest, args) {
        var cli = ['rsync', args || '', src, dest].join(' ');
        grunt.log.writeln('exec: ' + cli);
        require('child_process').exec(cli);
        return cli;
    });

};