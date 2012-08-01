module.exports = function(grunt) {
    'use strict';

    var d = [];

    grunt.registerHelper('process.pushd', function(directory) {
        d.push(require('path').resolve(process.cwd()));
        process.chdir(directory);
        return ''+d;
    });

    grunt.registerHelper('process.popd', function() {
        var dir = d.pop();
        process.chdir(dir);
        return dir;
    });

};