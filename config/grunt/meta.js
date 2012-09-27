module.exports = {

  "banner": "/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> -\
    <%= grunt.template.today('yyyy-mm-dd') %>\n\
    <%= pkg.homepage ? \'* \' + pkg.homepage + '\n' : '' %>\
    * Copyright (c) <%= grunt.template.today('yyyy') %> <%= pkg.organization %>;\
     Licensed <%= _.pluck(pkg.licenses, 'type').join(', ') %> */",

  "build": {
    "name": "<%= pkg.name %>-<%= pkg.version %>"
  },

  "dirs": {
    "modules":        "./node_modules",
    "build":          "./build",
    "test":           "./src/test",
    "jetrunner":      "./src/jetrunner",
    "docs":           "./build/doc",
    "deploy":         "./example/site/lib",
    "main": {
      "src":          "./src/main",
      "dest":         "./build/lib"
    },
    "resources": {
      "src":          "./src/resources",
      "deploy":       "./example/site/resources"
    },
    "vendor": {
      "dest":         "./build/vendor",
      "deploy":       "./example/site/vendor"
    },
    "sass": {
      "src":          "./src/sass",
      "dest":         "./build/css",
      "cache":        "./.sass-cache",
      "deploy":       "./example/site/css"
    }
  },

  "vendor": {
    "pkg": "jetfuel.vendor.*",
    "file": ".jetfuel.json"
  },

  "deploy": {
    "rsync": {
      "args": "-rlpgoDc --exclude=.svn"
    }
  },

  "jetrunner": {
    "site": {
      "test": "<%= meta.dirs.test %>/site/**/*.test.js",
      "src": "<%= meta.dirs.main.src %>/site",
      "runner": {
        "template": "<%= meta.dirs.jetrunner %>/site/runner.jade",
        "scripts": [
          "<%= meta.dirs.vendor.dest %>/jetfuel.vendor.jquery/jquery.js",
          "<%= meta.dirs.vendor.dest %>/jetfuel.vendor.espresso/espresso.js",
          "<%= meta.dirs.vendor.dest %>/jetfuel.vendor.mocha/mocha.js"
        ],
        "styles": [
          "<%= meta.dirs.vendor.dest %>/jetfuel.vendor.mocha/mocha.css"
        ]
      }
    },
    "reporter": {
      "cli": "spec",
      "html": "spec"
    },
    "server": {
      "base": ".",
      "port": 3000
    },
    "remote": {
      "soda": {
        "url": "http://ci.example.com",
        "username": "username",
        "key": "access-key",
        "systems": [
          { "os": "Linux", "browser": "firefox", "browser-version": "10.", "max-duration": 300 },
          { "os": "Linux", "browser": "firefox", "browser-version": "11.", "max-duration": 300 }
        ]
      }
    }
  }

};