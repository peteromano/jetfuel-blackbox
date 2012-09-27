module.exports = {

    "site/Application.bundle.js": {
        "dest": "<%= meta.dirs.dest %>/site/Application.bundle.js",
        "src": [
            "<%= meta.dirs.vendor.dest %>/jetfuel.vendor.jquery/jquery.js",
            "<%= meta.dirs.vendor.dest %>/jetfuel.vendor.espresso/espresso.js",
            "<%= meta.dirs.vendor.dest %>/jetfuel.vendor.modernizr/modernizr.js",
            "<%= meta.dirs.vendor.dest %>/jetfuel.vendor.documentcloud.underscore/underscore.js",
            "<%= meta.dirs.vendor.dest %>/jetfuel.vendor.documentcloud.backbone/backbone.js",
            "<%= meta.dirs.dest %>/site/Application.js"
        ]
    }

};