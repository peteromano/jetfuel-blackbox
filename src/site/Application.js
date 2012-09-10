espresso.Application('Application', function($, require, _, Backbone) {
    'use strict';

    return {

        initialize: function(config, context) {

        },

        ready: function() {

        }

    };

}, {

    Services: {
        services: 'site.services',
        autoload: ['Router'],
        registry: {
            Router: '{services}.Router'
        }
    },

    Configuration: {

        Default: {

            services: {

                Router: {}

            },

            espresso: {

                loader: {
                    libPath: '/lib',
                    vendorPath: '/vendor',
                    compressed: true
                }

            }

        }

    }

});