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

      // Directory configuration
      dirs: {
        modules:        './node_modules',
        build:          './build',
        test:           './src/test',
        jetrunner:      './src/jetrunner',
        src:            './src/main',
        dest:           './build/lib',
        docs:           './build/doc',
        deploy:         './example/site/lib',
        resources: {
          src:          './src/resources',
          deploy:       './example/site/resources'
        },
        vendor: {
          dest:         './build/vendor',
          deploy:       './example/site/vendor'
        },
        sass: {
          src:          './src/sass',
          dest:         './build/css',
          cache:        './.sass-cache',
          deploy:       './example/site/css'
        }
      },

      // Vendor configuration
      vendor: {
        // The following properties are used with the copy task to control how third-party libraries are imported into the project.
        // Vendor libraries must be included as dependencies specified in package.json, and *should* have a .jetfuel.json file in the library...
        pkg:            'jetfuel.vendor.*',
        file:           '.jetfuel.json'
      },

      // JetRunner unit test server configuration
      jetrunner: {
        test: '<%= meta.dirs.test %>/**/*.test.js',
        src: '<%= meta.dirs.src %>',
        runner: {
          template: '<%= meta.dirs.jetrunner %>/runner.jade',
          scripts: [
            '<%= meta.dirs.vendor.dest %>/jetfuel.vendor.jquery/jquery.js',
            '<%= meta.dirs.vendor.dest %>/jetfuel.vendor.espresso/espresso.js',
            '<%= meta.dirs.vendor.dest %>/jetfuel.vendor.mocha/mocha.js'
          ],
          styles: [
            '<%= meta.dirs.vendor.dest %>/jetfuel.vendor.mocha/mocha.css'
          ]
        },
        reporter: {
          cli: 'spec',
          file: 'jenkins'
        },
        server: {
          base: '.',
          port: 3000
        },
        soda: {
          url: 'http://ci.example.com',
          username: 'username',
          key: 'access-key'
        }
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
        src: [
          '<%= meta.dirs.sass.dest %>', '<%= meta.dirs.sass.dest %>/**/*',
          '<%= meta.dirs.sass.cache %>', '<%= meta.dirs.sass.cache %>/**/*'
        ]
      },
      // grunt clean:vendor
      vendor: {
        src: ['<%= meta.dirs.vendor.dest %>', '<%= meta.dirs.vendor.dest %>/**/*']
      },
      // grunt clean:build
      build: {
        src: ['<%= meta.dirs.build %>', '<%= meta.dirs.build %>/**/*']
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
        src: ['<%= meta.dirs.modules %>/<%= meta.vendor.pkg %>/<%= meta.vendor.file %>'],
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
		helper: 'minify.uglify'
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

    // grunt jetrunner (grunt jetrunner:all)
    jetrunner: {
      // grunt jetrunner:local
      local: {},
      // grunt jetrunner:remote
      remote: {
        remote: {
          soda: {
            systems: [
              { 'os': 'Linux', 'browser': 'firefox', 'browser-version': '10.', 'max-duration': 300 },
              { 'os': 'Linux', 'browser': 'firefox', 'browser-version': '11.', 'max-duration': 300 }
            ]
          }
        }
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
      // grunt watch:dist
      dist: {
        files: ['<%= meta.dirs.src %>/**/*.js'],
        tasks: 'dev:dist'
      },
      // grunt watch:sass
      sass: {
        files: ['<%= meta.dirs.sass.src %>/**/*.sass'],
        tasks: 'dev:sass'
      }
    },

    // grunt qunit (grunt qunit:all)
    qunit: {
      'site.Application': 'http://localhost:<%= meta.jetrunner.server.port %>/<%= meta.dirs.test %>/site/Application.runner.html',
      'site.services.Router': 'http://localhost:<%= meta.jetrunner.server.port %>/<%= meta.dirs.test %>/site/services/Router.runner.html'
    },

    // grunt lint (grunt lint:all)
    lint: {
      // grunt lint:files
      files: ['<%= meta.dirs.src %>/**/*.js', '<%= meta.dirs.test %>/**/*.js']
    }

};