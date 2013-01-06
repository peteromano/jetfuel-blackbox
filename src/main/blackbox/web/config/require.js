define('config/require', function() {
    'use strict';

    var SYNC = /\?sync/;

    var PathsEnum= {
            VENDOR:     '/vendor/',
            RESOURCES:  '/resources/blackbox/web/',
            CSS:        '/css/blackbox/web/'
        };

    function getBasePath(asset, path) {
        return (window.requireConfig && window.requireConfig[asset] && window.requireConfig[asset].basePath || PathsEnum[asset.toUpperCase()]) + (path || '');
    }

    function getVendorPath(path) {
        return getBasePath('vendor', path);
    }

    return {

        'paths': {
            'underscore':               ['//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.2/underscore-min', getVendorPath('underscore/underscore')],
            'jQuery':                   [/*'//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min', */getVendorPath('jquery/dist/jquery')],
            'Backbone':                 [/*'//cdnjs.cloudflare.com/ajax/libs/backbone.js/0.9.2/backbone-min', */getVendorPath('backbone/backbone')],
            'dust':                     getVendorPath('dustjs-linkedin/dist/dust-core-1.1.1.min'),
            'mocha':                    getVendorPath('mocha/mocha/mocha'),
            'chai':                     getVendorPath('chai/chai/chai'),
            'sinon':                    getVendorPath('sinon/sinon'),
            'json':                     getVendorPath('requirejs-plugins/json'),
            'css':                      getVendorPath('requirejs-plugins/css'),
            'normalize':                getVendorPath('requirejs-plugins/normalize'),
            'propertyParser':           getVendorPath('requirejs-plugins/propertyParser'),
            'text':                     getVendorPath('requirejs-plugins/text'),
            'i18n':                     getVendorPath('requirejs-plugins/i18n'),
            'font':                     getVendorPath('requirejs-plugins/font'),
            'image':                    getVendorPath('requirejs-plugins/image'),
            'async':                    getVendorPath('requirejs-plugins/async'),
            'noext':                    getVendorPath('requirejs-plugins/noext'),
            'resource':                 'plugin/require/resource'
        },

        'shim': {

            'Modernizr': {
                'exports': 'Modernizr'
            },

            'dust': {
                'exports': 'dust'
            },

            'underscore': {
                'exports': '_'
            },

            'jQuery': {
                'exports': '$'
            },

            'Backbone': {
                'exports': 'Backbone',
                'deps': ['jQuery', 'underscore']
            },

            'mocha': {
                'exports': 'mocha'
            },

            'chai': {
                'exports': 'chai'
            },

            'sinon': {
                'exports': 'sinon'
            },

            'plugin/jquery/jquery.isotope.min': {
                'exports': '$',
                'deps': ['jQuery']
            }

        },

        'map': {

            '*': {
                '_': 'underscore',
                '$': 'jQuery',
                'jquery': 'jQuery'
            }

        },

        'config': {

            'text': {
                'onXhr': function (xhr, url) {
                    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

                    if(SYNC.test(url)) {
                        xhr.open('GET', url.replace(SYNC, ''), false);
                    }
                }
            },

            'resource': {
                'baseUrl': getBasePath('resources')
            },

            'css': {
                'baseUrl': getBasePath('css')
            }

        }

    };

});