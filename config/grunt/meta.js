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
    "docs":           "./build/doc",
    "deploy":         "./example/site/lib",
    "main": {
      "src":          "./src/main",
      "dest":         "./build/lib"
    },
    "test": {
      "src":          "./src/test",
      "dest":         "./build/test"
    },
    "jetrunner": {
      "src":          "./src/jetrunner",
      "dest":         "./build/jetrunner"
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
    },
    "resources": {
      "src":          "./src/resources",
      "deploy":       "./example/site/resources"
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
      "tests": "<%= meta.dirs.test.dest %>/site/**/*Test.js",
      "runner": {
        "template": "<%= meta.dirs.jetrunner.dest %>/site/SpecRunner.jade",
        "styles": [
          "<%= meta.dirs.vendor.dest %>/jetfuel.vendor.mocha/mocha.css"
        ],
        "scripts": [
          "<%= meta.dirs.vendor.dest %>/jetfuel.vendor.mocha/mocha.js",
          "<%= meta.dirs.main.dest %>/site/Application.bundled.compressed.js"
        ]
      }
    },
    "reporter": {
      "cli": "spec",
      "html": "spec"
    },
    "server": {
      "base": "./build",
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