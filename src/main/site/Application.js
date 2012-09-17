espresso.Application('Application', function($, require, _, Backbone) {
    'use strict';

    /**
     * @lends site.Application.prototype
     */
    return {
        /**
         * @constructs
         * @description This class is a singleton
         * @param {Object} config
         * @param {Object} context
         * @augments espresso.framework.Application
         */
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