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
    "reporter": {
      "cli": "spec",
      "html": "spec"
    },
    "server": {
      "base": ".",
      "port": 3000
    },
    "soda": {
      "url": "http://ci.example.com",
      "username": "username",
      "key": "access-key"
    }
  }

};