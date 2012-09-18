// All filepaths are relative to the grunt.js directory, recursively, unless absolute
module.exports = {

    // Use package.json project config
    pkg: '<json:package.json>',

    // grunt concat (grunt concat:all)
    concat: '<json:grunt/concat.json>',

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
        modules:    './node_modules',
        build:      './build',
        test:       './src/test',
        src:        './src/main',
        dest:       './build/lib',
        docs:       './build/doc',
        deploy:     './deploy/lib',
        resources:  {
          src:        './src/resources',
          deploy:     './deploy/resources'
        },
        vendor: {
          dest:       './build/vendor',
          deploy:     './deploy/vendor'
        },
        sass: {
          src:          './src/sass',
          dest:         './build/css',
          cache:        './.sass-cache',
          deploy:       './deploy/css'
        }
      },

      test: {
        runner: {
          jasmine:  '*.jasmine.html',
          qunit:    '*.qunit.html'
        }
      },

      vendor: {
        config: '.espresso.json'
      }

    },

    // grunt clean (grunt clean:all)
    clean: {
      // grunt clean:build
      build: {
        src: ['<%= meta.dirs.build %>', '<%= meta.dirs.build %>/**/*']
      },
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
        src: [
          '<%= meta.dirs.sass.dest %>', '<%= meta.dirs.sass.dest %>/**/*',
          '<%= meta.dirs.sass.cache %>', '<%= meta.dirs.sass.cache %>/**/*'
        ]
      },
      // grunt clean:vendor
      vendor: {
        src: ['<%= meta.dirs.vendor.dest %>', '<%= meta.dirs.vendor.dest %>/**/*']
      },
      // grunt clean:deploy
      deploy: {
          src: [
            '<%= meta.dirs.deploy %>', '<%= meta.dirs.deploy %>/**/*',
            '<%= meta.dirs.vendor.deploy %>', '<%= meta.dirs.vendor.deploy %>/**/*',
            '<%= meta.dirs.sass.deploy %>', '<%= meta.dirs.sass.deploy %>/**/*',
            '<%= meta.dirs.resources.deploy %>', '<%= meta.dirs.resources.deploy %>/**/*'
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
          dest: '<%= meta.dirs.vendor.dest %>'
      }
    },

    // grunt autocat (grunt autocat:all)
    autocat: {
      // grunt autocat:dist
      dist: {
        src: ['<%= meta.dirs.dest %>/**'],
        dest: '<%= meta.dirs.dest %>',
        filters: ['*.js'],
        extension: '.js',
        separator: ';',
        verbose: true
      }
    },

    // grunt automin (grunt automin:all)
    automin: {
      // grunt automin:dist
      dist: {
        //banner: '<banner:meta.banner>',
        src: ['<%= meta.dirs.dest %>/**/*.js'],
        dest: '<%= meta.dirs.dest %>',
        extension: '.compressed.js',
        replace: '.js',
        verbose: true,
		helper: 'minify.uglify',
		args: {
          //compilation_level: 'SIMPLE_OPTIMIZATIONS'
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
        src: ['<%= meta.dirs.dest %>/*'],
        dest: '<%= meta.dirs.deploy %>',
        rsync: {
            args: '-rlpgoDc --exclude=.svn'
        }
      },
      // grunt deploy:sass
      sass: {
        src: ['<%= meta.dirs.sass.dest %>/*'],
        dest: '<%= meta.dirs.sass.deploy %>',
        rsync: {
            args: '-rlpgoDc --exclude=.svn'
        }
      },
      // grunt deploy:vendor
      vendor: {
        src: ['<%= meta.dirs.vendor.dest %>/*'],
        dest: '<%= meta.dirs.vendor.deploy %>',
        rsync: {
            args: '-rlpgoDc --exclude=.svn'
        }
      },
      resources: {
        src: ['<%= meta.dirs.resources.src %>/*'],
        dest: '<%= meta.dirs.resources.deploy %>',
        rsync: {
            args: '-rlpgoDc --exclude=.svn'
        }
      }
    },

    // grunt compass (grunt compass:all)
    compass: {
      // grunt compass:dist
      dist: {
        src: '<%= meta.dirs.sass.src %>',
        dest: '<%= meta.dirs.sass.dest %>',
        outputstyle: 'compressed'
      }
    },

    // grunt docs (grunt jsdoc:all)
    jsdoc: {
      // grunt jsdoc:dist
      dist: {
        src: '<%= meta.dirs.src %>',
        dest: '<%= meta.dirs.docs %>',
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
      files: ['<%= meta.dirs.test %>/**/<%= meta.test.runner.jasmine %>']
    },

    // grunt qunit
    qunit: {
      files: ['<%= meta.dirs.test %>/**/<%= meta.test.runner.qunit %>']
    },

    // grunt lint
    lint: {
      files: ['grunt.js', '<%= meta.dirs.src %>/**/*.js', '<%= meta.dirs.test %>/**/*.js']
    }

};
