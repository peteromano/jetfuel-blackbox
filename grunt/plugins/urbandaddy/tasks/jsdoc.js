module.exports = function(grunt) {
    'use strict';

	var JSDOC_APP_DIR = 'app';

    grunt.registerMultiTask('jsdoc', 'JSDocs for src, outputted to dest.', function() {
    	var path = require('path'),
            jsdoc = this.data,
    		src = path.resolve(this.file.src),
    		dest = path.resolve(this.file.dest),
            t = path.resolve(jsdoc.t || 'node_modules/jsdoc-toolkit/templates/jsdoc'),
            p = jsdoc.path || 'node_modules/jsdoc-toolkit',
            cli = [
                JSDOC_APP_DIR+'/' + (jsdoc.app || 'run.js'),
                src,
                '-d='+dest,
                '-t='+t,
                jsdoc.all ? '-a' : '',
                jsdoc.private ? '-p' : '',
                jsdoc.recurse ? '-r='+jsdoc.recurse : '',
                jsdoc.exclude ? '-E='+jsdoc.exclude : ''
            ].join(' ');

        grunt.loadTasks('grunt/plugins/urbandaddy/helpers');

        try {

            grunt.helper('process.pushd', p);
            grunt.log.writeln('pushd: ' + path.resolve(p));

            require('child_process').exec(cli);

            grunt.log.writeln('exec: ' + cli);
            grunt.log.writeln('popd: ' + grunt.helper('process.popd'));

        } catch(e) {

            grunt.log.writeln(e);
            return false;

        }
    });

};