define('config/require', function() {
    'use strict';

    var PathsEnum= {
            VENDOR:     '/static/vendor/',
            RESOURCES:  '/static/resources/blackbox/web/',
            CSS:        '/static/css/blackbox/web/'
        };

    function getBaseUrl(asset, path) {
        return (window.requireConfig && window.requireConfig[asset] && window.requireConfig[asset].baseUrl || PathsEnum[asset.toUpperCase()]) + (path || '');
    }

    function getVendorUrl(path) {
        return getBaseUrl('vendor', path);
    }

    return {

        'paths': {
            'underscore':               ['//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.2/underscore-min', getVendorUrl('underscore/underscore')],
            'jQuery':                   [/*'//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min', */getVendorUrl('jquery/dist/jquery')],
            'Backbone':                 [/*'//cdnjs.cloudflare.com/ajax/libs/backbone.js/0.9.2/backbone-min', */getVendorUrl('backbone/backbone')],
            'mocha':                    getVendorUrl('mocha/mocha/mocha'),
            'plate':                    getVendorUrl('plate/lib/plate.min'),
            'chai':                     getVendorUrl('chai/chai/chai'),
            'sinon':                    getVendorUrl('sinon/sinon'),
            'json':                     getVendorUrl('requirejs-plugins/json'),
            'css':                      getVendorUrl('requirejs-plugins/css'),
            'normalize':                getVendorUrl('requirejs-plugins/normalize'),
            'propertyParser':           getVendorUrl('requirejs-plugins/propertyParser'),
            'text':                     getVendorUrl('requirejs-plugins/text'),
            'i18n':                     getVendorUrl('requirejs-plugins/i18n'),
            'font':                     getVendorUrl('requirejs-plugins/font'),
            'image':                    getVendorUrl('requirejs-plugins/image'),
            'async':                    getVendorUrl('requirejs-plugins/async'),
            'noext':                    getVendorUrl('requirejs-plugins/noext'),
            'resource':                 'plugin/require/resource'
        },

        'shim': {

            'plate': {
                'exports': 'plate'
            },

            'Modernizr': {
                'exports': 'Modernizr'
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

                    if(/\?sync/.test(url)) {
                        xhr.open('GET', url, false);
                    }
                }
            },

            'resource': {
                'baseUrl': getBaseUrl('resources')
            },

            'css': {
                'baseUrl': getBaseUrl('css')
            }

        }

    };

});