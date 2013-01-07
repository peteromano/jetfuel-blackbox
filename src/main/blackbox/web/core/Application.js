(function() {
    'use strict';

    var /**
         * @constant
         * @private
         * @type String
         * @fieldOf blackbox.web.core.Application.prototype
         * @description Value: "2.0"
         */
         VERSION = '2.0';

    var /**
         * @private
         * @name router
         * @type Backbone.Router
         * @fieldOf blackbox.web.core.Application.prototype
         */
        router,

        /**
         * @private
         * @name layout
         * @type blackbox.web.view.Layout
         * @fieldOf blackbox.web.core.Application.prototype
         */
        layout,

        /**
         * @private
         * @name app
         * @type blackbox.web.core.Application
         * @fieldOf blackbox.web.core.Application.prototype
         */
        app;

    var /**
         * @private
         * @name config
         * @type {Object}
         * @fieldOf blackbox.web.core.Application.prototype
         */
        config = {
            env: 'prod',
            context: window,
            routing: {},
            templating: {
                engine: 'dust'
            },
            settings: {
                debug: false,
                services: {
                    facebook: {
                        status: true,
                        cookie: true,
                        xfbml: true
                    },
                    google: {
                        analytics: {}
                    }
                }
            }
        },

        /**
         * @private
         * @name services
         * @type blackbox.web.core.Application
         * @fieldOf blackbox.web.core.Application.prototype
         */
        services = [];

    services.load = function() {
        for(var i = 0; i < this.length; i++) {
            this[i].load();
        }
    }

    /**
     * @private
     * @methodOf blackbox.web.core.Application.prototype
     */
    function lambda(value) {
        return function() { return value; };
    }

    /**
     * @private
     * @methodOf blackbox.web.core.Application.prototype
     */
    function getApplicationClass() {
        return app && app.constructor;
    }

    /**
     * @private
     * @methodOf blackbox.web.core.Application.prototype
     */
    function domready() {
        
    }

    /**
     * @static
     * @methodOf blackbox.web.core.Application
     * @returns {blackbox.web.core.Application}
     */
    function getInstance() {
        var Application = this;
        return app || (app = new Application());
    }

    /**
     * @private
     * @methodOf blackbox.web.core.Application.prototype
     */
    function unload() {
        layout.destroy();
    }

    define('core/Application', [
        '_',
        '$',
        'plugin/backbone/sync',
        'core/Controller',
        'view/Layout',
        'util/GoogleAnalytics',
        'util/FacebookApi'], function(_, $, Backbone, Controller, Layout, GoogleAnalytics, FacebookApi) {
        var Application = getApplicationClass();

        if(!Application) {
            /**
             * @lends blackbox.web.core.Application.prototype
             * @augments Backbone.Events
             */
            (Application = lambda()).prototype = _.extend({
                /**
                 * @constructs
                 * @version 2.0
                 * @augments Backbone.Events
                 * @param {Object} config
                 * @description
                 * Subscriptions: <code>domready</code>, <code>unload</code>
                 * <br />
                 * Publishes: <code>domready</code>, <code>unload</code>
                 */
                initialize: function(cfg) {
                    // Set Application#initialize() as a noop, with the same return signature
                    this.initialize = lambda(this);
                    // Set application config
                    this.config(cfg);
                    // Create and store a new router instance
                    router = Controller.createRouter(config.routing);
                    // Start the history session (triggers the initial page view)
                    Controller.startSession();
                    // Instantiate the Layout view
                    layout = new Layout();
                    // Set handlers for Application domready and unload events
                    this.on('domready', domready).on('unload', unload);
                    // Trigger Application domready events on domready event
                    $(_.bind(this.trigger, this, 'domready'));
                    // Trigger Application unload events on context onload event
                    $(config.context).on('unload', _.bind(this.trigger, this, 'unload'));
                    // Set Google Analytics and Facebook API services
                    services.push(GoogleAnalytics);
                    services.push(FacebookApi);
                    // Load services
                    services.load();
                    // Return the Application API
                    return this;
                },

                /**
                 * @param {Object} config
                 * @returns {Object}
                 */
                config: function(cfg) {
                    if(typeof cfg == 'object') {
                        return config = $.extend(true, config, cfg || {});
                    } else {
                        return cfg && config[cfg] || config;
                    }
                },

                /**
                 * @returns {Backbone.Router}
                 */
                getRouter: function() {
                    return _.clone(router);
                },

                /**
                 * @returns {blackbox.web.view.Layout}
                 */
                getLayout: function() {
                    return _.clone(layout);
                },

                /**
                 * @function
                 * @returns {String}
                 */
                getVersion: lambda(VERSION)

            }, Backbone.Events);

            Application.getInstance = _.bind(getInstance, Application);
        }

        return Application;
    });

})();