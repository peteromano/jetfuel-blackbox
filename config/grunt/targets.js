module.exports = {

  // jetfuel copy (jetfuel copy:all)
  "copy": {
    // jetfuel copy:main
    "main": {
      "src": ["<%= meta.dirs.main.src %>/**/*.js"],
      "dest": "<%= meta.dirs.main.dest %>"
    },
    // jetfuel copy:vendor
    "vendor": {
      "src": ["<%= meta.dirs.modules %>/<%= meta.vendor.pkg %>/<%= meta.vendor.file %>"],
      "dest": "<%= meta.dirs.vendor.dest %>"
    }
  },

  // jetfuel autocat (jetfuel autocat:all)
  "autocat": {
    // jetfuel autocat:main
    "main": {
      "src": ["<%= meta.dirs.main.dest %>/**"],
      "dest": "<%= meta.dirs.main.dest %>"
    }
  },

  // jetfuel automin (jetfuel automin:all)
  "automin": {
    // jetfuel automin:main
    "main": {
      "src": ["<%= meta.dirs.main.dest %>/**/*.js"],
      "dest": "<%= meta.dirs.main.dest %>"
    }
  },

  // jetfuel compass (jetfuel compass:all)
  "compass": {
    // jetfuel compass:sass
    "sass": {
      "src": "<%= meta.dirs.sass.src %>",
      "dest": "<%= meta.dirs.sass.dest %>",
      "outputstyle": "compressed"
    }
  },

  // jetfuel qunit (jetfuel qunit:all)
  "qunit": {
    "site.Application": "http://localhost:<%= meta.jetrunner.server.port %>/<%= meta.dirs.test %>/site/Application.runner.html",
    "site.services.Router": "http://localhost:<%= meta.jetrunner.server.port %>/<%= meta.dirs.test %>/site/services/Router.runner.html"
  },

  // jetfuel jetrunner (jetfuel jetrunner:all)
  "jetrunner": {
    // jetfuel jetrunner:local
    "local": [{
      "test": "<config:meta.jetrunner.site.test>",
      "src": "<config:meta.jetrunner.site.src>",
      "runner": "<config:meta.jetrunner.site.runner>",
      "reporter": "<config:meta.jetrunner.reporter>",
      "server": "<config:meta.jetrunner.server>"
    }],
    // jetfuel jetrunner:remote
    "remote": [{
      "test": "<config:meta.jetrunner.site.test>",
      "src": "<config:meta.jetrunner.site.src>",
      "runner": "<config:meta.jetrunner.site.runner>",
      "reporter": "<config:meta.jetrunner.reporter>",
      "server": "<config:meta.jetrunner.server>",
      "remote": "<config:meta.jetrunner.remote>"
    }]
  },

  // jetfuel docs (jetfuel docs:all)
  "docs": {
    // jetfuel docs:main
    "main": {
      "src": "<%= meta.dirs.main.src %>",
      "dest": "<%= meta.dirs.docs %>",
      "jsdoc": {
        "includeAll":true,
        "includePrivate":true,
        "recurse":100
      }
    }
  },

  // jetfuel deploy (jetfuel deploy:all)
  "deploy": {
    // jetfuel deploy:main
    "main": {
      "src": ["<%= meta.dirs.main.dest %>/*"],
      "dest": "<%= meta.dirs.deploy %>"
    },
    // jetfuel deploy:sass
    "sass": {
      "src": ["<%= meta.dirs.sass.dest %>/*"],
      "dest": "<%= meta.dirs.sass.deploy %>"
    },
    // jetfuel deploy:vendor
    "vendor": {
      "src": ["<%= meta.dirs.vendor.dest %>/*"],
      "dest": "<%= meta.dirs.vendor.deploy %>"
    },
    // jetfuel deploy:resources
    "resources": {
      "src": ["<%= meta.dirs.resources.src %>/*"],
      "dest": "<%= meta.dirs.resources.deploy %>"
    }
  },

  // jetfuel clean (jetfuel clean:all)
  "clean": {
    // jetfuel clean:main
    "main": {
      "src": ["<%= meta.dirs.main.dest %>", "<%= meta.dirs.main.dest %>/**/*"]
    },
    // jetfuel clean:docs
    "docs": {
      "src": ["<%= meta.dirs.docs %>", "<%= meta.dirs.docs %>/**/*"]
    },
    // jetfuel clean:sass
    "sass": {
      "src": [
        "<%= meta.dirs.sass.dest %>", "<%= meta.dirs.sass.dest %>/**/*",
        "<%= meta.dirs.sass.cache %>", "<%= meta.dirs.sass.cache %>/**/*"
      ]
    },
    // jetfuel clean:vendor
    "vendor": {
      "src": ["<%= meta.dirs.vendor.dest %>", "<%= meta.dirs.vendor.dest %>/**/*"]
    },
    // jetfuel clean:build
    "build": {
      "src": ["<%= meta.dirs.build %>", "<%= meta.dirs.build %>/**/*"]
    },
    // jetfuel clean:deploy
    "deploy": {
      "src": [
        "<%= meta.dirs.deploy %>", "<%= meta.dirs.deploy %>/**/*",
        "<%= meta.dirs.vendor.deploy %>", "<%= meta.dirs.vendor.deploy %>/**/*",
        "<%= meta.dirs.sass.deploy %>", "<%= meta.dirs.sass.deploy %>/**/*",
        "<%= meta.dirs.resources.deploy %>", "<%= meta.dirs.resources.deploy %>/**/*"
      ]
    }
  },

  // jetfuel watch (jetfuel watch:all)
  "watch": {
    // jetfuel watch:main
    "main": {
      "files": ["<%= meta.dirs.main.src %>/**/*.js"],
      "tasks": "dev:main"
    },
    // jetfuel watch:sass
    "sass": {
      "files": ["<%= meta.dirs.sass.src %>/**/*.sass"],
      "tasks": "dev:sass"
    }
  },

  // jetfuel lint (jetfuel lint:all)
  "lint": {
    // jetfuel lint:all
    "all": ["<%= meta.dirs.main.src %>/**/*.js", "<%= meta.dirs.test %>/**/*.js"]
  }

};