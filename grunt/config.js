// All filepaths are relative to the grunt.js directory, recursively, unless absolute
module.exports = {

    // Use package.json project config
    pkg: '<json:package.json>',

    // Meta config
    meta: {

      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.organization %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */',

      build: {
          name: '<%= pkg.name %>-<%= pkg.version %>'
      },

      // Directory config
      dirs: {
        modules: 'node_modules',
        qunit: 'test/qunit',
        jasmine: 'test/jasmine',
        src: 'src',
        vendor: 'vendor',
        dest: 'lib',
        docs: 'doc',
        deploy: 'public/js',
        sass: {
          src: 'sass/src',
          dest: 'sass/lib',
          resources: 'sass/resources',
          deploy: 'public/css'
        }
      },

      vendor: {
        config: '.espresso.json'
      }

    },

    // grunt clean (grunt clean:all)
    clean: {
      // grunt clean:dist
      dist: {
        src: ['<%= meta.dirs.dest %>', '<%= meta.dirs.dest %>/**/*']
      },
      // grunt clean:docs
      docs: {
        src: ['<%= meta.dirs.docs %>', '<%= meta.dirs.docs %>/**/*']
      },
      // grunt clean:sass
      sass: {
          src: ['<%= meta.dirs.sass.dest %>', '<%= meta.dirs.sass.dest %>/**/*']
      },
      // grunt clean:vendor
      vendor: {
        src: ['<%= meta.dirs.vendor %>', '<%= meta.dirs.vendor %>/**/*']
      },
      deploy: {
          src: [
              '<%= meta.dirs.deploy %>', '<%= meta.dirs.deploy %>/**/*',
              '<%= meta.dirs.sass.deploy %>', '<%= meta.dirs.sass.deploy %>/**/*'
          ]
      }
    },

    // grunt copy (grunt copy:all)
    copy: {
      // grunt copy:dist
      dist: {
        src: ['<%= meta.dirs.src %>/**/*.js'],
        dest: '<%= meta.dirs.dest %>'
      },
      // grunt copy:vendor
      vendor: {
          src: ['<%= meta.dirs.modules %>/espresso.vendor.*/<%= meta.vendor.config %>'],
          dest: '<%= meta.dirs.vendor %>'
      }
    },

    // grunt godcat (grunt godcat:all)
    godcat: {
      // grunt godcat:dist
      dist: {
        src: ['<%= meta.dirs.dest %>/**'],
        dest: '<%= meta.dirs.dest %>',
        filters: ['*.js'],
        extension: '.js',
        separator: ';'
      }
    },

    // grunt godmin (grunt godmin:all)
    godmin: {
      // grunt godmin:dist
      dist: {
        //banner: '<banner:meta.banner>',
        src: ['<%= meta.dirs.dest %>/**/*.js'],
        dest: '<%= meta.dirs.dest %>',
        extension: '.compressed.js',
        replace: '.js',
        verbose: true,
		helper: 'minify.uglify',
		args: {		
          compilation_level: 'ADVANCED_OPTIMIZATIONS'
		  //output_format: 'text',
          //externs: ['path/to/file.js', '/source/**/*.js'],
          //define: ["'goog.DEBUG=false'"],
          //warning_level: 'verbose',
          //jscomp_off: ['checkTypes', 'fileoverviewTags'],
          //summary_detail_level: 3,
          //output_wrapper: '(function(){%output%}).call(this);'
		}
      }
    },

    // grunt deploy (grunt deploy:all)
    deploy: {
        // grunt deploy:dist
        dist: {
            src: ['<%= meta.dirs.dest %>/*', '<%= meta.dirs.vendor %>/*'],
            dest: '<%= meta.dirs.deploy %>',
            rsync: {
                args: '-rlpgoDc --exclude=.svn'
            }
        },
        // grunt deploy:sass
        sass: {
            src: ['<%= meta.dirs.sass.dest %>/*', '<%= meta.dirs.sass.resources %>/*'],
            dest: '<%= meta.dirs.sass.deploy %>',
            rsync: {
                args: '-rlpgoDc --exclude=.svn'
            }
        }
    },

    // grunt concat (grunt concat:all)
    concat: '<json:grunt/concat.json>',

    // grunt compass (grunt compass:all)
    compass: {
      // grunt compass:dist
      dist: {
        src: '<%= meta.dirs.sass.src %>',
        dest: '<%= meta.dirs.sass.dest %>',
        images: 'sass/resources/images',
        config: 'sass/config.rb',
        outputstyle: 'compressed',
        linecomments: true,
        forcecompile: true
      }
    },

    // grunt docs (grunt jsdoc:all)
    jsdoc: {
      // grunt jsdoc:dist
      dist: {
        src: '<%= meta.dirs.src %>',
        dest: '<%= meta.dirs.docs %>',
        E: 'jquery',
        r: 100,
        a: true,
        p: true
      }
    },

    // grunt watch (grunt watch:all)
    watch: {  
      dist: {
        files: ['<%= meta.dirs.src %>/**/*.js'],
        tasks: 'dev:dist'
      },  
      sass: {
        files: ['<%= meta.dirs.sass.src %>/**/*.sass'],
        tasks: 'dev:sass'
      }
    },

    // grunt jasmine
    jasmine: {
      files: ['<%= meta.dirs.jasmine %>/**/*.html']
    },

    // grunt qunit
    qunit: {
      files: ['<%= meta.dirs.qunit %>/**/*.html']
    },

    // grunt lint
    lint: {
      files: ['grunt.js', '<%= meta.dirs.src %>/**/*.js', '<%= meta.dirs.test %>/**/*.js']
    }

};
