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
                    libPath: this.ESPRESSO_LOADER_LIB_PATH || '/lib',
                    vendorPath: this.ESPRESSO_LOADER_VENDOR_PATH || '/vendor',
                    compressed: typeof this.ESPRESSO_LOADER_COMPRESSED !== undefined ? this.ESPRESSO_LOADER_COMPRESSED : true
                }

            }

        }

    }

});